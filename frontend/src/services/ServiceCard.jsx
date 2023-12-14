import React from 'react'
import './service-card.css'
import '../styles/mode.css'
const ServiceCard = ({ item,color}) => {
   const { imgUrl, title, desc } = item

   return (
      <div className='service__item'>
         <div className="service__img">
            <img src={imgUrl} alt="" />
         </div>
         <h6 id={color}>{title}</h6>
         <p id={color}>{desc}</p>
      </div>
   )
}

export default ServiceCard