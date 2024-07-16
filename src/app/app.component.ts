import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor(private http : HttpClient){
    // let url = "http://localhost/webapi/lottory";
    // this.http.get(url).subscribe(data => {
    //   console.log(data);
    // });
  }
}
