import react from "react";
import { CgProfile } from "react-icons/cg";
import './Navbar.scss';
const Navbar = () => {
	return (
		<div className = "navbar">
			<div className="company_name">
				<h1>
					CourseMate
				</h1>
				<img alt="study" src="/study.png"/>
			</div>
			<div className="links">
				<a href="/get_courses"><span>Courses</span></a>
				<a href="/profile"><span><CgProfile/></span></a>
			</div>
		</div>
		);
}

export default Navbar;