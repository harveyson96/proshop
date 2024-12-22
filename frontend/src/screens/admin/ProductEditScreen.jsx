import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState("");
  const {
    data: product,
    refetch,
    isLoading: loadingProduct,
    error: errorProduct,
  } = useGetProductDetailsQuery(productId);
  const [uploadImage, { isLoading: loadingUpload }] = useUploadImageMutation();
  const [updateProduct, { isLoading: loadingEdit }] =
    useUpdateProductMutation();
  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);
  const saveHandler = async (e) => {
    e.preventDefault();
    console.log(image);
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        category,
        description,
        brand,
        countInStock,
      }).unwrap(); // remember to unwrap to catch error
      refetch();
      toast.success("Product saved");
    } catch (error) {
      toast.error(error?.error || error?.data?.message);
    }
  };
  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      console.log(res);
      toast.success(res.message);
      setImage(res.path);
    } catch (error) {
      toast.error(error?.error || error?.data?.message);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/productlist">
        Go back
      </Link>
      <FormContainer>
        <h1>Product Edit</h1>
        {loadingProduct ? (
          <Loader />
        ) : errorProduct ? (
          <Message variant="danger">
            {errorProduct?.error || errorProduct?.message?.data}
          </Message>
        ) : (
          <Form onSubmit={saveHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={brand}
                type="text"
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={category}
                type="text"
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={price}
                type="text"
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="inventory">
              <Form.Label>Inventory</Form.Label>
              <Form.Control
                value={countInStock}
                type="text"
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                value={image}
                type="text"
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choose file"
                onChange={uploadImageHandler}
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                type="text"
                as="textarea"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3">
              Save
            </Button>
          </Form>
        )}
        {loadingEdit && <Loader />}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
