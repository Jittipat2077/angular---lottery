import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Convert as lotteryCvt, Lottery } from 'src/app/model/lottery.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
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
    private route: Router
  ) {
      this.fetchLotterys();
  }

  fetchLotterys(){
    this.http.get(this.dataService.apiEndpoint + '/lottery_dashboard').subscribe((data: any) => {
      this.lotterys = lotteryCvt.toLottery(JSON.stringify(data));
      console.log(this.lotterys);
    });
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
    const requestBody = {
      lot_number: num_1 + num_2 + num_3 + num_4 + num_5 + num_6,
      set_no: set_no,
      lot_no: lot_no,
    };
    console.log(requestBody);

    this.http
      .post(`${this.dataService.apiEndpoint}/admin-lottery/search`, requestBody)
      .subscribe((data: any) => {
        this.lotterys = lotteryCvt.toLottery(JSON.stringify(data));
        if (this.lotterys.length > 0) {
          this.searchedLottery = this.lotterys;
        } else {
          this.searchedLottery = [];
        }
        console.log(this.lotterys);
      });
  }

  ngOnInit() {
    this.fetchCartItems();
  }

  fetchCartItems() {
    this.http
      .get(this.dataService.apiEndpoint + '/lottery_dashboard')
      .subscribe((data: any) => {
        this.lotterys = data; // ไม่ต้องแปลงเป็น Model ของ Cart แล้ว
        console.log(this.lotterys);
      });
  }

  deleteItem(lot_id: number) {
    this.http
      .delete(this.dataService.apiEndpoint + `/lottery_delete/${lot_id}`)
      .subscribe(() => {
        this.fetchCartItems(); // เรียกใหม่หลังจากลบสำเร็จ
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
  // clearInput(
  //   num_1: HTMLInputElement,
  //   num_2: HTMLInputElement,
  //   num_3: HTMLInputElement,
  //   num_4: HTMLInputElement,
  //   num_5: HTMLInputElement,
  //   num_6: HTMLInputElement
  // ) {
  //   num_1.value = '';
  //   num_2.value = '';
  //   num_3.value = '';
  //   num_4.value = '';
  //   num_5.value = '';
  //   num_6.value = '';
  //   // ตัวแปร inputValue ไม่จำเป็นต้องใช้ในที่นี้
  // }
}
