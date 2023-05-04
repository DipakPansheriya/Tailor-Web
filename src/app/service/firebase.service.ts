import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { updateDoc } from 'firebase/firestore';
import { CustomerList, OrderJodiMaster, OrderMaster, OrderPentMaster, OrderShirtMaster, Patterns } from '../interface/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
   private fService : Firestore
  ) { }

  addData(data: CustomerList) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'CustomerList'), data)
  }

  getAllData() {
    let dataRef = collection(this.fService, 'CustomerList')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteData(data: CustomerList) {
    let docRef = doc(collection(this.fService, 'CustomerList'), data.id);
    return deleteDoc(docRef)
  }

  updateData(data: CustomerList, CustomerList: any) {
    let dataRef = doc(this.fService, `CustomerList/${data}`);
    return updateDoc(dataRef, CustomerList)
  }


  addPattern(data: Patterns) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'Patterns'), data)
  }

  getAllPatterns() {
    let dataRef = collection(this.fService, 'Patterns')
    return collectionData(dataRef, { idField: 'id' })
  }
  
  deletePattern(data: Patterns) {
    let docRef = doc(collection(this.fService, 'Patterns'), data.id);
    return deleteDoc(docRef)
  }

  updatePattern(data: Patterns, Patterns: any) {
    let dataRef = doc(this.fService, `Patterns/${data}`);
    return updateDoc(dataRef, Patterns)
  }


  addOrderShirtMaster(data: OrderShirtMaster) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'OrderShirtMaster'), data)
  }

  getAllOrderShirtMaster() {
    let dataRef = collection(this.fService, 'OrderShirtMaster')
    return collectionData(dataRef, { idField: 'id' })
  }
  
  deleteOrderShirt(data: OrderShirtMaster) {
    let docRef = doc(collection(this.fService, 'OrderShirtMaster'), data.id);
    return deleteDoc(docRef)
  }

  updateOrderShirt(data: OrderShirtMaster, OrderShirtMaster: any) {
    let dataRef = doc(this.fService, `OrderShirtMaster/${data}`);
    return updateDoc(dataRef, OrderShirtMaster)
  }

  addOrderPentMaster(data: OrderPentMaster) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'OrderPentMaster'), data)
  }

  getAllOrderPentMaster() {
    let dataRef = collection(this.fService, 'OrderPentMaster')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteOrderPentMaster(data: OrderPentMaster) {
    let docRef = doc(collection(this.fService, 'OrderPentMaster'), data.id);
    return deleteDoc(docRef)
  }

  updateOrderPentMaster(data: OrderPentMaster, OrderPentMaster: any) {
    let dataRef = doc(this.fService, `OrderPentMaster/${data}`);
    return updateDoc(dataRef, OrderPentMaster)
  }

  addOrderJodiMaster(data: OrderJodiMaster) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'OrderJodiMaster'), data)
  }

  getAllOrderJodiMaster() {
    let dataRef = collection(this.fService, 'OrderJodiMaster')
    return collectionData(dataRef, { idField: 'id' })
  }

  deleteOrderJodiMaster(data: OrderJodiMaster) {
    let docRef = doc(collection(this.fService, 'OrderJodiMaster'), data.id);
    return deleteDoc(docRef)
  }

  updateOrderJodiMaster(data: OrderJodiMaster, OrderJodiMaster: any) {
    let dataRef = doc(this.fService, `OrderJodiMaster/${data}`);
    return updateDoc(dataRef, OrderJodiMaster)
  }

  // ============= Order Data CRUD
  addOrderMaster(data: OrderMaster) {
    data.id = doc(collection(this.fService, 'id')).id
    return addDoc(collection(this.fService, 'OrderMaster'), data)
  }

  getAllOrderMaster() {
    let dataRef = collection(this.fService, 'OrderMaster')
    return collectionData(dataRef, { idField: 'id' })
  }

  updateOrderMaster(data: OrderMaster, OrderMaster: any) {
    let dataRef = doc(this.fService, `OrderMaster/${data}`);
    return updateDoc(dataRef, OrderMaster)
  }


}
