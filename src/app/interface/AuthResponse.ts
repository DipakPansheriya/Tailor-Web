export interface AuthResponse {
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
    registerd?:boolean
}

export interface CustomerList {
   id : string,
   firstName : string,
   lastName : string,
   mobileNo : number,
}

export interface Patterns {
    id: string,
    patternName: string,
    patternPrice : number,
    patternCategory : string,
}

export interface OrderPentMaster {
    id: string,
    l: string,
    k: string,
    shi: string,
    mo: string,
    ja: string,
    jo: string,
    go: string,
    patterns: string,
    additionalDesc: string,
    totalExtraCost: string,
    customerId: string,
    customerMobileNo: string,
    customerName: string,
    status: string,
    billNumber: Number,
    orderDate : any,
    deliveryDate: any,
    type: string,
    quantity: number,

}

export interface OrderShirtMaster {
    id: string,
    l: string,
    ba: string,
    cha: string,
    sho1: string,
    sho2: string,
    sho3: string,
    pe1: string,
    pe2: string,
    pe3: string,
    pe4: string,
    ko: string,
    k: string,
    kh: string,
    patterns: string,
    additionalDesc: string,
    totalExtraCost: string,
    customerId: string,
    customerMobileNo: string,
    customerName: string,
    status: string,
    billNumber: Number,
    orderDate: any, 
    deliveryDate: any,
    type: string,
    quantity: number,
}


export interface OrderJodiMaster {
    id : string
    pentL: string
    pentK: string
    shi: string
    mo: string
    ja: string
    jo: string
    go: string
    pentPatterns: string
    pentAdditionalDesc: string
    pentTotalExtraCost: number
    quantity: number
    shirtL: string
    ba: string
    cha: string
    sho1: string
    sho2: string
    sho3: string
    pe1: string
    pe2: string
    pe3: string
    pe4: string
    ko: string
    shirtK: string
    kh: string
    shirtPatterns: string
    shirtAdditionalDesc: string
    shirtTotalExtraCost: number
    deliveryDate: any
    shirtType: string
    type: string
    customerId : string
    customerMobileNo : string
    customerName : string
    status : string
    billNumber : number
    orderDate : any
}

export interface OrderMaster {

    id: string
    garmentType: string
    customerId : string
    customerMobileNo : string
    customerName : string
    status : string
    billNumber : number
    orderDate: any
    deliveryDate: any
    quantity: number
    pentDetails : {
        pentL: string
        pentK: string
        shi: string
        mo: string
        ja: string
        jo: string
        go: string
        pentPatterns: string
        pentAdditionalDesc: string
        pentTotalExtraCost: number
        quantity: number
    }

    shirtDetails : {
        shirtL: string
        ba: string
        cha: string
        sho1: string
        sho2: string
        sho3: string
        pe1: string
        pe2: string
        pe3: string
        pe4: string
        ko: string
        shirtK: string
        kh: string
        shirtPatterns: string
        shirtAdditionalDesc: string
        shirtTotalExtraCost: number
        shirtType: string
        quantity: number

    }
}