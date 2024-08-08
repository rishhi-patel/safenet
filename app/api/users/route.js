import { NextResponse } from "next/server"
import User from "../../../models/user"
import bcrypt from "bcryptjs"

export async function POST(request) {
  const { email, password } = await request.json()
  console.log({ email, password })
  const hashedPassword = bcrypt.hashSync(password, 8)
  const newUser = await User.create({ email, password: hashedPassword })
  return NextResponse.json(newUser)
}
