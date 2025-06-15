import React, { useState } from 'react'
import { signIn, signUp } from '../api/auth'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function LoginPage() {

  const [session, setSession] = useState()

  const handleLogin = () => {

  }

  return (
    <div className="flex flex-col">
      <header className="p-6 text-center bg-gray-800 text-white">
        <h1 className="mt-10 font-bold text-5xl">Pomodoro Timer ⏳</h1>
      </header>
      <main class="flex flex-col items-center justify-center">
        <div class="max-w-sm w-full p-6 bg-gray-500 rounded-lg shadow-lg text-lg">
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1">Your email</Label>
              </div>
              <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1">Your password</Label>
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button class="rounded-full mt-2 text-white bg-blue-700 p-2" type="submit">Login</Button>
          </form>
        </div>
        <div class="flex flex-row items-center mt-4">
          <h2 class="text-white mt-3 mr-3">Dont have an account?</h2>
          <Link to="/register" class=" text-white bg-blue-400 rounded-full mt-3 w-m font-medium text-m px-4 py-2">Sign Up</Link>
        </div>
      </main>
    </div>

  );
}

export default LoginPage;