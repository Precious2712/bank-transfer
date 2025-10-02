'use client';
import { useAppContext } from "@/components/useContext/useContext";
import styles from "./NoScroll/hide-scroll.module.scss";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

export function DebitHistory() {
    const { debitRef, isRolling } = useAppContext();

    if (isRolling) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-lg font-medium animate-pulse">Loading...</p>
            </div>
        )
    }

    if (!debitRef) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col justify-center items-center">
                <h1 className="text-7xl font-extrabold tracking-widest">404</h1>
                <p className="mt-6 rounded-2xl bg-red-600 px-6 py-3 text-white font-medium shadow-lg hover:bg-red-700 transition">
                    Debit transaction history not found
                </p>
            </div>
        )
    }

    async function handleDeleteDebitRef(id: string) {
        console.log(id);
        
        const cleanId = id.trim(); 
        if (!/^[0-9a-fA-F]{24}$/.test(cleanId)) {
            toast.error("Invalid ObjectId format");
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/debit/${cleanId}`);
            toast.success("Debit reference deleted");
        } catch (error) {
            let err = "An error has occurred";
            if (isAxiosError(error)) {
                err = error.response?.data.message || err;
            }
            toast.error(err);
        }
    }


    return (
        <div className="pt-20 px-4 lg:px-4">

            <h1 className="text-1xl font-bold text-white font-bit-count mb-6 lg:text-2xl">Debit Transactions History</h1>

            <div className={styles.containerItem}>
                <table className={styles.tableWrapper}>
                    <thead>
                        <tr className="text-xs font-bold font-sans">
                            <th className=" min-w-[80px] text-left p-2">Reciever Email</th>
                            {/* <th className=" min-w-[120px] text-left p-2">Sender ID</th> */}
                            <th className=" min-w-[150px] text-left p-2">Receiver Full Name</th>
                            <th className=" min-w-[180px] text-left p-2">Bank Name</th>
                            <th className=" min-w-[180px] text-left p-2">Account No</th>
                            <th className=" min-w-[80px] text-left p-2">Country</th>
                            <th className=" min-w-[85px] text-left p-2">Amount</th>
                            <th className=" min-w-[190px] text-left p-2">Receipt Number</th>
                            <th className=" min-w-[90px] text-left p-2">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {debitRef?.debitRef?.map((txn) => (
                            <tr key={txn._id} className="border-b border-gray-200 font-sans font-bold text-xs">
                                <td className="p-2 font-medium">{txn.recieverEmail}</td>
                                {/* <td className="p-2 text-sm text-gray-500 font-mono">{txn.senderId}</td> */}
                                <td className="p-2">
                                    {txn.recieverFirstName} {txn.recieverLastName}
                                </td>
                                <td className="p-2">{txn.recieverBankName}</td>
                                <td className="p-2 font-mono">{txn.recieverAccountNo}</td>
                                <td className="p-2">{txn.country}</td>
                                <td className="p-2 font-semibold text-red-600">
                                    ₦{txn.Amount.toLocaleString()}
                                </td>
                                <td className="p-2 text-sm font-mono text-blue-600">
                                    {txn.debitReceipt}
                                </td>
                                <td className="p-2">
                                    <button onClick={() => handleDeleteDebitRef(txn._id)} className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </div>
    )
}