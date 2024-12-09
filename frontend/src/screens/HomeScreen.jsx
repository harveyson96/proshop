import React from "react";
// import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
// import axios from "axios";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   async function fecthProducts() {
  //     const { data } = await axios.get("/api/products");
  //     setProducts(data);
  //   }
  //   fecthProducts();
  // }, []);
  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
       <Message>{error?.message || error.data?.message}</Message>
      ) : (
        <>
          <h1>Latest Product</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
