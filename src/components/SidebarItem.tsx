'use client'

import { JSX} from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';


type SidebarItemProps = {
    path: string;
    icon: JSX.Element;
    title: string;
    subtitle: string;
}

export default function SidebarItem({ path, icon, subtitle, title }:SidebarItemProps) {

    const pathName = usePathname()

  return (
    <Link href={path} className={`w-full h-14 px-2 rounded inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150 ${pathName === path ? 'bg-blue-700' : ''}`}>
                <div>
                    {icon}            
                </div>
                <div className="flex flex-col">
                    <span className="text-lg text-slate-300 font-bold leading-5">{title}</span>
                    <span className="text-sm text-gray-500 hidden md:block">{subtitle}</span>
                </div>
            </Link>
  )
}
