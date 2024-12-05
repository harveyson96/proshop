import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import {Row, Col, Image,Card, ListGroup, Button} from 'react-bootstrap'
import Rating  from '../components/Rating'
import axios from 'axios'
const ProductScreen = () => {
    const [product, setProduct] = useState({})
    const {id: productId } = useParams()

    useEffect(()=>{
        async function fetchProduct() {
            const {data} = await axios.get(`/api/products/${productId}`)
            setProduct(data)
        }
        fetchProduct()
    }, [productId])
    
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
