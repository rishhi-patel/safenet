import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "../../../models"

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"

export async function POST(request) {
  const { email, password } = await request.json()

  try {
    const user = await db.User.findOne({ where: { email } })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }
    //check and verify pasword hash
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Issue JWT for sucess auth
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    })

    return NextResponse.json({ token, user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to log in" }, { status: 500 })
  }
}
