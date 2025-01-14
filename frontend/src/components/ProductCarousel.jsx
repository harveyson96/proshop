import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";

import React from "react";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.error || error?.data?.message}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`product/${product._id}`}>
            <Carousel.Caption className="carousel-caption-custom">
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
            <Image src={product.image} alt={product.name} fluid />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
