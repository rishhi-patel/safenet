import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../../../models"

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"

export async function POST(request) {
  const { email, password } = await request.json()

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await db.User.create({ email, password: hashedPassword })

    // Issue JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    )

    return NextResponse.json({ token, user: newUser }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    )
  }
}
