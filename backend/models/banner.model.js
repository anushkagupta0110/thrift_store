// importing libraries
import mongoose from "mongoose";

// specifying schema for banner
const BannerSchema = mongoose.Schema(
    {
        title:
        {
            type: String,
            require: true
        },
        subtitle:
        {
            type: String,
            require: true
        },
        img:
        {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)

// exporting banner
const Banner = mongoose.model("Banner", BannerSchema);
export default Banner;