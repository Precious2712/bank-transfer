"use client";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankSchema, type UserAccountData } from "../FormSchema/FormSchema";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { bankAccountData } from "@/data/bank/account";
import { BankData } from "../BankAccountData/BankData";
import { useState } from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AccountModalProps {
  closeModal: () => void
}

export function AccountModal({ closeModal }: AccountModalProps) {
  const [index, setIndex] = useState(0)
  const [accountGenerated, setAccountGenerated] = useState(false);
  const [bvnGenerated, setBvnGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const router = useRouter();

  const form = useForm<UserAccountData>({
    resolver: zodResolver(BankSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      gender: "male",
      address: "",
      nationality: "",
      bankName: "Guaranty Trust Bank (GTBank)",
      accountNo: "",
      bvn: 0,
    },
  })

  const handleBack = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleFront = () => {
    setIndex((prev) => (prev < others.length ? prev + 1 : prev))
  }

  const filterItems = bankAccountData.filter((el) => el.name === "bankName" || el.name === "accountNo")

  const others = bankAccountData.filter((el) => el.name !== "bankName" && el.name !== "accountNo" && el.name !== "bvn")

  async function onSubmit(value: UserAccountData) {
    try {
      setIsLoading(true)
      const _id = localStorage.getItem("id");
      const email = localStorage.getItem("email");
      const country = localStorage.getItem("country");

      console.log("log Form values before submission:", value)

      if (!value.bankName || !value.gender) {
        console.error(" Missing required fields:", {
          bankName: value.bankName,
          gender: value.gender,
        });
        alert("Please complete all required fields before submitting.")
        setIsLoading(false)
        return
      }

      const obj = {
        user: _id,
        email: email,
        country: country,
        ...value,
      }

      console.log("Data being sent to backend:", obj)
      const res = await axios.post("https://bank-transfer-cyan.vercel.app/bank-account/create", obj)
      console.log("response", res);
      if (res) {
        toast(`${res.data.userBankAcctData.firstName} account open successfully`);
        setCreated(true);
        router.push('/BankAccount/profile');
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error submitting bank account:", error);
      let errorMsg = "error has occur"
      if (isAxiosError(error)) {
        errorMsg = error.response?.data.message || errorMsg
        toast.success(`${errorMsg}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const generateAccountNumber = () => {
    if (accountGenerated) return

    const bank = form.getValues("bankName");
    if (!bank) {
      alert("Please select a bank first");
      return
    }

    let prefix = ""

    switch (bank) {
      case "United Bank for Africa (UBA)":
        prefix = "20"
        break
      case "First Bank of Nigeria":
        prefix = "10"
        break
      case "Guaranty Trust Bank (GTBank)":
        prefix = "00"
        break
      case "Access Bank":
        prefix = "04"
        break
      case "Zenith Bank":
        prefix = "06"
        break
      case "Ecobank Nigeria":
        prefix = "03"
        break
      case "Fidelity Bank":
        prefix = "30"
        break
      case "Jaiz Bank":
        prefix = "09"
        break
      case "Keystone Bank":
        prefix = "50"
        break
      case "Union Bank of Nigeria":
        prefix = "01"
        break
      case "Sterling Bank":
        prefix = "40"
        break
      case "Polaris Bank":
        prefix = "05"
        break
      case "Stanbic IBTC Bank":
        prefix = "60"
        break
      case "Wema Bank":
        prefix = "08"
        break
      case "Unity Bank":
        prefix = "80"
        break
      default:
        prefix = "99"
        break
    }

    const remainingLength = 11 - prefix.length
    let randomDigits = ""
    for (let i = 0; i < remainingLength; i++) {
      randomDigits += Math.floor(Math.random() * 10);
    }

    const accountNo = prefix + randomDigits
    form.setValue("accountNo", accountNo)
    setAccountGenerated(true)
  }

  const generateBVN = () => {
    if (bvnGenerated) return

    const prefix = "22"
    let randomDigits = ""

    for (let i = 0; i < 9; i++) {
      randomDigits += Math.floor(Math.random() * 10)
    }

    const bvn = Number(prefix + randomDigits)
    form.setValue("bvn", bvn)
    setBvnGenerated(true)
  }

  return (
    <div className="fixed inset-0 bg-black opacity-90 flex justify-center items-center z-50">
      <div className="relative rounded-lg shadow-lg border p-4 w-[90%] lg:w-[50%] bg-transparent text-white">
        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>

        <h1 className="text-2xl font-bold text-red-600">Bank Account Setup</h1>

        <div className="w-full p-4 overflow-y-auto">
          <div className="h-full p-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {index === 0 && (
                  <div className="space-y-4">
                    {filterItems.map((item) => (
                      <BankData
                        key={item.name}
                        name={item.name}
                        label={item.label}
                        placeholder={item.placeholder}
                        type={item.type}
                        required={item.required}
                        control={form.control}
                      />
                    ))}

                    <Button
                      type="button"
                      className="h-7 bg-blue-600 text-white"
                      onClick={generateAccountNumber}
                      disabled={accountGenerated}
                    >
                      {accountGenerated ? "Account No Generated" : "Generate Account No"}
                    </Button>
                  </div>
                )}

                {index > 0 && index <= others.length && (
                  <BankData
                    name={others[index - 1].name}
                    label={others[index - 1].label}
                    placeholder={others[index - 1].placeholder}
                    type={others[index - 1].type}
                    required={others[index - 1].required}
                    control={form.control}
                  />
                )}

                {index === others.length && (
                  <div className="space-y-4">
                    <BankData
                      name="bvn"
                      label="BVN"
                      placeholder="Generated BVN will appear here"
                      type="number"
                      required
                      control={form.control}
                    />
                    <Button
                      type="button"
                      className="h-7 bg-purple-600 text-white"
                      onClick={generateBVN}
                      disabled={bvnGenerated}
                    >
                      {bvnGenerated ? "BVN Generated" : "Generate BVN"}
                    </Button>

                    <Button
                      className="h-7 bg-green-600 text-white w-full"
                      type="submit"
                      disabled={isLoading || created || !form.getValues("bankName") || !form.getValues("gender")}
                    >
                      {isLoading ? "loading" : "submit"}
                    </Button>
                  </div>
                )}
              </form>
            </Form>

            <div className="flex justify-between items-center mt-5">
              <Button onClick={handleBack} disabled={index === 0} className="h-6 text-xs">
                Prev
              </Button>
              <Button onClick={handleFront} disabled={index === others.length} className="h-6 text-xs">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}