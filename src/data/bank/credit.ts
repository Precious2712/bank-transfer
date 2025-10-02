// types/dcredit.ts
interface CreditTransaction {
    _id: string;
    reciever: string;
    senderEmail: string;
    Amount: number;
    senderFirstName: string;
    senderLastName: string;
    senderMiddleName: string;
    bank: string;
    accountNo: string;
    country: string;
    creditReceipt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface CreditRefResponse {
    message: string;
    creditRef: CreditTransaction[];
}