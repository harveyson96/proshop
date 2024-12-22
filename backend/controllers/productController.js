import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc fetch all products
//@route  GET /api/products
//@access private
const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({}); //find all
  res.json(products);
});
//@desc fetch single products
//@route  GET /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
//@desc create new product
//@route  POST /api/products/
//@access admin/private
const createProduct = asyncHandler(async (req, res) => {
  const newProuct = new Product({
    name: "New Product",
    image: "/",
    brand: "new",
    user: req.user._id,
    category: "new",
    price: 0,
    countInStock: 0,
    numReviews: 0,
    rating: 0,
    description: "new Product",
  });

  const createdProduct = await newProuct.save();
  console.log("created product", createdProduct);
  return res.status(200).json(createdProduct);
});
//@desc update new product
//@route  PUT /api/products/:id
//@access admin/private
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, image, description, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
//@desc delete product
//@route  DELETE /api/products/:id
//@access admin/private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product is deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
