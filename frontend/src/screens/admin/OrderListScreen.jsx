import React from "react";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
const OrderList = () => {
  const { data: ordersData, isLoading, error } = useGetOrdersQuery();
  console.log(ordersData);
  // useEffect( () => {}, []);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.error || error?.data?.message}</Message>
  ) : (
    <>
      <Table striped hover>
        <thead className="my-4">
          <th>Order ID</th>
          <th>Date</th>
          <th>User Name</th>
          <th>Order Total</th>
          <th>Is Paid</th>
          <th>Is Delivered</th>
          <th>Details</th>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt?.slice(0, 10) || "N/A"}</td>
              <td>{order.user.name}</td>
              <td>{order.totalPrice}</td>
              <td>{order.isPaid ? "YES" : "NO"}</td>
              <td>{order.isDelivered ? "YES" : "NO"}</td>
              <td>
                <Link to={`/order/${order._id}`}>
                  <Button variant="primary">Details</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default OrderList;
