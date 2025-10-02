'use client';

import Nav from "@/components/auth/Nav";
import { CreditAlertComp } from "@/components/BankAccountData/CreditAlertComp";


export default function UpdateBalancePage() {


    return (
        <div className=" bg-gradient-to-br from-gray-900 via-rose-800 to-black min-h-screen pb-16">
            <Nav />

            <div>
                <CreditAlertComp/>
            </div>
        </div>
    )
}