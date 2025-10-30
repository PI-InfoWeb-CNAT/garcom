'use client'
import * as React from "react"
import Image from "next/image"

export function Header() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex items-center justify-center fixed top-0  bg-[#F65C5C] w-full h-26 p-4 md:p-15 pt-10 pb-10 z-100">
      <header className="flex items-center justify-between w-full rounded-full h-14 pl-3 pr-3 md:pl-20 md:pr-20 box-border bg-white text-[#E55F4B]">

        <h1 className="flex items-center align-center pt-px">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
        </h1>   
      </header>
    </div>
  )
}