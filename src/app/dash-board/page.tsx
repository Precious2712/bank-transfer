'use client'

import Nav from "@/components/auth/Nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppContext } from "@/components/useContext/useContext"
import Link from "next/link";

export default function Profile() {
    const { data, isLoading } = useAppContext();

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-lg font-medium animate-pulse">Loading...</p>
            </div>
        )
    }

    if (!data) {
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

    const user = data;

    return (
        <div className="min-h-screen bg-sky-900 pb-16">
            <Nav />

            <div className="pt-20 max-w-5xl mx-auto px-4 space-y-8">
                <h1 className="text-white text-1xl font-bold lg:text-2xl">Id {user?.userAccount.user || "—"}</h1>

                <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2">

                    {/* Personal Info */}
                    <Card className="shadow-lg bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700/50 hover:border-blue-700 border-b-[2px] border-b-white">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-white font-mono">
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <InfoItem label="First Name" value={user?.userAccount.firstName} />
                                <InfoItem label="Last Name" value={user?.userAccount.lastName} />
                                <InfoItem label="Middle Name" value={user?.userAccount.middleName || "—"} />
                                <InfoItem label="Gender" value={user?.userAccount.gender} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bank Info */}
                    <Card className="bg-gray-900/80 backdrop-blur-md rounded-2xl border-gray-700/50 shadow-lg border hover:border-blue-700 border-b-[2px] border-b-white">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-white font-mono">
                                Bank Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <InfoItem label="Bank Name" value={user?.userAccount.bankName} />
                                <InfoItem label="BVN" value={user?.userAccount.bvn} />
                                <InfoItem label="Account Number" value={user?.userAccount.accountNo} />
                                <InfoItem
                                    label="Balance"
                                    value={`₦${(user?.userAccount.balance ?? 0).toLocaleString()}`}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Other Info */}
                <Card className="shadow-lg bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700/50 hover:border-blue-700 border-b-[2px] border-b-white">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-white font-mono">
                            Other Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <InfoItem label="Email" value={user.userAccount.email} />
                            <InfoItem label="Country" value={user?.userAccount.country} />
                            <InfoItem label="Address" value={user?.userAccount.address} />
                        </div>
                    </CardContent>
                </Card>


            </div>
        </div>
    )
}

function InfoItem({ label, value }: { label: string; value: string | number | undefined }) {
    return (
        <div className="flex flex-col">
            <span className="text-blue-600 text-xs font-mono">{label}</span>
            <span className="text-white font-medium">{value || "—"}</span>
        </div>
    )
}