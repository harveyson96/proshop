import React from "react";
import { Row, Col, Table, Button, Image } from "react-bootstrap";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const ProductListScreen = () => {
  //   const userInfo = useSelector((state) => state.auth);

  const {
    data: prodcuts,
    refetch,
    isLoading: loadingProduct,
    error: errorProduct,
  } = useGetProductsQuery();
  console.log(prodcuts);
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure?")) {
      try {
        const res = await deleteProduct(productId).unwrap();
        refetch();
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.error || error?.data?.message);
      }
    }
  };
  //   console.log(prodcuts.length);
  const createHandler = async () => {
    try {
      await createProduct({});
      refetch();
      toast.success("New Product Created");
    } catch (error) {
      toast.error(error?.error || error?.data?.message);
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products List</h1>
        </Col>
        <Col className="text-end">
          <Button
            type="button"
            variant="primary"
            className="bn-sm m-3"
            onClick={createHandler}
            disabled={loadingCreate}
          >
            Create
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {loadingProduct ? (
        <Loader />
      ) : errorProduct ? (
        <Message variant="danger">
          {errorProduct?.error || errorProduct?.data?.message}
        </Message>
      ) : (
        <Table>
          <thead>
            {/* <th>Image</th> */}
            <th>NAME</th>
            <th>ID</th>
            <th>CATEGORY</th>
            <th>INVENTORY</th>
            <th>PRICE</th>
          </thead>
          <tbody>
            {prodcuts.map((product) => (
              <tr key={product._id}>
                {/* <td>
                  <Image
                    src={`${product.image}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover", // Ensures aspect ratio is maintained and cropped if necessary
                    }}
                  />
                </td> */}
                <td>{product.name}</td>
                <td>{product._id}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>{product.price}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light">
                      <FaEdit />
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen;
