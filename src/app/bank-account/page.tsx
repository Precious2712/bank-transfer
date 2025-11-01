'use client';

import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";
import './style/bank.css'
import Image from "next/image";
import Nav from "@/components/auth/Nav";
import { AccountModal } from "@/components/auth/AccountModal";
import { useState } from "react";

export default function OpenBankAccountPage() {
    const [bank, setBank] = useState(false);

    const openAccount = () => {
        setBank(!bank);
    }

    return (
        <div className="relative z-20 bg-sky-950">
            <Nav />
            <div className="flex flex-col items-center justify-center min-h-screen  text-[#676767] text-pretty">

                <div className="w-24 h-24 rounded-full roll flex justify-center items-center">
                    <Image
                        src="/twinrally_lg_06-removebg-preview (9).png"
                        width={70}
                        height={0}
                        alt="logo"
                        className="h-auto"
                    />

                </div>

                <div className="text-center mt-6 font-nunito font-bold">
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <p className="font-semibold">Welcome!</p>
                        <PartyPopper className="w-6 h-6 text-yellow-300" />
                    </div>

                    <p className="mb-1">We&apos;re excited to have you on board.</p>
                    <p className="mb-1">
                        Opening your account is the first step toward,
                    </p>
                    <p>
                        smarter, safer, and more convenient banking.
                    </p>
                    {/* <p className=" mb-4">
                        Let&apos;s get started on building your financial journey with us!
                    </p> */}

                    <Button onClick={openAccount} className="bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer mt-2">
                        Open Bank Account
                    </Button>
                </div>
            </div>

            {bank && (
                <AccountModal closeModal={() => setBank(false)} />
            )}

        </div>
    )
}