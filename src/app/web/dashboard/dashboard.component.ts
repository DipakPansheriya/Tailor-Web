import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from 'src/app/service/firebase.service';
// import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalOrders: any;
  totalCustomers: any; 

  constructor(
    private firebaseService: FirebaseService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getTotalCustomers();
    this.getTotalOrders()
  }

  getTotalOrders(): void {
    this.firebaseService.getAllOrderMaster().subscribe(res => {
      if (res) {
        this.totalOrders = res.length;
      } 
    })
  }

  getTotalCustomers(): void {
    this.firebaseService.getAllCustomers().subscribe(res => {
      if (res) {
        this.totalCustomers = res.length;
      } 
    })
  }

}
