'use client';
import { useAppContext } from "../useContext/useContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue

} from "@/components/ui/select";
import { banks } from "@/data/bank/bakName";
import { CheckCircle, Loader2, Shield } from "lucide-react";
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function CreditAlertComp() {
    const { setBankName, bankName, accountNo, setAccountNo, searchField, loading, userBankAcctInfo, currentBal, setFund, fund, credit } = useAppContext();

    const handleSearch = async () => {
        const filter = {
            bankName,
            accountNo
        }
        console.log('filter', filter);
        const result = await searchField(filter);
        if (result) {
            console.log('Search successful:', result);
        } else {
            console.log('Search failed or no results');
        }
    };

    return (
        <div className="w-[90%] m-auto pt-20 lg:w-[55%]">
            <div className="rounded-2xl shadow-xl overflow-hidden">

                <div className=" px-4 py-6 md:px-6 md:py-6">
                    <h1 className="text-xl md:text-2xl font-bold font-bit-count text-white text-center">Credit Bank Transfer</h1>
                    <p className="text-blue-100 text-center mt-1 text-sm md:text-base">Send money securely to any bank account</p>
                </div>

                <div className="px-4 py-6 md:px-6 md:py-6 space-y-4 md:space-y-5">

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Select Bank</label>
                        <Select onValueChange={(value) => setBankName(value)}>
                            <SelectTrigger className="w-full h-11 md:h-12 border-gray-300 rounded-lg text-sm md:text-base">
                                <SelectValue placeholder="Choose a bank..." />
                            </SelectTrigger>
                            <SelectContent className="rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
                                {banks.map((el, i) => (
                                    <SelectItem key={i} value={el} className="text-sm py-2">
                                        <div className="flex items-center">
                                            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                                                <span className="text-xs font-bold text-blue-600">{el.charAt(0)}</span>
                                            </div>
                                            {el}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {bankName && (
                            <div className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg text-sm">
                                <span className="text-blue-700 font-medium">Selected Bank:</span>
                                <span className="text-blue-900 font-semibold truncate ml-2">{bankName}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Account Number</label>
                        <Input
                            type="text"
                            placeholder="Enter account number"
                            value={accountNo}
                            onChange={(e) => setAccountNo(e.target.value)}
                            className="w-full h-11 md:h-12 border-gray-300 rounded-lg text-sm md:text-base"
                        />

                        {accountNo && (
                            <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg text-sm">
                                <span className="text-green-700 font-medium">Account Number:</span>
                                <span className="text-green-900 font-mono font-semibold">{accountNo}</span>
                            </div>
                        )}
                    </div>

                    <Button
                        onClick={handleSearch}
                        disabled={!bankName || !accountNo || loading}
                        className="w-full h-11 md:h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg text-sm md:text-base"
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Searching...
                            </div>
                        ) : (
                            <div className="flex justify-center items-center">
                                Verify Account
                            </div>
                        )}
                    </Button>

                    {userBankAcctInfo && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-3 space-y-3 animate-in fade-in duration-300">
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                                <span className="text-green-800 font-semibold text-sm">Account Verified</span>
                            </div>

                            {userBankAcctInfo.map((el) => (
                                <div key={el._id} className="space-y-2">
                                    <div>
                                        <label className="text-xs text-gray-600">Receiver&apos;s Name</label>
                                        <Input
                                            value={`${el.firstName} ${el.middleName} ${el.lastName}`.trim()}
                                            disabled={true}
                                            className="bg-white border-green-200 text-gray-900 font-semibold mt-1 text-sm h-10"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-xs text-gray-600">Bank</label>
                                            <Input
                                                value={el.bankName}
                                                disabled={true}
                                                className="bg-white border-green-200 text-xs h-10 mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-white">Account No.</label>
                                            <Input
                                                value={el.accountNo}
                                                disabled={true}
                                                className="bg-white border-green-200 font-mono text-xs h-10 mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Transfer Amount</label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                            <Input
                                placeholder="0.00"
                                type="number"
                                value={fund}
                                className="w-full h-11 md:h-12 pl-8 border-gray-300 rounded-lg text-sm md:text-base"
                                onChange={(e) => setFund(Number(e.target.value))}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-white">
                            <span>Available: ₦{currentBal?.toLocaleString()}</span>
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Use Max
                            </button>
                        </div>
                    </div>

                    <Button
                        onClick={credit}
                        disabled={!userBankAcctInfo || userBankAcctInfo.length === 0}
                        className="w-full h-11 md:h-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg text-xs md:text-base"
                    >
                        Credit Transfer
                    </Button>
                </div>

                <div className=" px-4 py-3 border-t border-gray-200">
                    <div className="flex items-center justify-center text-gray-600 text-xs">
                        <Shield className="w-3 h-3 mr-1 text-green-600" />
                        <span>Secured by SSL encryption</span>
                    </div>
                </div>
            </div>
        </div>
    )
}