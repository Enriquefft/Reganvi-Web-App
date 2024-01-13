import { BrowserRouter, Routes,  Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen'
import CotizationScreen from './screens/CotizationScreen';
import UserScreen from './screens/UserScreen'


function App() {
      const userInfoFromRedux = useSelector((state) => state.userInfo.userInfo)
      const productOptionsFromRedux = useSelector((state) => state.productInfo.productOptions)

      const [userInfo, setUserInfo] = useState(userInfoFromRedux)
      const [productOptions, setProductOptions] = useState(productOptionsFromRedux)

      
      useEffect(() => {
            setUserInfo(userInfoFromRedux)
            setProductOptions(productOptionsFromRedux)
      }, [userInfoFromRedux, productOptionsFromRedux]);

      return (
            <div className='min-h-screen'>
                  
                  <BrowserRouter>
                        <Header userInfo={userInfo}/>
                        <Routes >
                              <Route path="/" Component={HomeScreen} /> 
                              <Route path="/about" Component={AboutScreen} /> 
                              <Route path="/cotization" element={<CotizationScreen userInfo={userInfo} productOptions={productOptions}/>}/> 
                              <Route path="/user" element={<UserScreen userInfo={userInfo}/>}  /> 
                              
                        </Routes>
                        <Footer/>
                  </BrowserRouter>
            </div>   
      )
}

export default App