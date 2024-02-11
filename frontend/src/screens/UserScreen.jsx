import React, { useState } from 'react';
import UserProfile from '../components/UserProfile';
import UserEdit from '../components/UserEdit';
import UserLogin from '../components/UserLogin';
import UserSignup from '../components/UserSignup';
    
//import backgroundImage from '../assets/background1.jpeg';

function UserScreen({ userInfo }) {

      const [showLogin, setShowLogin] = useState(true)
      const [showEditForm, setShowEditForm] = useState(false)

      const handleShowLogin = () => {
            setShowLogin(!showLogin)
      }

      const handleShowEditForm = () => {
            setShowEditForm(!showEditForm)
      }
      {/*
      const userScreenStyle = {
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center', 
            backgroundColor: '#f0f0f0', 
      }; //style={userScreenStyle}

      */}

      return (
            <div  className='m-0'>
            {
                  userInfo.user ? (

                        !showEditForm ? (
                              <UserProfile userInfo={userInfo} handleShowEditForm={handleShowEditForm}/>
                        ) : (
                              <UserEdit userInfo={userInfo} handleShowEditForm={handleShowEditForm}  />
                        )
                        
                  ) : showLogin ? (
                        <UserLogin userInfo={userInfo} handleShowLogin={handleShowLogin} />
                  ) : (
                        <UserSignup  userInfo={userInfo} handleShowLogin={handleShowLogin} />
                  )
            }
            </div>

      );
}

export default UserScreen;
