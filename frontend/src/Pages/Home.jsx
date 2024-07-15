import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

const Home = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log(document);
        // const token = Cookies.get('token'); // Retrieve 'token' cookie
        // if (token) {
        //     console.log(token) // Fetch user data using the token
        // } else {
        //     // Handle case where token doesn't exist
        //     console.log('Token not found');
        // }
    }, []);

    return (
        <div className='home'>
            <h1>Welcome to Home Page</h1>
            {userData ? (
                <div>
                    <p>Hello, {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    {/* Display other user information */}
                </div>
            ) : (
                <p>Please log in to view this content</p>
            )}
            {/* Other content */}
        </div>
    );
}

export default Home;
