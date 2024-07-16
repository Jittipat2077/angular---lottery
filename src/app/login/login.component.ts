import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading: boolean = false;

  constructor(
    private data: DataService,
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };
    console.log(data);

    this.http.post(this.data.apiEndpoint + '/login', data).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ!',
          text: 'คุณได้ทำการเข้าสู่ระบบสำเร็จ',
          icon: 'success',
          confirmButtonText: 'ตกลง',
        });
        if (response.user.role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/']);
        }

        this.data.SetMemId(response.user.mem_id);
        if (response.user.firstname) {
          this.data.SetUser(response.user);
        }
      },
      (error) => {
        Swal.fire({
          title: 'เข้าสู่ระบบไม่สำเร็จ!',
          text: 'คุณได้ทำการเข้าสู่ระบบไม่สำเร็จ',
          icon: 'error',
          confirmButtonText: 'ตกลง',
        });
        console.error('เข้าสู่ระบบไม่สำเร็จ:', error);
      }
    );
}

}
