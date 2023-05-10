import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
import { CustomerList, OrderMaster, Patterns, UserList } from '../interface/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  UserId: any
  constructor(
    private fService: Firestore
  ) {
    this.UserId = localStorage.getItem('userId')

  }

  // UserList

  addUserData(data: UserList) {
    data.id = doc(collection(this.fService, 'id')).id
    localStorage.setItem("userID", data.id)
    return addDoc(collection(this.fService, 'UserList'), data)
  }

  getAllUserList() {
    let dataRef = collection(this.fService, 'UserList')
    return collectionData(dataRef, { idField: 'id' })
  }

  // CustomerList

  addCustomerData(data: CustomerList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'UserList', this.UserId ,'CustomerList'), data)
  }

  getAllCustomers() {
    let dataRef = collection(this.fService, `UserList/${this.UserId}/CustomerList`)
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteCustomerData(data: CustomerList) {
    let docRef = doc(collection(this.fService, `UserList/${this.UserId}/CustomerList`), data.id);
    return deleteDoc(docRef)
  }

  updateCustomerData(data: CustomerList, CustomerList: any) {
    let dataRef = doc(this.fService, `UserList/${this.UserId}/CustomerList/${data}`);
    return updateDoc(dataRef, CustomerList)
  }

  // Patterns
  addPattern(data: Patterns) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'UserList', this.UserId, 'Patterns'), data)
  }

  getAllPatterns() {
    let dataRef = collection(this.fService, `UserList/${this.UserId}/Patterns`)
    return collectionData(dataRef, { idField: 'id' })
  }
  
  deletePattern(data: Patterns) {
    let docRef = doc(collection(this.fService, `UserList/${this.UserId}/Patterns`), data.id);
    return deleteDoc(docRef)
  }

  updatePattern(data: Patterns, Patterns: any) {
    let dataRef = doc(this.fService, `UserList / ${ this.UserId }/Patterns/${data}`);
    return updateDoc(dataRef, Patterns)
  }

  // ============= Order Data CRUD
  addOrderMaster(data: OrderMaster) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'UserList', this.UserId, 'OrderMaster'), data)
  }

  getAllOrderMaster() {
    let dataRef = collection(this.fService, `UserList/${this.UserId}/OrderMaster`)
    return collectionData(dataRef, { idField: 'id' })
  }

  updateOrderMaster(data: OrderMaster, OrderMaster: any) {
    let dataRef = doc(this.fService, `UserList/${ this.UserId }/OrderMaster/${data}`);
    return updateDoc(dataRef, OrderMaster)
  }

}
