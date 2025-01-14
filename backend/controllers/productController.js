import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc fetch all products
//@route  GET /api/products
//@access private
const getProduct = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } } // case insensitive
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip((page - 1) * pageSize);
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
//@desc create product review
//@route  PUT /api/products/:id/reviews
//@access admin/private
const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { rating, comment } = req.body;

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Review already posted");
    }
    const review = {
      name: req.user.name,
      comment: comment,
      rating: Number(rating),
      user: req.user._id,
    };
    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.numReviews;
    await product.save();
    res.status(201).json({ message: "New review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//@desc fetch top rated products
//@route  GET /api/products/top
//@access private
const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(topProducts);
});
export {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
