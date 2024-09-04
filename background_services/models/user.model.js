// importing libraries
import mongoose from "mongoose";

// specifying schema for user
const userSchema = mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        },
        address:
        {
            type: String
        },
        phone:
        {
            type: String
        },
        role:
        {
            type: String,
            default: "user"
        },
        status:
        {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

// creating mongoose model and exporting user
const User = mongoose.model("User", userSchema);
export default User;