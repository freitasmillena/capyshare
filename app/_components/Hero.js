'use client';
import React from 'react'
import { useUser } from "@clerk/nextjs";


function Hero() {
  const { isSignedIn, isLoaded } = useUser()

  return (
    <div>
      <section className="text-white">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-primary bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Upload Your Capy Files.

        <span className="sm:block"> Share with your Capy Friends! </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
        Drag and drop your files and send to your friend's e-mail.
      </p>
      {isLoaded && !isSignedIn && (
      <><p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                Ask Mi to create an account so you can log in!
              </p><div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    className="block w-full rounded-md bg-primary px-12 py-3 text-sm font-medium text-white hover:bg-white hover:text-primary focus:ring-3 focus:outline-hidden sm:w-auto"
                    href="#"
                  >
                    Log in
                  </a>
                </div></>
      )}
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero
