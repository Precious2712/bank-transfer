'use client'

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Send, User, Wallet } from "lucide-react";

export default function Nav() {
    const [open, setOpen] = useState(false);
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    const router = useRouter();
    const emali = typeof window !== "undefined" ? localStorage.getItem("email") : null;
    const balance = typeof window !== "undefined" ? localStorage.getItem("balance") : null;
    const userData = typeof window !== "undefined" ? localStorage.getItem("user-data") : null;
    const user = typeof window !== "undefined" ? localStorage.getItem("id") : null;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const country = typeof window !== "undefined" ? localStorage.getItem("country") : null;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function handleNav() {
        setNav(!nav);
    }

    const handleLogout = () => {
        if (user || emali || token || country || balance || userData) {
            localStorage.clear();
            router.push("/");
        }
    };

    return (
        <div>
            {/* mobile */}
            <div className="block lg:hidden">
                <div
                    className={`fixed z-50 top-0 w-full ${scrolled ? "bg-gradient-to-br from-rose-100 via-rose-200 to-rose-30  backdrop-blur-md" : "bg-transparent"
                        } border-b border-white/20 py-3 px-2 flex justify-between items-center transition-colors duration-300`}
                >
                    <h1 className="text-white text-xs font-bit-count font-bold">{emali ? `${emali}` : "Hi Guest"}</h1>
                    <Button onClick={handleNav}>
                        <Menu />
                    </Button>
                </div>


                {nav && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/40  z-40"
                            onClick={handleNav}
                        />
                        <div className="fixed top-0 left-0 z-50 w-[65%] h-full bg-sky-950 shadow-lg py-6 px-3 flex flex-col gap-4 text-xs font-bold font-sans">
                            <Link href="/bank-account">
                                <Button className="w-full flex justify-start p-3 rounded-2xl shadow bg-transparent hover:bg-transparent ring focus:to-blue-50">
                                    <Send className="w-5 h-5 text-blue-500" />
                                    <span className="text-xs font-sans">Home</span>
                                </Button>
                            </Link>
                            <Link href="/transfer">
                                <Button className="w-full flex justify-start p-3 rounded-2xl shadow bg-transparent hover:bg-transparent ring focus:to-blue-50">
                                    <Send className="w-5 h-5 text-blue-500" />
                                    <span className="text-xs font-sans">Send Money</span>
                                </Button>
                            </Link>
                            <Link href="/update-balance">
                                <Button className="w-full flex justify-start gap-2 p-3 rounded-2xl shadow bg-transparent hover:bg-transparent ring focus:to-blue-50">
                                    <Wallet className="w-5 h-5 text-green-500" />
                                    <span className="text-xs font-sans">Update Balance</span>
                                </Button>
                            </Link>
                            <Link href="/dash-board">
                                <Button className="w-full flex justify-start gap-2 p-3 rounded-2xl shadow bg-transparent hover:bg-transparent border ring focus:to-blue-50">
                                    <User className="w-5 h-5 text-purple-500" />
                                    <span className="text-xs font-sans">Profile</span>
                                </Button>
                            </Link>

                            {/* Dropdown */}
                            <div className="relative">
                                <Button
                                    onClick={() => setDropDown(!dropDown)}
                                    className="w-full flex justify-between items-center gap-1.5 cursor-pointer rounded-2xl bg-transparent shadow hover:bg-transparent border ring focus:to-blue-50"
                                >
                                    <span>Transactions</span>
                                    <ChevronDown className="w-4 h-4" />
                                </Button>

                                {dropDown && (
                                    <div className="bg-transparent py-2 px-3 shadow-2xl rounded-[5px] ml-4 mt-2 flex flex-col gap-5 text-white font-bold font-sans">
                                        <Link href='/transactions'>
                                            Credit Transaction
                                        </Link>
                                        <Link href='/transactions/debit-transactions'>
                                            Debit Transaction
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="mt-auto flex flex-col gap-2">
                                <Link href="/AuthPage">
                                    <Button className="w-full cursor-pointer bg-transparent hover:bg-transparent ring focus:to-blue-50 rounded-2xl">Signup</Button>
                                </Link>
                                <Button onClick={handleLogout} className="cursor-pointer bg-transparent hover:bg-transparent ring focus:to-blue-50 rounded-2xl">
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* desktop */}
            <div className="hidden lg:block">
                <div
                    className={`fixed w-full flex justify-between items-center px-4 py-3 transition-colors duration-300 ${scrolled ? "bg-gradient-to-r from-blue-600 to-indigo-600 backdrop-blur-md" : "bg-transparent"
                        }`}
                >
                    <h1 className={`${scrolled ? 'text-white' : 'text-[#8888] font-bold font-bit-count'} text-xs `}>{emali ? `${emali}` : "Hi Guest"}</h1>

                    <ul className={`flex gap-3 font-bold text-xs font-bit-count ${scrolled ? 'text-white' : 'text-[#8888]'}`}>
                        <Link href='/bank-account'>
                            <span>Home</span>
                        </Link>
                        <Link href='/transfer'>
                            <span>Send Money</span>
                        </Link>
                        <Link href='/update-balance'>
                            <span>Update Balance</span>
                        </Link>
                        <Link href='/dash-board'>
                            <span>Profile</span>
                        </Link>
                        <li
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                            className="relative cursor-pointer font-bit-count"
                        >
                            Transactions
                            {open && (
                                <div onMouseEnter={() => setOpen(true)}
                                    onMouseLeave={() => setOpen(false)} className="absolute z-50 top-10 bg-white text-black py-3 px-1.5 rounded-[5px] font-mono font-bold text-xs shadow-2xl w-[150px]">
                                    <div className="absolute -top-12 left-0 w-full h-12 bg-transparent"></div>
                                    <div className="flex flex-col gap-2">
                                        <Link href='/transactions'>
                                            Credit Transaction
                                        </Link>
                                        <Link href='/transactions/debit-transactions'>
                                            Debit Transaction
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </li>
                    </ul>

                    <div className="flex gap-2">
                        <Link href="/AuthPage">
                            <Button className="bg-transparent border h-8 text-[#888888] cursor-pointer hover:bg-blue-950 font-nunito">
                                Signup
                            </Button>
                        </Link>
                        <Button
                            onClick={handleLogout}
                            className="bg-transparent border font-nunito h-8 text-[#888888] cursor-pointer hover:bg-red-800"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}