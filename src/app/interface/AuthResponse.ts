export interface AuthResponse {
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string
    registerd?:boolean
}

export interface UserList { 
    id: string,
    email:string,
    password:string,
    mobileNo: number,
    companyMobile: number,
    companyName: string,
    companyAddress: number,
    status: string,
    endDate: boolean,
    userRole: string,
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
export interface ArticalRateInfo {
    id: string,
    articalTypeName: string,
    articalRate : number,
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
    pantDetails : {
        pantL: string
        pantK: string
        shi: string
        mo: string
        ja: string
        jo: string
        go: string
        pantPatterns: string
        pantAdditionalDesc: string
        pantTotalExtraCost: number
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