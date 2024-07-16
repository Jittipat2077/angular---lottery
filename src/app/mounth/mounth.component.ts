import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mounth',
  templateUrl: './mounth.component.html',
  styleUrls: ['./mounth.component.scss'],
})
export class MounthComponent {
  selectedMonth: any;
  monthData: any[];

  constructor(private dataService: DataService, private http: HttpClient) {
    this.monthData = [];
  }

  searchByMonth() {
    if (!this.selectedMonth) {
      return;
    }
    console.log(this.selectedMonth);

    const apiUrl = `${this.dataService.apiEndpoint}/dashboard/month/${this.selectedMonth}`;

    this.http.get(apiUrl).subscribe(
      (data: any) => {
        this.monthData = data;
        console.log(this.monthData);
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
        this.monthData = data;
        //this.calculateTotalPriceSumDay(); // คำนวณราคารวมของวันทั้งหมด
        console.log(this.monthData);
      },
      (error: any) => {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล: ', error);
      }
    );
  }
}
