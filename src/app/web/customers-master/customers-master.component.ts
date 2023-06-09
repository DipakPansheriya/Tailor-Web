import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { CustomerList } from 'src/app/interface/AuthResponse';
import { CustomMessageService } from 'src/app/service/custom-message/custom-message.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/Constant/message-constant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers-master',
  templateUrl: './customers-master.component.html',
  styleUrls: ['./customers-master.component.scss']
})
export class CustomersMasterComponent implements OnInit {

  first = 0;
  rows = 5;
  customerId :any;
  isEdit :boolean = false;
  customerForm : any =  FormGroup;
  // dialogHeader: string = 'Add New Customer';
  submitBtnLable = 'Submit';
  customersList: any = [];
  mobileValidPattern: RegExp = new RegExp(/^\d{0,10}$/g);
  validPatternName: RegExp = new RegExp(/^[a-zA-Z ]*$/g);

  constructor(
    private fb : FormBuilder,
    private messageService: CustomMessageService,
    private fireBaseService: FirebaseService,

  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
    this.buildCustomerForm()
  }
  
  getAllCustomers(): void {
    this.fireBaseService.getAllCustomers().subscribe((res => {
      if (res) {
        this.customersList = res;
      }
    }))
  }

  buildCustomerForm() {
    this.customerForm = this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      mobileNo : ['', Validators.required],
    })
  }

  get customerFormControl() {
    return this.customerForm.controls
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.customersList ? this.first === this.customersList.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.customersList ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
    const element: any = document.getElementById('orderSearch');
    element.value = ''
  }


  editCustomer(value: any): void{
    this.isEdit = true
    this.customerForm.controls.firstName.setValue(value.firstName);
    this.customerForm.controls.lastName.setValue(value.lastName);
    this.customerForm.controls.mobileNo.setValue(value.mobileNo);
    this.customerId = value.id;

  }

  addNewCutomer() {
    this.isEdit = false
    this.customerId = ''
    this.customerForm.reset()
  }

  onSubmit(): void {
    this.validateAllFormFields(this.customerForm)
    if (this.customerForm.invalid) {
      return this.messageService.openCustomMessage(msgType.ERROR, 'Please fill all mandatory fields!!')
    }
    const paylod: CustomerList = {
      id: this.customerId ? this.customerId : '' ,
      firstName: this.customerForm.value.firstName,
      lastName: this.customerForm.value.lastName,
      mobileNo: Number(this.customerForm.value.mobileNo),
    }
    if (!this.customerId) {
      this.fireBaseService.addCustomerData(paylod).then((res) => {
        if (res) {
          this.messageService.openCustomMessage(msgType.SUCCESS, 'Customer Added successfuly!!');
          this.customerForm.reset();
        }
      })
      .catch(error => this.messageService.openCustomMessage(msgType.SUCCESS, error.error.error.message))
    } else {
      this.fireBaseService.updateCustomerData(this.customerId, paylod).then((res) => {
          this.messageService.openCustomMessage(msgType.SUCCESS, 'Customer Updated successfuly!!');
          this.customerForm.reset();
      })
      .catch(error => this.messageService.openCustomMessage(msgType.SUCCESS, error.error.error.message))
    }

  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control : any = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }


  inputRestriction(event: any, type: any): any {
    if (type === 'mobile') {
      this.messageService.inputRestriction(event, this.mobileValidPattern)
    } else {
      this.messageService.inputRestriction(event, this.validPatternName)
    }
  }

}
