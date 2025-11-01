'use client';

import Nav from "@/components/auth/Nav";
import { DebitAlertComp } from "@/components/BankAccountData/DebitAlertComp";


export default function TransferFundComp() {

    return (
        <div className="min-h-screen bg-sky-900 pb-16">
            <Nav />

            <div>
                <DebitAlertComp/>
            </div>
        </div>
    );
}
