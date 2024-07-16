import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navber',
  templateUrl: './navber.component.html',
  styleUrls: ['./navber.component.scss'],
})
export class NavberComponent {
  userData: any;

  constructor(private dataService: DataService, private http: HttpClient) {
    this.dataService.userData$.subscribe((userData) => {
      this.userData = userData;
      console.log(this.userData);

      // console.log(userData.firstname);
    });
  }
}
