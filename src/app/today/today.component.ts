import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  selectedDate: string = ''; // เก็บวันที่เป็นรูปแบบ "ปี เดือน วัน"
  // dayData: any[] = [];
  hasSelectedDate: boolean = false;

  account: any;
  lottory: any;
  totalBuytciket: any;
  userData: any;
  // selectedDate: any;
  dayData: any[];
  selectedMonth: any;
  monthData: any[];
  total_price_sum = 0;
  total_price_sum_day = 0;

  constructor(private dataService: DataService, private http: HttpClient) {
    this.dayData = [];
    this.monthData = [];
  }

  ngOnInit() {
    // โหลดข้อมูลเริ่มต้นทันทีเมื่อหน้า TodayComponent ถูกโหลด
    // this.searchByDate();
    this.updateDate();
  }

  updateDate() {
    if (this.selectedDate) {
      // ถ้ามีวันที่ถูกเลือก
      this.hasSelectedDate = true;
      this.searchByDate();
    } else {
      // ถ้ายังไม่มีวันที่ถูกเลือก
      this.hasSelectedDate = false;
      this.loadAllData();
    }
  }

  searchByDate() {
    if (!this.selectedDate) {
      return;
    }
    console.log(this.selectedDate);
    this.http
      .get(this.dataService.apiEndpoint + '/dashboard/day/' + this.selectedDate)
      .subscribe(
        (data: any) => {
          this.dayData = data;

          console.log(this.dayData);
        },
        (error: any) => {
          console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล: ', error);
        }
      );
  }

  loadAllData() {
    // โหลดข้อมูลทั้งหมด
    this.http.get(this.dataService.apiEndpoint + '/dashboard/all').subscribe(
      (data: any) => {
        this.dayData = data;
        //this.calculateTotalPriceSumDay(); // คำนวณราคารวมของวันทั้งหมด
        console.log(this.dayData);
      },
      (error: any) => {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล: ', error);
      }
    );
  }

  // isValidDate(dateString: string) {
  //   // รูปแบบวันที่ "ปี เดือน วัน" ยังถูกต้อง
  //   return true;
  // }

  // เมื่อเลือกวันที่จากเมนูเลือกวัน
  // updateDate() {
  //   this.hasSelectedDate = true;
  // }
}
