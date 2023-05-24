import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UserList } from 'src/app/interface/AuthResponse';
import { CustomMessageService } from 'src/app/service/custom-message/custom-message.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/Constant/message-constant';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-master',
  templateUrl: './admin-master.component.html',
  styleUrls: ['./admin-master.component.scss']
})
export class AdminMasterComponent implements OnInit {

  userList: any
  recodeStaus: any
  editUserItem: any
  editUserList: any;
  date: any;

  constructor(private firebaseService: FirebaseService,
    private messageService: CustomMessageService,
    private location: Location,
    private router :Router
    ) { }

  ngOnInit(): void {
    this.getAllUserData()
  }

  getAllUserData() {

    this.firebaseService.getAllUserList().subscribe((res: any) => {
      if (res) {
        this.userList = res;
        this.userList.forEach((ele: any, index: number) => {
          ele['boolean'] = ele.status == 'active' ? true : false
        })
        const userData = this.userList.find((id: any) => id.id === localStorage.getItem('userId')).userRole
        if (userData === 'admin') {

        } else {          
          this.location.back();
          // this.router.navigate(['login'])
          // localStorage.clear()
        }
      }
    })
  }

  editUserData(item: any) {
    this.editUserItem = item?.boolean
    this.editUserList = item;
    this.date = moment(item.endDate).toDate()
  }

  recodeStausChange(event: any) {
    this.recodeStaus = event.checked
  }

  submitUser() {
    const newdate = moment(this.date).format('YYYY-MM-DD')
    const payload: UserList = {
      id: this.editUserList?.id,
      email: this.editUserList?.email,
      mobileNo: this.editUserList?.mobileNo,
      companyMobile: this.editUserList?.companyMobile,
      companyName: this.editUserList?.companyName,
      companyAddress: this.editUserList?.companyAddress,
      password: this.editUserList?.password,
      status: this.recodeStaus ? 'active' : 'inactive',
      endDate: newdate,
      userRole: 'user'
    }
    this.firebaseService.updateUserData(this.editUserList?.id, payload).then((res: any) => {

      this.messageService.openCustomMessage(msgType.SUCCESS, `User Update Successfully..`)
    })

  }
}
