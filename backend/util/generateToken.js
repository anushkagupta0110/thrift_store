// importing libraries
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// generating a token
const generateToken = (res, userId) =>
{
    const token = jwt.sign(
        { userId },
        process.env.JWT_SEC,
        {
        expiresIn: "10d"
        }
    );

    // setting the token as a cookie
    res.cookie('jwt', token,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    )
}

// exporting
export default generateToken;