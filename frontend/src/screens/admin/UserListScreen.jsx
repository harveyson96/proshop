import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const UserListScreen = () => {
  //   const userInfo = useSelector((state) => state.auth);

  const {
    data: users,
    refetch,
    isLoading: loadingUser,
    error: errorUser,
  } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteUser(id).unwrap();
        refetch();
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.error || error?.data?.message);
      }
    }
  };
  //   console.log(prodcuts.length);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users List</h1>
        </Col>
        <Col className="text-end">
          {/* <Button
            type="button"
            variant="primary"
            className="bn-sm m-3"
            onClick={createHandler}
            disabled={loadingCreate}
          >
            Create
          </Button> */}
        </Col>
      </Row>
      {/* {loadingDelete && <Loader />} */}
      {loadingUser ? (
        <Loader />
      ) : errorUser ? (
        <Message variant="danger">
          {errorUser?.error || errorUser?.data?.message}
        </Message>
      ) : (
        <Table>
          <thead>
            {/* <th>Image</th> */}
            <th>NAME</th>
            <th>ID</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light">
                      <FaEdit />
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
