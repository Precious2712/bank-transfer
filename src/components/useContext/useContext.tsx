'use client';

import axios, { isAxiosError } from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { BankAccountResponse } from "@/data/bank/UserAccountData";
import { toast } from "sonner";
import { BankAccount } from "@/data/bank/bakName";
import { DebitRefResponse } from "@/data/bank/debit";
import { CreditRefResponse } from "@/data/bank/credit";

type SearchFilter = {
    bankName: string;
    accountNo: string;
};

type SearchResult = BankAccount[];

type AppContextType = {
    openHandle: () => void;
    slide: boolean;
    isLoading: boolean;
    isRolling: boolean;
    loading: boolean;
    checking: boolean;
    data: BankAccountResponse | null;
    balance: number;
    currentBal: number | null;
    bankName: string;
    accountNo: string;
    userBankAcctInfo: BankAccount[] | null;
    credit: () => void;
    fundBalance: () => void;
    setNewBalance: React.Dispatch<React.SetStateAction<number>>;
    setBankName: React.Dispatch<React.SetStateAction<string>>;
    setAccountNo: React.Dispatch<React.SetStateAction<string>>;
    searchField: (filter: SearchFilter) => Promise<SearchResult | null>;
    fund: number;
    setFund: React.Dispatch<React.SetStateAction<number>>;
    debitTransfer: () => void;
    debitRef: DebitRefResponse | null;
    creditRef: CreditRefResponse | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
    children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
    const [slide, setSlide] = useState(false);
    const [data, setData] = useState<null | BankAccountResponse>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [balance, setNewBalance] = useState(0);
    const [currentBal, setCurrentBal] = useState<number | null>(null);
    const [bankName, setBankName] = useState("");
    const [accountNo, setAccountNo] = useState('');
    const [loading, setLoading] = useState(false);
    const [userBankAcctInfo, setUserBankAccountInfo] = useState<BankAccount[] | null>(null);
    const [fund, setFund] = useState(0);
    const [debitRef, seDebitRef] = useState<DebitRefResponse | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [creditRef, setCreditRef] = useState<CreditRefResponse | null>(null);
    const [checking, setChecking] = useState(false);

    const openHandle = () => setSlide(!slide);

    
    const getUserBankAccountDetails = async () => {
        const id = localStorage.getItem('id');
        if (!id) return; 

        try {
            setIsLoading(true);
            const res = await axios.get<BankAccountResponse>(`https://money-transfer-1.onrender.com/bank-account/${id}`);
            const account = res.data;
            setData(account);
            setCurrentBal(account.userAccount.balance ?? 0);
            toast.success("User account loaded");
        } catch (error) {
            let msg = "An error occurred";
            if (isAxiosError(error)) {
                msg = error.response?.data?.message || msg;
            }
            toast.error(msg);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fundBalance = async () => {
        const id = localStorage.getItem('id');
        if (!id) {
            toast.error(`No user ID found`);
            return;
        }
        try {
            const res = await axios.put(`https://money-transfer-1.onrender.com/bank-account/${id}`, { balance });
            setCurrentBal(res.data?.newBalance ?? balance);
            console.log("Balance updated:", res.data?.newBalance);
        } catch (error) {
            let errMsg = 'An error has occurred';
            if (isAxiosError(error)) {
                errMsg = error.response?.data.message;
            }
            toast.error(errMsg);
        }
    };

    const searchField = async (filter: SearchFilter): Promise<SearchResult | null> => {
        const params = new URLSearchParams(filter);
        try {
            setLoading(true);
            const res = await axios.get<{ success: boolean; message: string; result: BankAccount[] }>(
                "https://money-transfer-1.onrender.com/bank-account/search",
                { params }
            );
            if (!res.data.success || !res.data.result || res.data.result.length === 0) {
                toast.error(res.data.message || "Bank account not found");
                return null;
            }
            setUserBankAccountInfo(res.data.result);
            toast.success(res.data.message || "Bank accounts found");
            localStorage.setItem('creditUser', res.data.result[0].user);
            return res.data.result;
        } catch (error) {
            let errs = "An error has occurred";
            if (isAxiosError(error)) {
                errs = error.response?.data?.message || errs;
            }
            toast.error(errs);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const credit = async () => {
        try {
            if (!userBankAcctInfo || userBankAcctInfo.length === 0) {
                toast.error("No user bank account info found");
                return;
            }
            const obj = {
                reciever: userBankAcctInfo[0].user,
                senderEmail: data?.userAccount.lastName,
                senderFirstName: userBankAcctInfo[0].firstName,
                senderLastName: userBankAcctInfo[0].lastName,
                senderMiddleName: userBankAcctInfo[0].middleName,
                Amount: fund,
                accountNo: userBankAcctInfo[0].accountNo,
                bank: userBankAcctInfo[0].bankName,
                country: userBankAcctInfo[0].country,
            };
            const alertForCredit = await axios.post(
                "https://money-transfer-1.onrender.com/credit/create",
                obj
            );
            console.log("✅ Credit alert response:", alertForCredit.data);
            toast.success("Credit alert created successfully");
        } catch (error) {
            let err = "An error has occurred";
            if (isAxiosError(error)) {
                err = error.response?.data.message || err;
            }
            toast.error(err);
        }
    };

    const debitTransfer = async () => {
        try {
            if (!userBankAcctInfo || userBankAcctInfo.length === 0) {
                toast.error("No user bank account info found");
                return;
            }
            const obj = {
                sender: data?.userAccount.user,
                recieverEmail: userBankAcctInfo[0].email,
                recieverFirstName: userBankAcctInfo[0].firstName,
                recieverLastName: userBankAcctInfo[0].lastName,
                recieverMiddleName: userBankAcctInfo[0].middleName,
                Amount: fund,
                recieverAccountNo: userBankAcctInfo[0].accountNo,
                recieverBankName: userBankAcctInfo[0].bankName,
                country: userBankAcctInfo[0].country,
            };
            const res = await axios.post('https://money-transfer-1.onrender.com/debit/create', obj);
            console.log(res.data);
        } catch (error) {
            let err = "An error has occurred";
            if (isAxiosError(error)) {
                err = error.response?.data.message || err;
            }
            toast.error(err);
        }
    };

    const fetchDebitTransaction = async () => {
        const id = localStorage.getItem('id');
        if (!id) return; 
        try {
            setIsRolling(true);
            const res = await axios.get<DebitRefResponse>(`https://money-transfer-1.onrender.com/debit/${id}`);
            seDebitRef(res.data);
            toast.success(`${res.data.message}`);
        } catch (error) {
            let err = "An error has occurred";
            if (isAxiosError(error)) {
                err = error.response?.data.message || err;
            }
            toast.error(err);
        } finally {
            setIsRolling(false);
        }
    };

    const fetchCreditTransaction = async () => {
        const id = localStorage.getItem('creditUser');
        if (!id) return; 
        try {
            setChecking(true);
            const res = await axios.get<CreditRefResponse>(`https://money-transfer-1.onrender.com/credit/${id}`);
            setCreditRef(res.data);
            toast.success(`${res.data.message}`);
        } catch (error) {
            let err = "An error has occurred";
            if (isAxiosError(error)) {
                err = error.response?.data.message || err;
            }
            toast.error(err);
        } finally {
            setChecking(false);
        }
    };

    useEffect(() => { fetchDebitTransaction(); }, []);
    useEffect(() => { getUserBankAccountDetails(); }, []);
    useEffect(() => { fetchCreditTransaction(); }, []);

    return (
        <AppContext.Provider
            value={{
                openHandle,
                slide,
                data,
                isLoading,
                balance,
                fundBalance,
                setNewBalance,
                currentBal,
                setBankName,
                setAccountNo,
                bankName,
                accountNo,
                checking,
                searchField,
                loading,
                userBankAcctInfo,
                fund,
                setFund,
                isRolling,
                credit,
                debitTransfer,
                debitRef,
                creditRef,
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};