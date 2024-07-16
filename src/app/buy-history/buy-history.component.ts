import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as cartCvt, Cart } from 'src/app/model/cart.model';
import { Convert as lotteryCvt, Lottery } from 'src/app/model/lottery.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buy-history',
  templateUrl: './buy-history.component.html',
  styleUrls: ['./buy-history.component.scss'],
})
export class BuyHistoryComponent {
  carts = Array<Cart>();
  lottery = Array<Lottery>();

  constructor(private dataService: DataService, private http: HttpClient) {
    // const user_id = this.dataService.getAcId();
    // console.log('mem_id = ' + user_id);
    // http
    //   .get(`${dataService.apiEndpoint}/cart-show/${user_id}`)
    //   .subscribe((data: any) => {
    //     this.carts = cartCvt.toCart(JSON.stringify(data));
    //     console.log(this.carts);
    //   });
  }
  Amount(): number {
    return this.carts.reduce((total, carts) => total + carts.amount, 0);
  }
  totalAmount(): number {
    return this.carts.reduce(
      (total, carts) => total + carts.amount * carts.price,
      0
    );
  }
  ngOnInit() {
    this.fetchCartItems();
  }
  fetchCartItems() {
    const user_id = this.dataService.getAcId();
    console.log('mem_id = ' + user_id);
    this.http
      .get(`${this.dataService.apiEndpoint}/cart-show/${user_id}`)
      .subscribe((data: any) => {
        this.carts = cartCvt.toCart(JSON.stringify(data));
        console.log(this.carts);
      });
  }
  deleteItem(id: number) {
    this.http
      .delete(this.dataService.apiEndpoint + `/cart-delete/${id}`)
      .subscribe(() => {
        this.fetchCartItems(); // เรียกใหม่หลังจากลบสำเร็จ
      });
  }
  confirmOrder(cart: Cart, id: number) {
    const mem_id = this.dataService.getAcId();

    console.log('user id = ' + mem_id);

    const orderData = {
      orders_loterry_num: cart.num,
      orders_loterry_amount: cart.amount,
      orders_loterry_price: cart.price_all,
      mem_id: mem_id,
    };
    console.log(orderData);

    this.http
      .post(this.dataService.apiEndpoint + '/order', orderData)
      .subscribe((response: any) => {
        if (response && response.affected_rows > 0) {
          // สำเร็จ
          Swal.fire({
            icon: 'success',
            title: 'สั่งซื้อสำเร็จ',
            text: 'รายการสั่งซื้อของคุณถูกบันทึกลงในระบบแล้ว',
            showCancelButton: false,
            confirmButtonText: 'ตกลง',
          }).then(() => {
            // เมื่อคุณคลิกตกลง ล้างรายการในตะกร้าและเรียกใหม่เพื่อโหลดรายการใหม่
            this.http
              .delete(this.dataService.apiEndpoint + '/cart-clear/' + id)
              .subscribe(() => {
                this.fetchCartItems();
              });
          });
        } else {
          // ไม่สำเร็จ
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถบันทึกคำสั่งซื้อได้ในขณะนี้',
            showCancelButton: false,
            confirmButtonText: 'ตกลง',
          });
        }
      });
  }
  confirmOrder_all() {
    const mem_id = this.dataService.getAcId();

    console.log('user id = ' + mem_id);

    const orderData = {
      orders_loterry_num: this.carts.map((carts) => carts.num).join(', '), // รวมเลขสลากเป็นข้อความ
      orders_loterry_amount: this.carts.reduce(
        (total, carts) => total + carts.amount,
        0
      ), // รวมจำนวน
      orders_loterry_price: this.carts.reduce(
        (total, carts) => total + carts.amount * carts.price,
        0
      ),
      mem_id: mem_id,
    };

    this.http
      .post(this.dataService.apiEndpoint + '/order', orderData)
      .subscribe((response: any) => {
        if (response && response.affected_rows > 0) {
          // สำเร็จ
          Swal.fire({
            icon: 'success',
            title: 'สั่งซื้อสำเร็จ',
            text: 'รายการสั่งซื้อของคุณถูกบันทึกลงในระบบแล้ว',
            showCancelButton: false,
            confirmButtonText: 'ตกลง',
          }).then(() => {
            // เมื่อคุณคลิกตกลง ล้างรายการในตะกร้าและเรียกใหม่เพื่อโหลดรายการใหม่
            this.http
              .delete(this.dataService.apiEndpoint + '/cart-clear')
              .subscribe(() => {
                this.fetchCartItems();
              });
          });
        } else {
          // ไม่สำเร็จ
          Swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถบันทึกคำสั่งซื้อได้ในขณะนี้',
            showCancelButton: false,
            confirmButtonText: 'ตกลง',
          });
        }
      });
  }
}
