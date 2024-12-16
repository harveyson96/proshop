import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/usersSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // check whether the url includes 'redirect'(
  // redirect page from clicking checkout on cart page,
  //if signed in redir to shipping, else sign in page)

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // also use userInfo whether in the localstorage to determine the user is logged in or not
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // send login request to API and
      // unwrap here only returns the data(or throw an error) from the resolved promise object
      const res = await login({ email, password }).unwrap();
      // use dispatch to store the userInfo in state
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            value={email}
            placeholder="Enter Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            placeholder="Enter Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="my-2"
          disabled={isLoading}
        >
          Sign in
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row md={3}>
        New Customer?{" "}
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Creat an account
        </Link>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
