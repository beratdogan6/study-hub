import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='font-poppins'>
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  )
}
