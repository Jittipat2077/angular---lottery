import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/model/order.model';
import { Convert as lotteryCvt, Lottery } from 'src/app/model/lottery.model';

@Component({
  selector: 'app-list-buy',
  templateUrl: './list-buy.component.html',
  styleUrls: ['./list-buy.component.scss'],
})
export class ListBuyComponent implements OnInit {
  orders: any[] = [];
  searchedLottery: Order[] = [];
  show: Order[] = [];
  lotterys: Lottery[] = [];
  firstname: any;

  num_1: any;
  num_2: any;
  num_3: any;
  num_4: any;
  num_5: any;
  num_6: any;

  constructor(private dataService: DataService, private http: HttpClient) {}

  ngOnInit() {
    const mem_id = this.dataService.getAcId();
    this.fetchLotterys();
    this.http
      .get<any[]>(`${this.dataService.apiEndpoint}/order-show/${mem_id}`)
      .subscribe(
        (data) => {
          this.orders = data;
          console.log(this.orders); // Log the data to the console
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
  fetchLotterys() {
    this.http.get(this.dataService.apiEndpoint + '/lottery').subscribe((data: any) => {
      this.lotterys = lotteryCvt.toLottery(JSON.stringify(data));
      console.log(this.lotterys);
      const user_id = this.dataService.getAcId();
      console.log(user_id);
    });
  }

  searchTicket() {
    if (
      this.num_1 !== undefined ||
      this.num_2 !== undefined ||
      this.num_3 !== undefined ||
      this.num_4 !== undefined ||
      this.num_5 !== undefined ||
      this.num_6 !== undefined
    ) {
      this.searchedLottery = this.orders.filter((order: any) => {
        const ticketId = order.orders_loterry_num.toString();
        return (
          (this.num_1 === undefined || ticketId.charAt(0) === this.num_1) &&
          (this.num_2 === undefined || ticketId.charAt(1) === this.num_2) &&
          (this.num_3 === undefined || ticketId.charAt(2) === this.num_3) &&
          (this.num_4 === undefined || ticketId.charAt(3) === this.num_4) &&
          (this.num_5 === undefined || ticketId.charAt(4) === this.num_5) &&
          (this.num_6 === undefined || ticketId.charAt(5) === this.num_6)
        );
      });
    } else {
      this.searchedLottery = [];
    }
  }

  resetInput() {
    this.num_1 = undefined;
    this.num_2 = undefined;
    this.num_3 = undefined;
    this.num_4 = undefined;
    this.num_5 = undefined;
    this.num_6 = undefined;
    this.searchedLottery = [];
    this.fetchLotterys(); // Fetch all lotteries if search returns no result
  }
  
}
