'use client';

import { useForm } from "react-hook-form";
import {
    loginFormSchema,
    type Login
} from "@/components/FormSchema/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { checkin } from "@/data/auths/loginAuth";
import { ShacdnLoginForm } from "../FormSchema/shacdnLoginForm";
import axios from "axios";
import { toast } from "sonner"
import { useState } from "react";
import { useAppContext } from "../useContext/useContext";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginComp() {
    const [loading, setIsLoading] = useState(false);
    const { openHandle } = useAppContext();
    const router = useRouter();

    const form = useForm<Login>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onSubmit(values: Login) {
        try {
            setIsLoading(true);
            const res = await axios.post('https://money-transfer-xbub.onrender.com/auth/login', values);
            if (res) {
                toast.success(`${res.data.email} has log in`);
                router.push('/bank-account');
            }
            localStorage.setItem('user-data', JSON.stringify(res.data));
            const token = res.data.accessToken;
            const id = res.data.id;
            const country = res.data.country;
            const email = res.data.email;
            localStorage.setItem('country', country);
            localStorage.setItem('email', email);
            localStorage.setItem('id', id);
            localStorage.setItem('token', token);
        } catch (error) {
            setIsLoading(false);
            console.log(error, 'error-message');
            let errorResponse = 'Network error'
            if (axios.isAxiosError(error)) {
                errorResponse = error.response?.data.message || errorResponse
                toast.error(`${errorResponse}`);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 ">
            <Link className="fixed top-0" href='/'>
                <ArrowBigLeft className="mt-1 w-5 h-5" />
            </Link>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-[94%] md:w-[40%] lg:w-[30%]">
                    <h1 className="text-2xl md:text-4xl font-bold font-mono text-center text-pretty">Welcome Back!!</h1>
                    <div className="bg-transparent shadow-2xl rounded-[10px]  p-6 border-b-white hover:border-b-blue-600 border-b-[4px]">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {checkin.map((field, index) => (
                                    <div key={index}>
                                        <ShacdnLoginForm {...field} control={form.control} />
                                    </div>
                                ))}
                                <Button className="text-white bg-green-500 hover:bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 hover:text-white cursor-pointer w-full" variant='ghost' type="submit">{loading ? 'loading' : 'Login'}</Button>
                            </form>
                        </Form>
                        <p
                            onClick={openHandle}
                            className="text-center text-pretty hover:underline underline-offset-2 mt-4 cursor-pointer font-sans"
                        >
                            Don&apos;t have an account? Sign up
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

} 