'use client';

import { LoginComp } from "@/components/auth/LoginComp";
import { SignupComp } from "@/components/auth/SignupComp";
import { useAppContext } from "@/components/useContext/useContext";

export default function AuthPage() {
    const { slide } = useAppContext();

    return (
        <div>
            {slide ? <LoginComp /> : <SignupComp />}
        </div>
    )
}