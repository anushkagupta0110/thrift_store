// importing libraries
import mongoose from "mongoose";

// specifying schema for product
const ProductShcema = mongoose.Schema(
    {
        title:
        {
            type: String,
            require: true
        },
        desc:
        {
            type: String,
            require: true
        },
        whatInBox:
        {
            type: String
        },
        img:
        {
            type: String,
            require: true
        },
        video:
        {
            type: String
        },
        wholesalePrice:
        {
            type: Number
        },
        wholesaleMinimumQuantity:
        {
            type: Number
        },
        categories:
        {
            type: Array
        },
        concern:
        {
            type: Array
        },
        brand:
        {
            type: String
        },
        skintype:
        {
            type: Array
        },
        originalPrice:
        {
            type: Number,
            require: true
        },
        discountedPrice:
        {
            type: Number
        },
        inStock:
        {
            type: Boolean,
            default: true
        },
        rating:
        [
            {
                star: {type: Number},
                name: { type: String },
                comment: { type: String },
                postedBy: { type: String },
            },
        ],
    },
    {
        timestamps: true
    }
)

// creating text index for full-text search
ProductShcema.index({"$**": 'text'});

// exporting product
const Product = mongoose.model("Product", ProductShcema);
export default Product;