import type { Metadata } from "next"
import { dir } from 'i18next'
import { Geist, Geist_Mono } from "next/font/google";
import {supportedLanguages} from "@/app/i18n/settings"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo app as skill assessment",
};

import { languages } from '../i18n/settings'
import Link from "next/link";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode
  params: Promise< {
    lang: string
  }>
}>) {
  const { lang } =  await params
  return (
    <html lang={lang} dir={dir(lang)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 `}
      >
        {children}
        <footer className="fixed bottom-0 w-full bg-white border-t p-4 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(supportedLanguages).map((lng:string) => (
              <Link
                key={lng}
                href={`/${lng}`}
                className="text-black hover:text-gray-500 "
              >
                {supportedLanguages[lng as keyof typeof supportedLanguages]}
              </Link>
            ))}
          </div>
        </footer>
      </body>
    </html>
  );
}
