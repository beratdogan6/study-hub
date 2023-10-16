import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 12);

        await connectMongoDB();
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 })
    }
    catch (err) {
        return NextResponse.json({ message: `An error occured while creatin user; ${err.message}` }, { status: 500 })
    }
}