"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/login", { email, password })
      localStorage.setItem("loggedIn", "true")
      localStorage.setItem("userId", data.user.id)
      router.push("/")
    } catch (error) {
      alert("Login failed. Please check your credentials and try again.")
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
