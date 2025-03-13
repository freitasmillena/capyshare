'use client';
import Image from 'next/image'
import React from 'react'
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { useUser } from "@clerk/nextjs";

function Header() {
  const { isLoaded, user } = useUser()
  
  return (
    <div>
      <header className="bg-white">
  <div className="mx-auto flex h-18 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
    <Image src='/logo.png' width={150} height={100}/>
    

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="block">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </a>
          </li>

          <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/upload"> Upload </a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex sm:gap-4 sm:flex-row">
          {/* <a
            className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary"
            href="#"
          >
            Log in
          </a> */}
          <SignedOut>
              <SignInButton>
              <a className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary" href="#">
                Log in
              </a>
              </SignInButton>
              <SignUpButton>
              <a className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-secondary" href="#">
                Sign up
              </a>
              </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton /> {(isLoaded && <span>{user?.fullName}</span>)}
          </SignedIn>
        </div>

      </div>
    </div>
  </div>
</header>
    </div>
  )
}

export default Header
