import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen">
    
        <Link className="bg-sky-500 text-white p-5 block text-center text-3xl rounded-full animate-pulse hover:bg-violet-500" href="/todos/todos"><span>Todos App</span></Link>
      
    </main>
  )
}
