'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BankModalTabsProps {
    isOpen: boolean
    onClose: () => void
}

export function BankModalTabs({ isOpen, onClose }: BankModalTabsProps) {

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-lg w-[90%] relative lg:w-[60%]">

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>

                <Tabs defaultValue="welcome" className="p-6">

                    <TabsList className="w-full flex justify-between mb-4">
                        <TabsTrigger value="welcome">Welcome</TabsTrigger>
                        <TabsTrigger value="credit">Credit</TabsTrigger>
                        <TabsTrigger value="debit">Debit</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>


                    <TabsContent value="welcome" className="mt-2">
                        <h2 className="text-xl font-bold mb-2">Welcome to BankX 🎉</h2>
                        <p className="text-gray-600 text-sm">
                            Explore our features: Send and receive money, keep track of your
                            credit & debit history, and manage your account all in one place.
                        </p>
                    </TabsContent>


                    <TabsContent value="credit" className="mt-2">
                        <h2 className="font-bold mb-2">💰 Credit Transfer</h2>
                        <p className="text-gray-600 text-sm mb-3">
                            Transfer money securely to other accounts.
                        </p>
                        <Link href='/update-balance'>
                            <Button className="w-full bg-green-600 text-white">
                                Make Credit Transfer
                            </Button>
                        </Link>
                    </TabsContent>

                    <TabsContent value="debit" className="mt-2">
                        <h2 className="font-bold mb-2">💳 Debit Transfer</h2>
                        <p className="text-gray-600 text-sm mb-3">
                            Send money quickly to your friends and family.
                        </p>
                        <Link href='/transfer'>
                            <Button className="w-full bg-blue-600 text-white">
                                Make Debit Transfer
                            </Button>
                        </Link>
                    </TabsContent>

                    <TabsContent value="history" className="mt-2 space-y-3">
                        <h2 className="font-bold mb-2">📜 Transaction History</h2>
                        <p className="text-gray-600 text-sm">
                            Search for your account to view past credit and debit transactions.
                        </p>

                        <p className="text-gray-600 text-sm">
                            Incase you do not see your credit history, please do not be afraid
                        </p>

                        <p className="text-gray-600 text-sm">
                            Just check for your bank name and account no
                            and your credit/debit history will be resolved
                            Thank you
                        </p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
