import React from 'react'
import './Course_card.scss'
import { FaUsers } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import { Link } from 'react-router-dom';
const Course_card = ({course}) => {
  return (
    <div className='course_card'>
        <h3>{course.course_name}</h3>
        <h4>{course.author}</h4>
        <div className='buy_button'>
            <div className='users_and_price'>
                <FaUsers/>
                <span>{course.no_of_users}</span>
            </div>
            <div className='users_and_price'>
                <ImPriceTag/>
                <span>{course.price}</span>
            </div>
            <div className='buttons'>
                <button className='buy'>Buy</button>
                <Link to={`/detailed_course/${course._id}`}><button className='details'>Details</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Course_card