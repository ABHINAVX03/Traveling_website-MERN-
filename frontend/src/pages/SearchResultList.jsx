import React, { useState } from 'react'
import CommonSection from './../shared/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import TourCard from '../shared/TourCard'
import Newsletter from './../shared/Newsletter'
import '../styles/mode.css'

const SearchResultList = ({color}) => {

  console.log('\n\n\nWELCOME TO  SEARCHRESULTLIST\n\n\n\n');
  const location = useLocation()

  const [data] = useState(location.state)
  console.log(color)
  return (
    <>
      <CommonSection title={'Tour Search Result'} />
      <section>
        <Container>
          <Row>
            {
              data.length === 0 ?
                <h4 className='text-center' id={color}>No Tour Found</h4> :
                data?.map(tour =>
                  <Col lg='3' className='mb-4' key={tour._id}> <TourCard tour={tour} /> </Col>)
            }
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  )
}

export default SearchResultList