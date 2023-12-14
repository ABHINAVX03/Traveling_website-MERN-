import React from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import './tour-card.css'
import calculateAvgRating from '../utils/avgRating'
import '../styles/mode.css'
const TourCard = ({ tour ,color}) => {

   const { _id, title, city, photo, price, featured, reviews } = tour

   const { totalRating, avgRating } = calculateAvgRating(reviews)
   var name
   if(color==='light'){
      name='#242526'
   }
   else if(color==='dark'){
      name='white'
   }
   return (
      <div className='tour__card'>
         <Card>
            <div className="tour__img" id={color}>
               <img src={photo} alt="tour-img" />
               {featured && <span>Featured</span>}
            </div>

            <CardBody style={{backgroundColor:`${name}`}}>
               <div className="card__top d-flex align-items-center justify-content-between" >
                  <span className="tour__location d-flex align-items-center gap-1" id={color}>
                     <i className='ri-map-pin-line' id={color}></i> {city}
                  </span>
                  <span className="tour__rating d-flex align-items-center gap-1" id={color}>
                     <i className='ri-star-fill' id={color}></i> {avgRating === 0 ? null : avgRating}
                     {totalRating === 0 ? ('Not rated') : (<span>({reviews.length})</span>)}

                  </span>
               </div>

               <h5 className='tour__title' id={color}><Link to={`/tours/${_id}`} id={color}>{title}</Link></h5>

               <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                  <h5 id={color}>${price} <span id={color}> /per person</span></h5>

                  {/* <button className=' booking__btn'>
                     <Link to={`/tours/${_id}`}>Book Now</Link>
                  </button> */}
                  <Link to={`/tours/${_id}`}>
                     <button className='booking__btn'>Book Now</button>
                  </Link>
               </div>
            </CardBody>
         </Card>
      </div>
   )
}

export default TourCard