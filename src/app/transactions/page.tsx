'use client';

import Nav from "@/components/auth/Nav";
import { CreditHistory } from "@/components/CreditHistory/Credit";
import { useAppContext } from "@/components/useContext/useContext";
import Link from "next/link";

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
                <h1 className="text-9xl font-extrabold tracking-widest">404</h1>

                <div className="bg-sky-500 px-2 text-sm rounded rotate-12 absolute">
                    Page Not Found
                </div>

                <p className="mt-6 text-lg text-gray-300">
                    Oops! Account not found
                </p>

                <div className="mt-8">
                    <Link
                        href="/bank-account"
                        className="relative inline-block px-6 py-3 font-semibold text-sky-900 bg-sky-400 rounded-lg shadow-lg transition hover:bg-sky-300"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-sky-900 to-black pb-20">
            <Nav />

            <CreditHistory />
        </div>
    )
}