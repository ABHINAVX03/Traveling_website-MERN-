import React, { useState, useRef, useEffect, useContext, useId } from 'react'
import '../styles/tour-details.css'
// import tourData from '../assets/data/tours'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import { useParams } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import Newsletter from '../shared/Newsletter'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
import {useToast} from '@chakra-ui/react'
const TourDetails = ({color,mode}) => {
   const { id } = useParams()
   const reviewMsgRef = useRef('')
   const [tourRating, setTourRating] = useState(null)
   const { user } = useContext(AuthContext)
   const toast=useToast()
   // fetch data from database
   const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)

   const { photo, title, desc, price, reviews, city, address, distance, maxGroupSize } = tour

   const { totalRating, avgRating } = calculateAvgRating(reviews)

   const options = { day: 'numeric', month: 'long', year: 'numeric' }
   // additional code to make change color once review clicked
   const [clickedStarIndex, setClickedStarIndex] = useState(null);
   const handleClick = (index) => {
      setClickedStarIndex(index);
      const rating = index + 1; // Convert index to rating (1-based)
      setTourRating(rating);
   };
   var name;
   var background
   if(mode==='dark'){
      name='black'
      background='#242526'
   }
   if(mode==='light'){
      name='white'
      background='white'
   }

   const submitHandler = async e => {
      e.preventDefault()
      const reviewText = reviewMsgRef.current.value

      try {
         if (!user || user === undefined || user === null) {
            toast({
               title: 'Please Sign in!',
               description: "Login error",
               status: 'warning',
               duration: 9000,
               isClosable: true,
            })
         }
         const reviewObj = {
            username: user?.username,
            reviewText,
            rating: tourRating
         }

         const res = await fetch(`${BASE_URL}/review/${id}`, {
            method: 'post',
            headers: {
               'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(reviewObj)
         })
         const result = await res.json()
         if (!res.ok) {
            return toast({
               title: result.message,
               description: "Error Occured!",
               status: 'warning',
               duration: 9000,
               isClosable: true,
            })
         }
         toast({
            title: result.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
         })
      } catch (error) {
         toast({
            title: error.message,
            description: "Error Occured!",
            status: 'error',
            duration: 9000,
            isClosable: true,
         })
      }
   }
   useEffect(() => {
      window.scrollTo(0, 0)
   }, [tour])
   const unique_id=useId();
   
   return (
      <section>
         <Container>
            {loading && <h4 className='text-center pt-5' id={color}>LOADING.........</h4>}
            {error && <h4 className='text-center pt-5' id={color}>{error}</h4>}
            {
               !loading && !error &&
               <Row>
                  <Col lg='8'>
                     <div className="tour__content">
                        <img src={photo} alt="" />

                        <div className="tour__info" style={{backgroundColor:`${background}`}}>
                           <h2 id={color}>{title}</h2>
                           <div className="d-flex align-items-center gap-5" id={color}>
                              <span className="tour__rating d-flex align-items-center gap-1" id={color}>
                                 <i className='ri-star-fill' id={color} style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                                 {avgRating === 0 ? ('Not rated') : (<span id={color}>({reviews?.length})</span>)}
                              </span>

                              <span id={color}><i className='ri-map-pin-fill'></i> {address}</span>
                           </div>

                           <div className="tour__extra-details" >
                              <span id={color}><i className='ri-map-pin-2-line'></i> {city}</span>
                              <span id={color}><i className='ri-money-dollar-circle-line'></i> {price}/ per person</span>
                              <span id={color}><i className='ri-map-pin-time-line'></i> {distance} k/m</span>
                              <span id={color}><i className='ri-group-line'></i> {maxGroupSize} people</span>
                           </div>
                           <h5 id={color}>Description</h5>
                           <p id={color}>{desc}</p>
                        </div>

                        {/* ============ TOUR REVIEWS SECTION START ============ */}
                        <div className="tour__reviews mt-4" style={{backgroundColor:`${background}`}}>
                           <h4 id={color}>Reviews ({reviews?.length} reviews)</h4>
                           {/* from  now on i wil make some change  */}
                           <Form onSubmit={submitHandler}>
                              <div className="d-flex align-items-center gap-3 mb-4 rating__group" id={color}>
                                 {[0, 1, 2, 3, 4].map((index) => (
                                    <span
                                       key={index}
                                       onClick={() => handleClick(index)}
                                       className={index === clickedStarIndex ? 'clicked-star1' : 'clicked-star2'}
                                    >
                                       {index + 1} <i className='ri-star-s-fill'></i>
                                    </span>
                                 ))}
                              </div>

                              <div className="review__input">
                                 <input type="text" ref={reviewMsgRef} placeholder='Share your thoughts' required style={{ backgroundColor: `${background}`}} id={color}/>
                                 <button className='btn primary__btn text-white' type='submit'>
                                    Submit
                                 </button>
                              </div>
                           </Form>

                           <ListGroup className='user__reviews'>
                              {
                                 reviews?.map(review => (
                                    <div className="review__item" key={unique_id}>
                                       <img src={avatar} alt="" />

                                       <div className="w-100">
                                          <div className="d-flex align-items-center justify-content-between">
                                             <div>
                                                <h5 id={color}>{review.username}</h5>
                                                <p id={color}>{new Date(review.createdAt).toLocaleDateString('en-US', options)}</p>
                                             </div>

                                             <span className='d-flex align-items-center' id={color}>
                                                {review.rating}<i className='ri-star-s-fill'></i>
                                             </span>
                                          </div>

                                          <h6 id={color}>{review.reviewText}</h6>
                                       </div>
                                    </div>
                                 ))
                              }
                           </ListGroup>
                        </div>
                        {/* ============ TOUR REVIEWS SECTION END ============== */}
                     </div>
                  </Col>

                  <Col lg='4'>
                     <Booking color={color} tour={tour} avgRating={avgRating} />
                  </Col>
               </Row>
            }
         </Container>
         <Newsletter />
      </section>

   )
}

export default TourDetails