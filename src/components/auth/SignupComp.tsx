'use client';

import { useForm } from "react-hook-form";
import {
    signupFormSchema,
    type Signup
} from "@/components/FormSchema/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { register } from "@/data/auths/signupAuth";
import { ShacdnSignUpForm } from "../FormSchema/shacdnSignupForm";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useAppContext } from "../useContext/useContext";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

export function SignupComp() {
    const [loading, setIsLoading] = useState(false);
    const { openHandle } = useAppContext();

    const form = useForm<Signup>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: '',
            country: '',
            password: ''
        }
    })

    async function onSubmit(values: Signup) {
        try {
            setIsLoading(true);
            const res = await axios.post('http://localhost:3000/auth/create', values);
            if (res) {
                toast.success('You can proceed to log in');
            }

            if (res.data.message === 'Email already exists') {
                toast('Email already exists');
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error, 'error-message');
            let errorResponse = 'error'
            if (axios.isAxiosError(error)) {
                errorResponse = error.response?.data.message || errorResponse
            }
            toast.success(`${errorResponse}`);
        } finally {
            setIsLoading(false);
        }
        console.log(values)
    }

    return (
        <div className="bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 ">
            <Link className="fixed top-0" href='/'>
                <ArrowBigLeft className="mt-1 w-5 h-5" />
            </Link>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-[94%] md:w-[40%] lg:w-[30%] bg-transparent">
                    <h1 className="text-2xl md:text-4xl font-bold font-mono text-center text-pretty">
                        Create Account
                    </h1>

                    <div className="bg-transparent shadow-2xl rounded-[10px]  p-6 border-b-white hover:border-b-blue-600 border-b-[4px]">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                {register.map((field, index) => (
                                    <div key={index}>
                                        <ShacdnSignUpForm {...field} control={form.control} />
                                    </div>
                                ))}
                                <Button className="text-white bg-green-500 hover:bg-gradient-to-br from-pink-600 via-purple-700 to-blue-500 hover:text-white cursor-pointer w-full" variant='ghost' type="submit">{loading ? 'loading' : 'Submit'}</Button>
                            </form>
                        </Form>
                        <p
                            onClick={openHandle}
                            className="text-center text-pretty hover:underline underline-offset-2 mt-4 cursor-pointer font-sans"
                        >
                            Already have an account Sign in
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

} 