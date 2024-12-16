import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import { Button, Form } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [zipcode, setZipcode] = useState(shippingAddress?.zipcode || "");
  const [state, setState] = useState(shippingAddress?.state || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        zipcode,
        state,
        country,
      })
    );
    navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            value={address}
            placeholder="address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" className="my-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            value={city}
            placeholder="City"
            type="text"
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="state" className="my-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            required
            value={state}
            placeholder="State"
            type="text"
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="my-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            value={country}
            placeholder="Country"
            type="text"
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="zipcode" className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            value={zipcode}
            placeholder="zipcode"
            type="text"
            onChange={(e) => setZipcode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
