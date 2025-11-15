'use client';

import Nav from "@/components/auth/Nav";
import { CreditHistory } from "@/components/CreditHistory/Credit";
import { useAppContext } from "@/components/useContext/useContext";

export default function CreditPage() {
    const { isRolling } = useAppContext();

    if (isRolling) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-lg font-medium animate-pulse">Loading...</p>
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