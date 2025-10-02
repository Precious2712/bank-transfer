'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from "../useContext/useContext";

export function LandPage() {
    const { balance, fundBalance, setNewBalance } = useAppContext();

    return(
        <div>
             <div className="pt-20 w-full h-screen flex justify-center items-center ">
                <Card className="w-[90%] shadow-lg bg-gray-900/80 backdrop-blur-md rounded-2xl border border-gray-700/50 hover:border-blue-700 border-b-[2px] border-b-white">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-700 font-mono">Update Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <p className="text-gray-400 text-sm font-mono">Current Balance</p>
                            <p className="text-2xl font-bold text-green-400">
                                ₦{balance ? Number(balance).toLocaleString() : "0"}
                            </p>
                        </div>

                        <form className="space-y-4">
                            <div>
                                <label htmlFor="amount" className="block text-sm text-gray-300 mb-1">Amount</label>
                                <Input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    placeholder="Enter amount"
                                    value={balance}
                                    onChange={(e) => setNewBalance(Number(e.target.value))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <Button
                                type="button"
                                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 cursor-pointer"
                                onClick={fundBalance}
                            >
                                Update Balance
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}