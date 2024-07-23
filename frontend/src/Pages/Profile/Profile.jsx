import React,{useEffect,useState,useContext} from 'react'
import noteContext from '../../context/noteContext'
import axios from 'axios'
import './Profile.scss'
import Course_card from '../../Components/Course_card/Course_card'
import {Link} from 'react-router-dom';
const Profile = () => {
  const user = useContext(noteContext).user_login;

  const [my_courses,setMyCourses] = useState([]);
  const getData = async () => {
    try {
      if (user !== null) {
        const response = await axios.get('http://localhost:8080/course/get_courses?author='+user.userName);
        setMyCourses(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    getData();
  }, [user]);

  const handleClick = async (e,id) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:8080/course/delete_course',{id:id});
      console.log(resp.data);
      getData();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='profile'>
      <div className='add_course_button'>
        <a href="/add_course">Add Course</a>
      </div>
      <div className='my_courses'></div>
      <div className='courses_bought'>
        {
          my_courses.map((course,index) => {
            return (
              <div className='editable_block' key = {index}>
                <Course_card course={course} page="profile"/>
                <Link to={`/edit_course/${course._id}`}><button className='edit_button'>Edit</button></Link>
                <button 
                type='click' 
                className='edit_button'
                onClick={(e)=>handleClick(e,course._id)}
                >
                  Delete
                </button>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default Profile