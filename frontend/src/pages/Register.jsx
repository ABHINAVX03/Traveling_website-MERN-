import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import registerImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'
import {useToast} from '@chakra-ui/react'
const Register = () => {
   document.title="Register | Travel World"
   const [credentials, setCredentials] = useState({
      userName: undefined,
      email: undefined,
      password: undefined
   })
   const {dispatch} = useContext(AuthContext)
   const navigate = useNavigate()
   const toast=useToast()
   const handleChange = e => {
      setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const handleClick = async e => {
      e.preventDefault()

      try {
         const res = await fetch(`${BASE_URL}/auth/register`, {
            method:'post',
            headers: {
               'content-type':'application/json'
            },
            body: JSON.stringify(credentials)
         })
         const result = await res.json()

         if(!res.ok)  toast({
            title: 'Error Occured',
            description: "Login error",
            status: 'error',
            duration: 9000,
            isClosable: true,
         })

         dispatch({type:'REGISTER_SUCCESS'})
         navigate('/login')
         return toast({
            title: 'Registration Successfully!',
            description: "We'av created your Account",
            status: 'success',
            duration: 9000,
            isClosable: true,
         })
      } catch(err) {
         alert(err.message)
      }
   }

   return (
      <div>
      <section>
         <Container>
            <Row>
               <Col lg='8' className='m-auto'>
                  <div className="login__container d-flex justify-content-between">
                     <div className="login__img" style={{backgroundColor:'white'}}>
                        <img src={registerImg} alt="" />
                     </div>

                     <div className="login__form">
                        <div className="user">
                           <img src={userIcon} alt="" />
                        </div>
                        <h2>Register</h2>

                        <Form onSubmit={handleClick}>
                           
                           <FormGroup>
                              <input type="text" placeholder='Username' id='username' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="email" placeholder='Email' id='email' onChange={handleChange} required />
                           </FormGroup>
                           <FormGroup>
                              <input type="password" placeholder='Password' id='password' onChange={handleChange} required />
                           </FormGroup>
                           <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
                        </Form>
                        <p>Already have an account? <Link to='/login'>Login</Link></p>
                     </div>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
      </div>
   )
}

export default Register