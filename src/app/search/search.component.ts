import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as lotteryCvt, Lottery } from 'src/app/model/lottery.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  arrayNumbers: number[] = Array.from({ length: 100 }, (_, index) => index + 1);
  arraylot_no: number[] = Array.from({ length: 100 }, (_, index) => index + 1);
  lotterys: Lottery[] = [];
  num_1!: any;
  num_2!: any;
  num_3!: any;
  num_4!: any;
  num_5!: any;
  num_6!: any;
  set_no!: any;
  lot_no!: any;
  lot_amount!: any;
  searchedLottery: Lottery[] = [];

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private router: Router
  ) {
    this.fetchLotterys();
  }

  fetchLotterys() {
    this.http.get(this.dataService.apiEndpoint + '/lottery').subscribe((data: any) => {
      this.lotterys = lotteryCvt.toLottery(JSON.stringify(data));
      console.log(this.lotterys);
      const user_id = this.dataService.getAcId();
      console.log(user_id);
    });
  }

  select(lottery: Lottery, lot_amount: any) {
    const mem_id = this.dataService.getAcId();

    console.log('user id = ' + mem_id);
    if (mem_id) {
      const cartData = {
        num: lottery.lot_number,
        amount: lot_amount,
        price: lottery.price,
        set_no: lottery.set_no,
        lot_no: lottery.lot_no,
        price_all: lot_amount * lottery.price,
        mem_id: mem_id,
      };
      this.http
        .post(this.dataService.apiEndpoint + '/cart', cartData, {
          observe: 'response',
        })
        .subscribe(
          (response) => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'สำเร็จ',
                text: 'คุณได้เพิ่มล็อตเตอรี่ลงในรายการสั่งซื้อแล้ว!!',
                confirmButtonText: 'ตกลง',
              });
              this.router.navigate(['/buy-history']); // นำผู้ใช้ไปยังหน้าสั่งซื้อ
            } else {
              Swal.fire({
                icon: 'error',
                title: 'ข้อผิดพลาด',
                text:
                  'มีข้อผิดพลาดในการบันทึกลงในตะกร้าและฐานข้อมูล: ' +
                  response.status,
                confirmButtonText: 'ตกลง',
              });
            }
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'ข้อผิดพลาด',
              text: 'เกิดข้อผิดพลาดในการบันทึกลงในตะกร้าและฐานข้อมูล: ' + error,
              confirmButtonText: 'ตกลง',
            });
          }
        );
    } else {
      Swal.fire(
        'ยังไม่ได้เข้าสู่ระบบ',
        'กรุณาเข้าสู่ระบบก่อนทำการค้นหา',
        'warning'
      );
      this.router.navigate(['/login']); // นำผู้ใช้ไปยังหน้าเข้าสู่ระบบ
    }
  }

  searchTicket(
    num_1: any,
    num_2: any,
    num_3: any,
    num_4: any,
    num_5: any,
    num_6: any,
    set_no: any,
    lot_no: any
  ) {
    const lot_number = num_1 + num_2 + num_3 + num_4 + num_5 + num_6;
    const requestBody = {
      lot_number: lot_number,
      set_no: set_no,
      lot_no: lot_no
    };
  
    console.log(requestBody);
  
    this.http
      .post(`${this.dataService.apiEndpoint}/lottery/search`, requestBody)
      .subscribe((data: any) => {
        this.lotterys = lotteryCvt.toLottery(JSON.stringify(data));
        if (this.lotterys.length > 0) {
          this.searchedLottery = this.lotterys;
        } else {
          this.fetchLotterys(); // Fetch all lotteries if search returns no result
          this.searchedLottery = [];
        }
        console.log(this.lotterys);
      });
  }
  

clearInput(
  num_1: HTMLInputElement,
  num_2: HTMLInputElement,
  num_3: HTMLInputElement,
  num_4: HTMLInputElement,
  num_5: HTMLInputElement,
  num_6: HTMLInputElement,
  set_no: HTMLSelectElement,
  lot_no: HTMLSelectElement
) {
  num_1.value = '';
  num_2.value = '';
  num_3.value = '';
  num_4.value = '';
  num_5.value = '';
  num_6.value = '';
  set_no.value = '';
  lot_no.value = '';
  this.fetchLotterys(); // Fetch all lotteries if search returns no result
}

}
