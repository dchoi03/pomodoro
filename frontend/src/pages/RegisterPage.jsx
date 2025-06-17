import { Button, Checkbox, TextInput, Label } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RegisterPage() {

  const BASE_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [agreed, setAgreed] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault() // Stops the page from reloading

    if ((password != confirmPassword) || !agreed) {
      console.log("Password did not match try again")
    } else {
        try {
          const result = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              username,
              password,
              name
            })
          })
          if (!result.ok) {
            const error = await result.json();
            throw new Error(error.detail || 'Something went wrong');
          } else {
            const user = await result.json()
            console.log("Registerd user!", user)
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/home')
            // console.log(user.id)
            // console.log(user.email)
            // console.log(user.created_at)
          }
        } catch (err) {
        console.log(err.message)
      }
    }
  }
  
  return (
    <>
    <div className='m-4'>
      <Link to='/' className='text-white'>Go back</Link>
    </div>
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className='text-white text-4xl font-bold p-4 mb-8'>
          Register a new account
        </h1>
        <div className="w-1/2 flex justify-center mt-[33vh]">
        <form className="flex w-1/2 flex-col gap-4" onSubmit={handleRegister}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email2">Your email</Label>
            </div>
            <TextInput 
              id="email2" 
              type="text" 
              placeholder="email@example.com" 
              required 
              shadow 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">Your name</Label>
            </div>
            <TextInput 
              id="name" 
              type="text"
              placeholder='Enter name' 
              required 
              shadow 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="username">Your username</Label>
            </div>
            <TextInput 
              id="username" 
              type='text' 
              placeholder='Enter username' 
              required 
              shadow 
              value={username}
              onChange={(e) => setUsername(e.target.value)}  
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2">Your password</Label>
            </div>
            <TextInput 
              id="password2" 
              type="password" 
              placeholder='Enter password' 
              required 
              shadow
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password">Confirm password</Label>
            </div>
            <TextInput 
              id="repeat-password" 
              type="password" 
              placeholder='Confirm password' 
              required 
              shadow 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox 
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            />
            <Label htmlFor="agree" className="flex">
              I agree with the&nbsp;
              <Link href="#" className="text-blue-400 hover:underline dark:text-cyan-500">
                terms and conditions
              </Link>
            </Label>
          </div>

          <Button className="bg-blue-700 rounded-full font-bold text-white p-4 mt-5 hover:bg-blue-900" type="submit">Register new account</Button>
        </form>
      </div>
    </div>
    </>
  );
}

export default RegisterPage