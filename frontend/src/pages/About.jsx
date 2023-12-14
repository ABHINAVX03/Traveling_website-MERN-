import React from 'react'
import '../styles/home.css'
import { Container, Row, Col} from 'reactstrap'
import experienceImg from '../assets/images/experience.png'
import '../styles/mode.css'
import Subtitle from './../shared/Subtitle'
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery'
import Testimonials from '../components/Testimonial/Testimonials'
import NewsLetter from '../shared/Newsletter'

const About = ({color}) => {
    document.title="About | Travel World"
    return <>
       {/* ========== EXPERIENCE SECTION START ============ */}
       <section>
          <Container>
             <Row>
                <Col lg='6'>
                   <div className="experience__content">
                      <Subtitle subtitle={'Experience'} />
                      <h2 id={color}>With our all experience <br /> we will serve you</h2>
                      <p id={color}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                         <br /> Quas aliquam, hic tempora inventore suscipit unde. </p>
                   </div>
 
                   <div className="counter__wrapper d-flex align-items-center gap-5">
                      <div className="counter__box">
                         <span>12k+</span>
                         <h6 id={color}>Successful trip</h6>
                      </div>
                      <div className="counter__box">
                         <span>2k+</span>
                         <h6 id={color}>Regular clients</h6>
                      </div>
                      <div className="counter__box">
                         <span>15</span>
                         <h6 id={color}>Year experience</h6>
                      </div>
                   </div>
                </Col>
                <Col lg='6'>
                   <div className="experience__img">
                      <img src={experienceImg} alt="" />
                   </div>
                </Col>
             </Row>
          </Container>
       </section>
       {/* ========== EXPERIENCE SECTION END ============== */}
 
       {/* ========== GALLERY SECTION START ============== */}
       <section>
          <Container>
             <Row>
                <Col lg='12'>
                   <Subtitle subtitle={'Gallery'} />
                   <h2 className="gallery__title" id={color}>Visit our customers tour gallery</h2>
                </Col>
                <Col lg='12'>
                   <MasonryImagesGallery />
                </Col>
             </Row>
          </Container>
       </section>
       {/* ========== GALLERY SECTION END ================ */}
 
       {/* ========== TESTIMONIAL SECTION START ================ */}
       <section>
          <Container>
             <Row>
                <Col lg='12'>
                   <Subtitle subtitle={'Fans Love'} />
                   <h2 className="testimonial__title" id={color}>What our fans say about us</h2>
                </Col>
                <Col lg='12'>
                   <Testimonials color={color}/>
                </Col>
             </Row>
          </Container>
       </section>
       {/* ========== TESTIMONIAL SECTION END ================== */}
       <NewsLetter />
    </>
}

export default About