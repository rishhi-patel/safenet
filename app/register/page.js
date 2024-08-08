"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/api/register", { email, password })
      router.push("/login")
    } catch (error) {
      alert("Registration failed. Please try again.")
    }
  }

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
