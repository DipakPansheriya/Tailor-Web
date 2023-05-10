import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Table } from 'primeng/table';
import { OrderMaster } from 'src/app/interface/AuthResponse';
import { CustomMessageService } from 'src/app/service/custom-message/custom-message.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/Constant/message-constant';

@Component({
  selector: 'app-order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.scss']
})
  
export class OrderMasterComponent implements OnInit {

  jodiForm!: FormGroup;
  searchCustomer: any;
  fullName: any;
  mobileNo: any;
  customerId: any;
  shirtType =
    [
      { id: 'Open', value: "Open" },
      { id: 'Bushirt', value: "Bushirt" }
    ]
  customersList: any = [];
  shirtList: any = [];
  pentList: any = [];
  allPatterns: any = []
  jodiList : any = []
  pentPatternsList: any = [];
  shirtPatternsList: any = [];
  selectedCities: any
  pentPattern: any
  pentPrice: any
  shirtPattern: any;
  shirtPatternPrice: any;
  validMobilePattern: RegExp = new RegExp(/^\d{0,10}$/g);
  measurementPattern: RegExp = new RegExp(/^[0-9|.\/]+$/);
  qtyPattern: RegExp = new RegExp(/^[0-9|]+$/);
  allOrderList: any = [];
  latestBillNo: any;
  isEdit = false;
  headingName = this.translateService.instant('ORDER.ORDER_LIST.ORDER_BTN');
  orderData: any;
  orderId: any;
  currentDate = new Date()

  constructor(
    private fb: FormBuilder,
    private fireBaseService: FirebaseService,
    private messageService: CustomMessageService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.buildJodiForm();
    this.getAllCustomers();
    this.getAllPatterns()
    this.getAllOrders();
  }

  clear(table: Table) {
    table.clear();
    const element :any = document.getElementById('orderSearch');
    element.value = ''
  }

  editOrder(value: any): void {
    this.orderData = value
    this.orderId = value.id
    this.headingName = this.translateService.instant('ORDER.ORDER_LIST.EDIT_BTN');
    this.isEdit = true;
    this.setOrderData(value)
  }

  setOrderData(value: any) {
    this.searchCustomer = value.customerMobileNo;
    this.fullName = value.customerName
    this.mobileNo = value.customerMobileNo
    this.customerId = value.customerId
    this.jodiForm.controls['jodiQuantity'].setValue(Number(value?.quantity))
    this.jodiForm.controls['garmentType'].setValue(value?.garmentType)
    this.jodiForm.controls['pentQuantity'].setValue(Number(value?.pentDetails?.quantity))
    this.jodiForm.controls['pentL'].setValue(value?.pentDetails?.pentL)
    this.jodiForm.controls['pentK'].setValue(value?.pentDetails?.pentK)
    this.jodiForm.controls['shi'].setValue(value?.pentDetails?.shi)
    this.jodiForm.controls['mo'].setValue(value?.pentDetails?.mo)
    this.jodiForm.controls['ja'].setValue(value?.pentDetails?.ja)
    this.jodiForm.controls['jo'].setValue(value?.pentDetails?.jo)
    this.jodiForm.controls['go'].setValue(value?.pentDetails?.go)
    this.jodiForm.controls['pentPatterns'].setValue(value?.pentDetails?.pentPatterns)
    this.jodiForm.controls['pentAdditionalDesc'].setValue(value?.pentDetails?.pentAdditionalDesc)
    this.jodiForm.controls['pentTotalExtraCost'].setValue(value?.pentDetails?.pentTotalExtraCost)
    this.jodiForm.controls['shirtQuantity'].setValue(Number(value?.shirtDetails?.quantity))
    this.jodiForm.controls['shirtL'].setValue(value?.shirtDetails?.shirtL)
    this.jodiForm.controls['ba'].setValue(value?.shirtDetails?.ba)
    this.jodiForm.controls['cha'].setValue(value?.shirtDetails?.cha)
    this.jodiForm.controls['sho1'].setValue(value?.shirtDetails?.sho1)
    this.jodiForm.controls['sho2'].setValue(value?.shirtDetails?.sho2)
    this.jodiForm.controls['sho3'].setValue(value?.shirtDetails?.sho3)
    this.jodiForm.controls['pe1'].setValue(value?.shirtDetails?.pe1)
    this.jodiForm.controls['pe2'].setValue(value?.shirtDetails?.pe2)
    this.jodiForm.controls['pe3'].setValue(value?.shirtDetails?.pe3)
    this.jodiForm.controls['pe4'].setValue(value?.shirtDetails?.pe4)
    this.jodiForm.controls['ko'].setValue(value?.shirtDetails?.ko)
    this.jodiForm.controls['shirtK'].setValue(value?.shirtDetails?.shirtK)
    this.jodiForm.controls['kh'].setValue(value?.shirtDetails?.kh)
    this.jodiForm.controls['shirtPatterns'].setValue(value?.shirtDetails?.shirtPatterns)
    this.jodiForm.controls['shirtAdditionalDesc'].setValue(value?.shirtDetails?.shirtAdditionalDesc)
    this.jodiForm.controls['shirtTotalExtraCost'].setValue(value?.shirtDetails?.shirtTotalExtraCost)
    this.jodiForm.controls['deliveryDate'].setValue(new Date(value?.deliveryDate))
    this.jodiForm.controls['shirtType'].setValue(value?.shirtDetails?.shirtType)
  }

  addOrder() {
    this.isEdit = false;
    this.searchCustomer = '';
    this.customerId = ''
    this.mobileNo = ''
    this.fullName = ''
    this.headingName = this.translateService.instant('ORDER.ORDER_LIST.ORDER_BTN');
    this.jodiForm.reset();
    this.jodiForm.controls['garmentType'].setValue('Jodi');
    this.orderId = '';
  }


  buildJodiForm() : void {
    this.jodiForm = this.fb.group({
      garmentType : [''],
      jodiQuantity: [0],
      pentL: [''],
      pentK: [''],
      shi: [''],
      mo: [''],
      ja: [''],
      jo: [''],
      go: [''],
      pentPatterns: [''],
      pentAdditionalDesc: [''],
      pentTotalExtraCost: [0],
      pentQuantity: [0],
      shirtQuantity: [0],
      shirtL: [''],
      ba: [''],
      cha: [''],
      sho1: [''],
      sho2: [''],
      sho3: [''],
      pe1: [''],
      pe2: [''],
      pe3: [''],
      pe4: [''],
      ko: [''],
      shirtK: [''],
      kh: [''],
      shirtPatterns: [''],
      shirtAdditionalDesc: [''],
      shirtTotalExtraCost: [0],
      deliveryDate: [''],
      shirtType: [''],
    })
  }

  getAllCustomers(): void {
    this.fireBaseService.getAllCustomers().subscribe((res => {
      if (res) {
        this.customersList = res;
      }
    }))
  }

  getAllPatterns(): void {
    this.fireBaseService.getAllPatterns().subscribe((res => {
      if (res) {
        this.allPatterns = res;
        this.shirtPatternsList = this.allPatterns.filter((id: any) => id.patternCategory === 'Shirt');
        this.pentPatternsList = this.allPatterns.filter((id: any) => id.patternCategory === 'Pent');
      }
    }))
  }

  jodiSubmit(): void {
    
    this.validateAllFormFields(this.jodiForm)
    if (this.jodiForm.invalid) {
      return this.messageService.openCustomMessage(msgType.ERROR, this.translateService.instant('COMMON_MESSAGE.Filledrequired'))
    }

    const payload: OrderMaster = {
      id: this.orderId ? this.orderId : '',
      garmentType: this.jodiForm.value.garmentType,
      customerId: this.customerId,
      customerMobileNo: this.mobileNo,
      customerName: this.fullName,
      status: 'Pending',
      billNumber: this.orderId ? this.orderData.billNumber : Number(this.latestBillNo),
      orderDate: moment().format('YYYY-MM-DD'),
      deliveryDate: moment(this.jodiForm.value?.deliveryDate).format('YYYY-MM-DD'),
      quantity: Number(this.jodiForm.value.jodiQuantity),

      pentDetails: {
        pentL: this.jodiForm.value.pentL,
        pentK: this.jodiForm.value.pentK,
        shi: this.jodiForm.value.shi,
        mo: this.jodiForm.value.mo,
        ja: this.jodiForm.value.ja,
        jo: this.jodiForm.value.jo,
        go: this.jodiForm.value.go,
        pentPatterns: this.jodiForm.value.pentPatterns,
        pentAdditionalDesc: this.jodiForm.value.pentAdditionalDesc,
        pentTotalExtraCost: Number(this.jodiForm.value.pentTotalExtraCost),
        quantity: Number(this.jodiForm.value.pentQuantity),
      },

      shirtDetails: {
        shirtL: this.jodiForm.value.shirtL,
        ba: this.jodiForm.value.ba,
        cha: this.jodiForm.value.cha,
        sho1: this.jodiForm.value.sho1,
        sho2: this.jodiForm.value.sho2,
        sho3: this.jodiForm.value.sho3,
        pe1: this.jodiForm.value.pe1,
        pe2: this.jodiForm.value.pe2,
        pe3: this.jodiForm.value.pe3,
        pe4: this.jodiForm.value.pe4,
        ko: this.jodiForm.value.ko,
        shirtK: this.jodiForm.value.shirtK,
        kh: this.jodiForm.value.kh,
        shirtPatterns: this.jodiForm.value.shirtPatterns,
        shirtAdditionalDesc: this.jodiForm.value.shirtAdditionalDesc,
        shirtTotalExtraCost: Number(this.jodiForm.value.shirtTotalExtraCost),
        shirtType: this.jodiForm.value.shirtType,
        quantity: Number(this.jodiForm.value.shirtQuantity)
      },
    }

    if (!this.orderId) {
      this.fireBaseService.addOrderMaster(payload).then(res => {
        if (res) {
          this.jodiForm.reset();
          this.messageService.openCustomMessage(msgType.SUCCESS, this.translateService.instant('COMMON_MESSAGE.SubmitData'));
        }
      })
    } else {
      this.fireBaseService.updateOrderMaster(this.orderId, payload).then((res: any) => {
        this.jodiForm.reset();
        this.messageService.openCustomMessage(msgType.SUCCESS, this.translateService.instant('COMMON_MESSAGE.UpdateData'));
      })
    }

  }

  
  // pentPatternSelection(): void {
  //   if (this.pentForm.value?.patterns?.length > 0) {
  //     const data = this.pentForm.value.patterns.map((id: any) => Number(id.patternPrice))
  //     const finalAmount = data?.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
  //     this.pentForm.controls['totalExtraCost'].setValue(finalAmount)
  //   } else {
  //     this.pentForm.controls['totalExtraCost'].setValue(0)
  //   }
  // }

  // shirtPatternSelection(): void {
  //   if (this.shirtForm.value?.patterns?.length > 0) {
  //     const data = this.shirtForm.value.patterns.map((id: any) => Number(id.patternPrice))
  //     const finalAmount = data?.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
  //     this.shirtForm.controls['totalExtraCost'].setValue(finalAmount)
  //   } else {
  //     this.shirtForm.controls['totalExtraCost'].setValue(0)
  //   }
  // }

  jodiPatternSelection(type: any): void {
    if (type == 'pent') {
      if (this.jodiForm.value?.pentPatterns?.length > 0) {
        const data = this.jodiForm.value.pentPatterns.map((id: any) => Number(id.patternPrice))
        const finalAmount = data?.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
        this.jodiForm.controls['pentTotalExtraCost'].setValue(finalAmount)
      } else {
        this.jodiForm.controls['pentTotalExtraCost'].setValue(0)
      }
    } else {
      if (this.jodiForm.value?.shirtPatterns?.length > 0) {
        const data = this.jodiForm.value.shirtPatterns.map((id: any) => Number(id.patternPrice))
        const finalAmount = data?.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
        this.jodiForm.controls['shirtTotalExtraCost'].setValue(finalAmount)
      } else {
        this.jodiForm.controls['shirtTotalExtraCost'].setValue(0)
      }
    }
  }

  search(): void {
    const existingCustomer = this.customersList.find((id: any) => id.mobileNo == this.searchCustomer)
    if (existingCustomer) {
      this.fullName = existingCustomer.firstName + ' ' + existingCustomer.lastName;
      this.mobileNo = existingCustomer.mobileNo;
      this.customerId = existingCustomer.id;
    } else {
      this.messageService.openCustomMessage(msgType.INFO, this.translateService.instant('COMMON_MESSAGE.CustomerNotFound'));
    }
    let customerData = this.allOrderList.find((id: any) => id.billNumber === Math.max(...this.allOrderList.filter((id: any) => id.customerId === existingCustomer.id).map((id: any) => id.billNumber)))
    if (customerData) {
      this.jodiForm.controls['garmentType'].setValue(customerData?.garmentType)
        this.jodiForm.controls['jodiQuantity'].setValue(Number(customerData?.quantity))
        this.jodiForm.controls['pentL'].setValue(customerData?.pentDetails?.pentL)
        this.jodiForm.controls['pentK'].setValue(customerData?.pentDetails?.pentK)
        this.jodiForm.controls['shi'].setValue(customerData?.pentDetails?.shi)
        this.jodiForm.controls['mo'].setValue(customerData?.pentDetails?.mo)
        this.jodiForm.controls['ja'].setValue(customerData?.pentDetails?.ja)
        this.jodiForm.controls['jo'].setValue(customerData?.pentDetails?.jo)
        this.jodiForm.controls['go'].setValue(customerData?.pentDetails?.go)
        this.jodiForm.controls['pentPatterns'].setValue(customerData?.pentDetails?.pentPatterns)
        this.jodiForm.controls['pentAdditionalDesc'].setValue(customerData?.pentDetails?.pentAdditionalDesc)
        this.jodiForm.controls['pentTotalExtraCost'].setValue(customerData?.pentDetails?.pentTotalExtraCost)
        this.jodiForm.controls['pentQuantity'].setValue(Number(customerData?.pentDetails?.quantity))
      
        this.jodiForm.controls['shirtL'].setValue(customerData?.shirtDetails?.shirtL)
        this.jodiForm.controls['ba'].setValue(customerData?.shirtDetails?.ba)
        this.jodiForm.controls['cha'].setValue(customerData?.shirtDetails?.cha)
        this.jodiForm.controls['sho1'].setValue(customerData?.shirtDetails?.sho1)
        this.jodiForm.controls['sho2'].setValue(customerData?.shirtDetails?.sho2)
        this.jodiForm.controls['sho3'].setValue(customerData?.shirtDetails?.sho3)
        this.jodiForm.controls['pe1'].setValue(customerData?.shirtDetails?.pe1)
        this.jodiForm.controls['pe2'].setValue(customerData?.shirtDetails?.pe2)
        this.jodiForm.controls['pe3'].setValue(customerData?.shirtDetails?.pe3)
        this.jodiForm.controls['pe4'].setValue(customerData?.shirtDetails?.pe4)
        this.jodiForm.controls['ko'].setValue(customerData?.shirtDetails?.ko)
        this.jodiForm.controls['shirtK'].setValue(customerData?.shirtDetails?.shirtK)
        this.jodiForm.controls['kh'].setValue(customerData?.shirtDetails?.kh)
        this.jodiForm.controls['shirtPatterns'].setValue(customerData?.shirtDetails?.shirtPatterns)
        this.jodiForm.controls['shirtAdditionalDesc'].setValue(customerData?.shirtDetails?.shirtAdditionalDesc)
        this.jodiForm.controls['shirtTotalExtraCost'].setValue(customerData?.shirtDetails?.shirtTotalExtraCost)
        this.jodiForm.controls['deliveryDate'].setValue(new Date(customerData?.deliveryDate))
        this.jodiForm.controls['shirtType'].setValue(customerData?.shirtDetails?.shirtType)
        this.jodiForm.controls['shirtQuantity'].setValue(Number(customerData?.shirtDetails?.quantity))
    }
  }

  
  getAllOrders(): void {
    this.fireBaseService.getAllOrderMaster().subscribe(res => {
      this.allOrderList = res;
      this.allOrderList.sort((a: any, b: any) => b.billNumber - a.billNumber)
      this.latestBillNo = this.allOrderList.length === 0 ? 1 : Math.max(...this.allOrderList.map((o: any) => o.billNumber)) + 1      
    })

  }


  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control: any = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  inputRestriction(event: any, type? : any ): any {
    if (type && type === 'qty') {
      this.messageService.inputRestriction(event, this.qtyPattern)
    } else {
      this.messageService.inputRestriction(event, this.measurementPattern)
    }
  }

}
