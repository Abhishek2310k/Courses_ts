import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Course_card from '../../Components/Course_card/Course_card';
import './Get_courses.scss';
// import { response } from 'express';
const Get_courses = () => {

  const [courses,setCourses] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/course/get_courses');
        setCourses(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    getData();
  }, []);

  return (
    <div className='get_courses'>
      {
        courses.map((course,index)=> {return <Course_card course = {course} key = {index} page = "get_courses"/>;})
      }
    </div>
  )
}

export default Get_courses