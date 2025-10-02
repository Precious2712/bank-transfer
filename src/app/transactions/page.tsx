'use client';

import Nav from "@/components/auth/Nav";
import { CreditHistory } from "@/components/CreditHistory/Credit";
import { useAppContext } from "@/components/useContext/useContext";

export default function CreditPage() {
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-rose-800 to-black pb-20">
            <Nav />

            <CreditHistory/>
        </div>
    )
}