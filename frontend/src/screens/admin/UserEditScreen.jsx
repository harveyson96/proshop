import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Form, Button } from "react-bootstrap";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  console.log(userId, name, email, isAdmin);
  const {
    data: user,
    refetch,
    isLoading: loadingUser,
    error: errorUser,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingEdit }] = useUpdateUserMutation();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
  const navigate = useNavigate();
  const saveHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting data to API:", { userId, name, email, isAdmin });
    try {
      await updateUser({
        userId,
        name,
        email,
        isAdmin,
      }).unwrap(); // remember to unwrap to catch error
      refetch();
      toast.success("User saved");
      navigate("/admin/userlist");
    } catch (error) {
      toast.error(error?.error || error?.data?.message);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/userlist">
        Go back
      </Link>
      <FormContainer>
        <h1>User Edit</h1>
        {loadingUser ? (
          <Loader />
        ) : errorUser ? (
          <Message variant="danger">
            {errorUser?.error || errorUser?.message?.data}
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
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
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

export default UserEditScreen;
