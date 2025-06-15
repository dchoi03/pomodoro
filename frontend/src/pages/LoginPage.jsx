import React, { useState } from 'react'
import { signIn } from '../api/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const data = await signIn({ email, password })
      localStorage.setItem('access_token', data.access_token)
      // console.log(data.access_token)
      navigate('/home')
    } catch (err) {
      alert('Login Failed' + err.message)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="p-6 text-center bg-gray-800 text-white">
        <h1 className="mt-10 font-bold text-5xl">Pomodoro Timer ⏳</h1>
      </header>
      <main className="flex flex-col items-center justify-center">
        <div className="max-w-sm w-full p-6 bg-gray-600 rounded-lg shadow-lg text-lg">
          <form className="flex max-w-md flex-col gap-4" onSubmit={handleLogin}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1">Your email</Label>
              </div>
              <TextInput 
              id="email1" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@flowbite.com" 
              required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1">Your password</Label>
              </div>
              <TextInput 
                id="password1" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button className="rounded-full mt-2 text-white bg-blue-700 p-2" type="submit">Login</Button>
          </form>
        </div>
        <div className="flex flex-row items-center mt-4">
          <h2 className="text-white mt-3 mr-3">Dont have an account?</h2>
          <Link to="/register" className=" text-white bg-blue-400 rounded-full mt-3 w-m font-medium text-m px-4 py-2">Sign Up</Link>
        </div>
      </main>
    </div>

  );
}

export default LoginPage;