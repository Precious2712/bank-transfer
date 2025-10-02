export const banks = [
    'Access Bank',
    'Zenith Bank',
    'First Bank of Nigeria',
    'United Bank for Africa (UBA)',
    'Guaranty Trust Bank (GTBank)',
    'Union Bank of Nigeria',
    'Stanbic IBTC Bank',
    'Fidelity Bank',
    'Ecobank Nigeria',
    'Sterling Bank',
    'Polaris Bank',
    'Keystone Bank',
    'Wema Bank',
    'Jaiz Bank',
    'Unity Bank'
]

export interface BankAccount {
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
}