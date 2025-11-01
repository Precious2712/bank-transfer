'use client';

import Nav from "@/components/auth/Nav";
import { CreditAlertComp } from "@/components/BankAccountData/CreditAlertComp";


export default function UpdateBalancePage() {


    return (
        <div className=" bg-sky-900 min-h-screen pb-16">
            <Nav />

            <div>
                <CreditAlertComp/>
            </div>
        </div>
    )
}