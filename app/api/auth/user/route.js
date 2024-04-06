import { connectToDB } from "@utils/database";
import User from '@models/user';
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req, res) => {
    try {
        const reqbody = await req.json();
        const { username, email, password,profile} = reqbody;
        console.log("Request body is ", reqbody);

        await connectToDB();

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return NextResponse.json({
                status: 200,
                message: "Already have a user with that email"
            });
        }

        const newUser = new User({
            username: username,
            email: email,
            password: password,
            profile: profile
        });

        const savedUser = await newUser.save();
        console.log("User in database created: ", savedUser);

        return NextResponse.json({
            status: 200,
            message: "user created successfully"
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status: 500,
            message: "Error occurred"
        });
    }
};
