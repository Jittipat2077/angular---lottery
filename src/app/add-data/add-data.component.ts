import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent {
  loading: boolean = false;
  // lot_number: string = '';
  // lot_date: string = '';
  // price: string = '';
  // set_id: string = '';
  // lot_id: string = '';
  // lot_amount: string = '';

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router
  ) {}

  // save(
  //   lot_number: any,
  //   lot_date: any,
  //   price: any,
  //   set_no: any,
  //   lot_no: any,
  //   lot_amount: any
  // ) {
  //   if (lot_number && lot_date && price && set_no && lot_no && lot_amount) {
  //     const memberData = {
  //       lot_date: lot_date,
  //       lot_number: lot_number,
  //       lot_no: lot_no,
  //       set_no: set_no,
  //       price: price,
  //       lot_amount: lot_amount,
  //     };

  //     console.log(memberData);

  //     this.http
  //       .post(this.data.apiEndpoint + '/aaa', memberData, {
  //         observe: 'response',
  //       })
  //       .subscribe(
  //         (response) => {
  //           console.log(JSON.stringify(response.status));
  //           console.log(JSON.stringify(response.body));
  //           console.log(response.status);

  //           Swal.fire({
  //             title: 'สมัครการใช้งานสําเร็จ',
  //             icon: 'success',
  //             confirmButtonText: 'ตกลง',
  //           });
  //           this.router.navigate(['/dashboard']);
  //         },
  //         (error) => {
  //           if (error.status === 400) {
  //             Swal.fire({
  //               title: 'มีข้อผิดพลาดเกิดขึ้น',
  //               icon: 'error',
  //               confirmButtonText: 'ตกลง',
  //             });
  //           } else {
  //             Swal.fire({
  //               title: 'มีข้อผิดพลาดเกิดขึ้น',
  //               icon: 'error',
  //               confirmButtonText: 'ตกลง',
  //             });
  //           }

  //           console.error(error);
  //         }
  //       );
  //   } else {
  //     Swal.fire({
  //       title: 'ข้อมูลที่ไม่ครบ',
  //       text: 'กรุณากรอกข้อมูลให้ครบ',
  //       icon: 'error',
  //       confirmButtonText: 'ตกลง',
  //     });
  //     console.error('Invalid data format');
  //   }
  // }

  save(
    lot_date: any,
    lot_number: any,
    lot_no: any,
    set_no: any,
    price: any,
    lot_amount: any
  ) {
    if (lot_date && lot_number && lot_no && set_no && price && lot_amount) {
      const formData = new FormData();
      formData.append('lot_date', lot_date);
      formData.append('lot_number', lot_number);
      formData.append('lot_no', lot_no);
      formData.append('set_no', set_no);
      formData.append('price', price);
      formData.append('lot_amount', lot_amount);

      this.http
        .post(this.data.apiEndpoint + '/add-lottery', formData, {
          observe: 'response',
        })
        .subscribe(
          (response) => {
            console.log(JSON.stringify(response.status));
            console.log(JSON.stringify(response.body));
            console.log(response.status);

            Swal.fire({
              title: 'สมัครการใช้งานสําเร็จ',
              icon: 'success',
              confirmButtonText: 'ตกลง',
            });
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            if (error.status === 400) {
              Swal.fire({
                title: 'มีข้อผิดพลาดเกิดขึ้น',
                icon: 'error',
                confirmButtonText: 'ตกลง',
              });
            } else {
              Swal.fire({
                title: 'มีข้อผิดพลาดเกิดขึ้น',
                icon: 'error',
                confirmButtonText: 'ตกลง',
              });
            }

            console.error(error);
          }
        );
    } else {
      Swal.fire({
        title: 'ข้อมูลที่ไม่ครบ',
        text: 'กรุณากรอกข้อมูลให้ครบ',
        icon: 'error',
        confirmButtonText: 'ตกลง',
      });
      console.error('Invalid data format');
    }
  }

  isValidDate(dateString: string): boolean {
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    return regexDate.test(dateString);
  }
}
