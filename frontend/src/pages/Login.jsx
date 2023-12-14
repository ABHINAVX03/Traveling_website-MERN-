import React, { useContext, useState } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import {useToast} from '@chakra-ui/react'
const Login = () => {
  document.title="Login | Travel World"
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  })
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const toast=useToast()
  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault()

    dispatch({ type: 'LOGIN_START' })

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(credentials)
      })

      const result = await res.json()
      if (!res.ok) {
        toast({
          title: result.message,
          description: "Error!",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
      else{
        console.log(result.data)
        dispatch({ type: "LOGIN_SUCCESS", payload: result.data })
        toast({
          title: 'Login Successfully',
          description: "We've logged your account for you.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        navigate('/')
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message })
    }
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
              <div className="login__img" style={{backgroundColor:'white'}}>
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                  </FormGroup>
                  <Button className='btn secondary__btn auth__btn' type='submit'>Login</Button>
                </Form>
                <p>Don't have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login