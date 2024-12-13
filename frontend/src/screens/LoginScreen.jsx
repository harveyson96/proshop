import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Button, Form, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const LoginScreen = () => {
    const {email, setEmail} = useState('')
    const {password, setPassword} = useState('')
    const submitHandler = (e)=>{
        e.preventDefault()
        console.log('form submitted')
    }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
        value={email}
        placeholder='Enter Email'
        type='email'
        onChange={(e)=>setEmail(e.target.value)}>

        </Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className='my-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
        value={password}
        placeholder='Enter Password'
        type='password'
        onChange={(e)=>setPassword(e.target.value)}>

        </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-2'>Sign in</Button>
      </Form>
      <Row md={3}>
        New Customer? <Link to='/register'>Creat an account</Link>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
