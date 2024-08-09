"use client"
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()

  const validatePassword = (password) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter."
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter."
    }
    if (!hasNumbers) {
      return "Password must contain at least one number."
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character."
    }
    return ""
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const error = validatePassword(password)
    if (error) {
      setPasswordError(error)
      return
    }
    try {
      const { data } = await axios.post("/api/register", { email, password })
      localStorage.setItem("token", data.token)
      router.push("/")
    } catch (error) {
      alert("Registration failed. Please try again.")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 px-4 py-6">
        <div className="max-w-md mx-auto space-y-4">
          <Card className="bg-card p-6">
            <div className="space-y-4">
              <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome!</h1>
                <p className="text-muted-foreground">
                  Enter details to continue.
                </p>
              </div>
              <form className="space-y-2" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="mt-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="text-xs text-muted-foreground hover:underline"
                      prefetch={false}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="mt-1"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError(validatePassword(e.target.value))
                    }}
                    required
                  />
                  {passwordError && (
                    <p className="text-xs text-red-600 mt-1">{passwordError}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!!passwordError}
                >
                  Sign up
                </Button>
              </form>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline" prefetch={false}>
                  Login
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
