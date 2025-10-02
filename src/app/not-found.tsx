// app/not-found.tsx
"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
      
      <div className="bg-sky-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <p className="mt-6 text-lg text-gray-300">
        Oops! The page you are looking for doesn&apos;t exist or has been moved..
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="relative inline-block px-6 py-3 font-semibold text-sky-900 bg-sky-400 rounded-lg shadow-lg transition hover:bg-sky-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}