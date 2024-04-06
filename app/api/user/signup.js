// import { connectToDB } from "@utils/database";
// import { User } from '@models/user';

// export const POST = async (request) => {
//     try {
//         const reqbody = await request.json();
//         const { username, email, password } = reqbody;
//         console.log("Request body is ", reqbody);

//         await connectToDB();

//         const existingUser = await User.findOne({ email: email });

//         if (existingUser) {
//             return {
//                 status: 400,
//                 body: { error: "User already exists" }
//             };
//         }

//         const newUser = new User({
//             username: username,
//             email: email,
//             password: password
//         });

//         const savedUser = await newUser.save();
//         console.log("User in database created: ", savedUser);

//         return {
//             status: 200,
//             body: { message: "User created successfully" }
//         };
//     } catch (error) {
//         console.log(error);
//         return {
//             status: 500,
//             body: { error: "Internal server error" }
//         };
//     }
// };
