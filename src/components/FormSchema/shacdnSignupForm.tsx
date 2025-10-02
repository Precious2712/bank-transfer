'use client';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage

} from "../ui/form"
import { Input } from "../ui/input";
import { signupAuth } from "@/data/auths/signupAuth";
import { Signup } from "./FormSchema";
import { Control } from "react-hook-form";
import { Eye, EyeOff, LockKeyhole, Mail, MapPin } from "lucide-react";
import { useState } from "react";

interface signupShadcnProps extends signupAuth {
    control: Control<Signup>;
}

export function ShacdnSignUpForm({
    name,
    type,
    label,
    placeholder,
    required,
    control
}: signupShadcnProps) {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    }

    const renderField = () => {
        switch (type) {
            case "text":
                return (
                    <FormField
                        control={control}
                        name={name as keyof Signup}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    {/* <Input
                                        placeholder={placeholder}
                                        {...field}
                                        required={required}
                                        type="text"
                                    /> */}
                                    <div>
                                        {name === 'email' && (
                                            <div className="relative">
                                                <Input
                                                    placeholder={placeholder}
                                                    {...field}
                                                    required={required}
                                                    type="text"
                                                    className="pl-9"
                                                />
                                                <Mail className="w-5 h-5 absolute top-2 left-2" />
                                            </div>
                                        )}

                                        {name === 'country' && (
                                            <div className="relative">
                                                <Input
                                                    placeholder={placeholder}
                                                    {...field}
                                                    required={required}
                                                    type="text"
                                                    className="pl-9"
                                                />
                                                <MapPin className="w-5 h-5 absolute top-2 left-2" />
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            case "password":
                return (
                    <FormField
                        control={control}
                        name={name as keyof Signup}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder={placeholder}
                                            {...field}
                                            required={required}
                                            type={`${show ? 'text' : 'password'}`}
                                            className="pl-9"
                                        />
                                        <div onClick={handleShow} className="absolute top-2 right-3 cursor-pointer rounded-full ">
                                            {show ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                        </div>
                                        <LockKeyhole className="w-5 h-5 absolute top-2 left-2" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                );

            default:
                return null;
        }
    };
    return (
        <div>
            {renderField()}
        </div>
    )
}