// importing libraries
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// mongoose pre save middleware
userSchema.pre("save", async function(next)
{
    if(!this.isModified("password"))
    {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// comparing password to validate user
userSchema.methods.matchPassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword, this.password);
}

// creating mongoose model and exporting user
const User = mongoose.model("User", userSchema);
export default User;