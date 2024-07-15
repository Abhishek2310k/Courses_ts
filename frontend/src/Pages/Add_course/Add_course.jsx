import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add_course.scss';
import axios from 'axios';

const Add_course = () => {
    const [info, setInfo] = useState({
        course_id: "",
        author: "",
        price: "",
        description: "",
        course_name: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(info);
        try {
            const resp = await axios.post("http://localhost:8080/course/add_course", info);
            if (resp.status === 200) {
                navigate('/get_courses');
            }
        } catch (error) {
            console.error('There was an error adding the course:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: name === "price" ? Number(value) : value
        });
    };

    return (
        <div className='add_course_form'>
            <form onSubmit={handleSubmit}>
                <input
                    name="course_id"
                    value={info.course_id}
                    onChange={handleChange}
                    placeholder='unique course id'
                />
                <input
                    name="author"
                    value={info.author}
                    onChange={handleChange}
                    placeholder='author'
                />
                <input
                    name="course_name"
                    value={info.course_name}
                    onChange={handleChange}
                    placeholder='course name'
                />
                <input
                    type="number"
                    name="price"
                    value={info.price}
                    onChange={handleChange}
                    placeholder='price'
                />
                <textarea
                    name="description"
                    value={info.description}
                    onChange={handleChange}
                    placeholder='description'
                />
                <button type='submit'>Add Course</button>
            </form>
        </div>
    );
};

export default Add_course;
