import React from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../products'
import {Row, Col, Image,Card, ListGroup, Button} from 'react-bootstrap'
import Rating  from '../components/Rating'
const ProductScreen = () => {
    const {id: productId } = useParams()
    const product = products.find((p) =>p._id === productId)
    console.log(product)
  return (
    <>
        
      <Link className='btn btn-light my-3' to='/'>
      Go back
      </Link>
      <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={4}>
        <ListGroup variant='flush'>
            <ListGroup.Item>
                <h3>
                    {product.name}
                </h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
            </ListGroup.Item>
            <ListGroup.Item>
                <h3>
                    Price: ${product.price}
                </h3>
            </ListGroup.Item>
            <ListGroup.Item>
                <p>
                    {product.description}
                </p>
            </ListGroup.Item>
        </ListGroup>
        </Col>

        <Col md={3}>
        <Card>
        <ListGroup variant='flush'>
            <ListGroup.Item>
                <Row>
                    <Col>Price:</Col>
                    <Col><strong>${product.price}</strong></Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
            <Row>
                    <Col>Status:</Col>
                    <Col><strong>{product.countInStock > 0? 'Available':'Out of Stock'}</strong></Col>
                </Row>
            </ListGroup.Item>
            <ListGroup.Item>
            <Button disabled={product.countInStock > 0? false:true}>Add to Cart</Button>
            </ListGroup.Item>
        </ListGroup>
       
        </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
