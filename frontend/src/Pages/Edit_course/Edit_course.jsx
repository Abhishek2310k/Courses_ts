import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Edit_course = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [course,setCourse] = useState({});
    // console.log(id);
    useEffect(()=>{
        const get_course = async () => {
            const resp = await axios.get('http://localhost:8080/course/get_course?id='+id);
            setCourse(resp.data.data);
        }
        get_course();
    },[id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: name === "price" ? Number(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await axios.post('http://localhost:8080/course/update_course',course);
            if (resp.status === 500) {
                alert("update failed");
                // console.log(resp.data.data);
            }
            else {
                alert("update successful");
                navigate("/profile");
            }
        } catch (err) {
            console.log(err);
        }
    }
  return (
    <div className='add_course_form'>
            <form onSubmit={handleSubmit}>
                <input
                    name="course_id"
                    value={course.course_id}
                    onChange={handleChange}
                    placeholder='unique course id'
                />
                <input
                    name="course_name"
                    value={course.course_name}
                    onChange={handleChange}
                    placeholder='course name'
                />
                <input
                    type="number"
                    name="price"
                    value={course.price}
                    onChange={handleChange}
                    placeholder='price'
                />
                <textarea
                    name="description"
                    value={course.description}
                    onChange={handleChange}
                    placeholder='description'
                />
                <button type='submit'>Save</button>
            </form>
        </div>
  )
}

export default Edit_course