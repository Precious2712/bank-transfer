// types/debit.ts
interface DebitTransaction {
    _id: string;
    recieverEmail: string;
    sender: string;
    Amount: number;
    recieverFirstName: string;
    recieverLastName: string;
    recieverMiddleName: string;
    recieverBankName: string;
    recieverAccountNo: string;
    country: string;
    debitReceipt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface DebitRefResponse {
    message: string;
    debitRef: DebitTransaction[];
}