import React from 'react'
import TourCard from '../../shared/TourCard'
// import tourData from '../../assets/data/tours'
import { Col } from 'reactstrap'
import useFetch from './../../hooks/useFetch'
import { BASE_URL } from './../../utils/config'

const FeaturedTourList = ({color}) => {
   const {data: featuredTours, loading, error} = useFetch(`${BASE_URL}/tours/search/getFeaturedTour`)
   // console.log('\n\n\nthis is the lodading message ',loading);
   // console.log('\n\n\nthis is the error message ',error);
   // console.log('\n\n\nThese are Featured Tours->',featuredTours)
   // console.log(`Sent this url to useFetch->${BASE_URL}/tours/search/getFeaturedTour`)
   // console.log('error-occured in featured tours->');

   return (
      <>
         { loading && <h4>Loading.....</h4> }
         { error && <h4>{error}</h4> }
         {
            !loading && !error &&
            featuredTours?.map(tour => (
               <Col lg='3' md='4' sm='6' className='mb-4' key={tour._id}>
                  <TourCard tour={tour} color={color}/>
               </Col>
            ))
         }
      </>
   )
}

export default FeaturedTourList 