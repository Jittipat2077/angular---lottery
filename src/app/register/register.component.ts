import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  loading: boolean = false;
  firstname!: any;
  lastname!: any;
  email!: any;
  password!: any;
  birthday!: any;
  phone!: any;
  constructor(
    private data: DataService,
    private http: HttpClient,
    private runte: Router
  ) {}
  save(
    firstname: any,
    lastname: any,
    email: any,
    password: any,
    birthday: any,
    phone: any
  ) {
    if (firstname && lastname && email && password && birthday && phone) {
      const memberData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        birthday: birthday,
        phone: phone,
      };

      let jsonString = JSON.stringify(memberData);
      console.log(jsonString);

      this.http
        .post(this.data.apiEndpoint + '/member', jsonString, {
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
            this.runte.navigate(['/login']);
          },
          (error) => {
            if (error.status === 409) {
              Swal.fire({
                title: 'มีการใช้อีเมลนี้แล้ว',
                icon: 'error',
                confirmButtonText: 'ตกลง',
              });
            } else {
              Swal.fire({
                title: 'มีการใช้อีเมลนี้แล้ว',
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
