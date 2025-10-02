'use client';

import Nav from "@/components/auth/Nav";
import { DebitAlertComp } from "@/components/BankAccountData/DebitAlertComp";


export default function TransferFundComp() {

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-rose-800 to-black pb-16">
            <Nav />

            <div>
                <DebitAlertComp/>
            </div>
        </div>
    );
}
