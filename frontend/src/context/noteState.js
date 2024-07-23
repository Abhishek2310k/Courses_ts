import React, {useState,useEffect} from "react";
import NoteContext from "./noteContext";
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
const NoteState = (props) => {

    const [user_login,setUserLogin] = useState(null);

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
          try {
            const decodedUser = jwtDecode(userCookie);
            setUserLogin(decodedUser);
          } catch (error) {
            console.error('Error decoding user cookie:', error);
          }
        }
      }, []);

    return (
        <NoteContext.Provider value = {{user_login,setUserLogin}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;