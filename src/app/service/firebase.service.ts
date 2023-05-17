import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
import { ArticalRateInfo, CustomerList, OrderMaster, Patterns, UserList } from '../interface/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private fService: Firestore
  ) { }

  userId() : string {
    let userId : any= '';
    userId = localStorage.getItem('userId');
    return userId
  }
  
  addUserData(data: UserList) {
    data.id = doc(collection(this.fService, 'id')).id
    localStorage.setItem("userID", data.id)
    return addDoc(collection(this.fService, 'UserList'), data)
  }

  getAllUserList() {
    let dataRef = collection(this.fService, `UserList`)
    return collectionData(dataRef, { idField: 'id' })
  }

  updateUserData(data: UserList, UserList: any) {
    let dataRef = doc(this.fService, `UserList/${data}`);
    return updateDoc(dataRef, UserList)
  }

  // CustomerList

  addCustomerData(data: CustomerList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'UserList', this.userId() ,'CustomerList'), data)
  }

  getAllCustomers() {
    let dataRef = collection(this.fService, `UserList/${this.userId()}/CustomerList`)
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteCustomerData(data: CustomerList) {
    let docRef = doc(collection(this.fService, `UserList/${this.userId()}/CustomerList`), data.id);
    return deleteDoc(docRef)
  }

  updateCustomerData(data: CustomerList, CustomerList: any) {
    let dataRef = doc(this.fService, `UserList/${this.userId()}/CustomerList/${data}`);
    return updateDoc(dataRef, CustomerList)
  }

  // Patterns
  addPattern(data: Patterns) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'UserList', this.userId(), 'Patterns'), data)
  }

  getAllPatterns() {
    let dataRef = collection(this.fService, `UserList/${this.userId()}/Patterns`)
    return collectionData(dataRef, { idField: 'id' })
  }
  
  deletePattern(data: Patterns) {
    let docRef = doc(collection(this.fService, `UserList/${this.userId()}/Patterns`), data.id);
    return deleteDoc(docRef)
  }

  updatePattern(data: Patterns, Patterns: any) {
    let dataRef = doc(this.fService, `UserList/${ this.userId() }/Patterns/${data}`);
    return updateDoc(dataRef, Patterns)
  }

  // ============= Order Data CRUD
  addOrderMaster(data: OrderMaster) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'UserList', this.userId(), 'OrderMaster'), data)
  }

  getAllOrderMaster() {
    let dataRef = collection(this.fService, `UserList/${this.userId()}/OrderMaster`)
    return collectionData(dataRef, { idField: 'id' })
  }

  updateOrderMaster(data: OrderMaster, OrderMaster: any) {
    let dataRef = doc(this.fService, `UserList/${ this.userId() }/OrderMaster/${data}`);
    return updateDoc(dataRef, OrderMaster)
  }

  deleteOrderData(data: Patterns) {
    let docRef = doc(collection(this.fService, `UserList/${this.userId()}/OrderMaster`), data.id);
    return deleteDoc(docRef)
  }
  // ============= Artical Rate Info Data CRUD

  addArticalRateInfo(data: ArticalRateInfo) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'UserList', this.userId(), 'ArticalRateInfo'), data)
  }

  getAllArticalRateInfo() {
    let dataRef = collection(this.fService, `UserList/${this.userId()}/ArticalRateInfo`)
    return collectionData(dataRef, { idField: 'id' })
  }

  updateArticalRateInfo(data: ArticalRateInfo, ArticalRateInfo: any) {
    let dataRef = doc(this.fService, `UserList/${ this.userId() }/ArticalRateInfo/${data}`);
    return updateDoc(dataRef, ArticalRateInfo)
  }

}
