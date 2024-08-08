import { NextResponse } from "next/server"
import User from "../../../models/user"

export async function POST(request) {
  const { email, password } = await request.json()

  try {
    const newUser = await User.create({ email, password })
    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    )
  }
}
