// importing
import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";

// creating product
const createProduct = asyncHandler(async function(req, res)
{
    const newProduct = new Product(req.body); 
    const product = await newProduct.save();

    if (product)
    {
        res.status(201).json(product);
    }
    else
    {
        res.status(400);
        throw new Error("Product was not created");
    }
});

// updating product
const updateProduct = asyncHandler(async function(req, res)
{
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    if (!updatedProduct)
    {
        res.status(400);
        throw new Error("Product is not updated");
    }
    else
    {
        res.status(200).json(updatedProduct);
    }
});

// deleting product
const deleteProduct = asyncHandler(async function(req, res)
{
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
    {
        res.status(404);
        throw new Error("Product not found");
    }
    else
    {
        res.status(200).json({ message: "Product has been deleted" });
    }
});

// getting a single product
const getProduct = asyncHandler(async function(req, res)
{
    const product = await Product.findById(req.params.id);
    if (!product)
    {
        res.status(404);
        throw new Error("Product not found");
    }
    else
    {
        res.status(200).json(product);
    }
});

// getting all products
const getAllProducts = asyncHandler(async function(req, res)
{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    const qSearch = req.query.search;

    let products;

    if (qNew)
    {
        products = await Product.find().sort({ createdAt: -1 });
    }
    else if (qCategory)
    {
        products = await Product.find({ categories: { $in: [qCategory] } });
    }
    else if (qSearch)
    {
        products = await Product.find({
            $text: {
                $search: qSearch,
                $caseSensitive: false,
                $diacriticSensitive: false,
            },
        });
    }
    else
    {
        products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    }
});

// rating a product
const ratingProduct = asyncHandler(async function(req, res)
{
    const { star, name, comment, postedBy } = req.body;

    if (star)
    {
        const postedRating = await Product.findByIdAndUpdate(
            req.params.productId,
            { $push: { ratings: { star, name, comment, postedBy }}},
            { new: true }
        );
        res.status(201).json("product was rated successfully");
    }
    else
    {
        res.status(400);
        throw new Error("Star rating is required");
    }
});

// exporting
export { ratingProduct, getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };
