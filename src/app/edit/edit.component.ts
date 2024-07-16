// edit-admin.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  editedItem: any = {};

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const itemId = params['lot_id'];
      console.log(itemId);
      this.http
        .get(this.dataService.apiEndpoint + `/admin-show/${itemId}`)
        .subscribe((data: any) => {
          this.editedItem = data;
          console.log(this.editedItem);
        });
    });
  }

  updateItem() {
    this.http
      .put(
        this.dataService.apiEndpoint +
          `/admin-update/${this.editedItem.lot_id}`,
        this.editedItem
      )
      .subscribe(() => {
        Swal.fire('แก้ไขรายการสำเร็จ!', 'รายการถูกแก้ไขแล้ว', 'success');
        this.router.navigate(['/dashboard']);
      });
  }
}
