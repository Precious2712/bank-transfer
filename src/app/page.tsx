"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { backgroundImages } from "@/data/pictures/backgroundImages";
import Link from "next/link";
import { BankModalTabs } from "@/components/BankAccountData/BankModalTabs";

export default function WelcomePage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1))
        }, 4000)

        return () => clearInterval(interval)
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
            <div className="absolute inset-0">
                {backgroundImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                            }`}
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/65" />

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

                <div className="block lg:hidden">
                    <h1 className="font-lora text-white font-bold text-5xl">
                        Welcome
                    </h1>

                    <h1 className="font-lora text-white font-bold text-4xl leading-relaxed">
                        To
                    </h1>

                    <h1 className="font-mono font-bold text-blue-700 text-3xl">
                        Wallet Transfer
                    </h1>

                    <p className="text-white leading-relaxed mt-2">
                        Your trusted partner in building a secure wallet future. Experience banking that puts your dreams first.
                    </p>
                </div>

                <div className="hidden lg:block text-white">
                    <h1 className="font-lora text-7xl font-bold">
                        Welcome to Wallet
                    </h1>

                    <h1 className="font-mono text-6xl font-bold text-blue-600 text-pretty mt-2">
                        Fund
                    </h1>

                    <p className=" leading-relaxed text-gray-500 text-pretty font-bold font-sans mt-2">
                        Your trusted partner in building a secure wallet future. Experience banking that puts your dreams first.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
                    <Link href='/auth-page'>
                        <Button
                            size="lg"
                            className="bg-linear-to-b from-blue-600 via-purple-500 to-blue-600 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:text-gray-400 cursor-pointer"
                        >
                            Get Started Today
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setOpen(true)}
                        className="border-white/30 text-white hover:bg-white/10 px-8 py-4 font-semibold transition-all duration-300 bg-transparent hover:text-white cursor-pointer"
                    >
                        Learn More
                    </Button>
                </div>

                <div className="flex justify-center mt-12 space-x-2">
                    {backgroundImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex ? "bg-white scale-110" : "bg-white/40 hover:bg-white/60"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <BankModalTabs
                isOpen={open}
                onClose={() => setOpen(false)}
            />

        </section>
    )
}