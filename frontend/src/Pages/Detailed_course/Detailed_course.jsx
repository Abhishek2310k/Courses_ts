import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Detailed_course.scss'
const Detailed_course = () => {
    const id = useParams().id;
    const [course,setCourse] = useState({});
    useEffect(()=>{
        const getData = async (id) => {
            const resp = await axios.get('http://localhost:8080/course/get_course?id='+id);
            setCourse(resp.data.data);
        }
        getData(id);
    },[id]);
  return (
    <div className='detailed_course'>
        <p>
            {course.description}
        </p>
    </div>
  )
}

export default Detailed_course