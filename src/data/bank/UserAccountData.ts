interface UserAccount {
  _id: string;
  user: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  address: string;
  nationality: string;
  bankName: string;
  accountNo: string;
  bvn: number;
  country: string;
  balance: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BankAccountResponse {
  message: string;
  userAccount: UserAccount;
}