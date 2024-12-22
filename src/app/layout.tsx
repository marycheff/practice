import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Providers } from "../store/providers"
import "./globals.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Производственная практика",
    description: "Производственная практика",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={geistSans.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
