import React, { useState, useContext } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'
import {useToast} from "@chakra-ui/react"

const Booking = ({ tour, avgRating,color }) => {
   document.title="Booking | Travel World"
   const { price, reviews, title } = tour
   const navigate = useNavigate()
   const toast=useToast()
   const { user } = useContext(AuthContext)
   const [booking, setBooking] = useState({
      userId: user && user._id,
      userEmail: user && user.email,
      tourName: title,
      fullName: '',
      phone: '',
      guestSize: 1,
      bookAt: ''
   })

   const handleChange = e => {
      setBooking(prev => ({ ...prev, [e.target.id]: e.target.value }))
   }

   const serviceFee = 10
   const totalAmount = Number(price) * Number(booking.guestSize) + Number(serviceFee)

   const handleClick = async e => {
      e.preventDefault()
      console.log(booking)

      try {
         if (!user || user === undefined || user === null) {
            return toast({
               title: 'Please Sign in!',
               description: "Login error",
               status: 'error',
               duration: 9000,
               isClosable: true,
            })
         }

         const res = await fetch(`${BASE_URL}/booking`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(booking)
         })

         const result = await res.json()

         if(!res.ok) {
            return toast({
               title: 'Error Occur!',
               description: "Please Enter the full information",
               status: 'warning',
               duration: 9000,
               isClosable: true,
            })
         }
         navigate('/thank-you')
         toast({
            title: 'Booking successfully!',
            description: "Reaching you shortly!",
            status: 'success',
            duration: 5000,
            isClosable: true,
         })
      } catch (error) {
         error(error.message)
      }   
   }
   let name
   if(color==='light'){
      name='#242526'
   }
   else if(color==='dark'){
      name='white'
   }
   return (
      <div className='booking' style={{backgroundColor:`${name}`}}>
         <div className="booking__top d-flex align-items-center justify-content-between">
            <h3 id={color}>${price} <span id={color}>/per person</span></h3>
            <span className="tour__rating d-flex align-items-center" id={color}>
               <i className='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i>
               {avgRating === 0 ? null : avgRating} ({reviews?.length})
            </span>
         </div>

         {/* =============== BOOKING FORM START ============== */}
         <div className="booking__form" >
            <h5 id={color}>Information</h5>
            <Form className={`${color === 'dark' ? 'booking__info-form' : ''}`} onSubmit={handleClick}>
               <FormGroup>
                  <input type="text" placeholder='Full Name' id='fullName' required
                     onChange={handleChange} />
               </FormGroup>
               <FormGroup>
                  <input type="tel" placeholder='Phone' id='phone' required
                     onChange={handleChange} />
               </FormGroup>
               <FormGroup className='d-flex align-items-center gap-3'>
                  <input type="date" placeholder='' id='bookAt' required
                     onChange={handleChange} />
                  <input type="number" placeholder='Guest' id='guestSize' required
                     onChange={handleChange} />
               </FormGroup>
            </Form>
         </div>
         {/* =============== BOOKING FORM END ================ */}


         {/* =============== BOOKING BOTTOM ================ */}
         
         <div className="booking__bottom">
         <h6 id={color}>Bill</h6>
            <ListGroup>
               <ListGroupItem className='border-0 px-0'>
                  <h5 className='d-flex align-items-center gap-1'>${price} <i className='ri-close-line'></i> 1 person</h5>
                  <span> ${price}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0'>
                  <h5>Service charge</h5>
                  <span>${serviceFee}</span>
               </ListGroupItem>
               <ListGroupItem className='border-0 px-0 total'>
                  <h5>Total</h5>
                  <span>${totalAmount}</span>
               </ListGroupItem>
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
         </div>
      </div>
   )
}

export default Booking