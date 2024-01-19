import { BrowserRouter, Routes,  Route, Navigate  } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState, useEffect,  } from 'react';
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
            <div className='text-sm'  /*style={{
                  backgroundImage: `url(/Background.png)`,
                  backgroundSize: '100% auto', // Adjust the sizing as needed
                  backgroundRepeat: 'repeat-y',
                  width: '100vw', // 100% of the viewport width
                  height: 'auto', // 100% of the viewport height
                }}*/>
                  
                  <BrowserRouter>
                        <Header userInfo={userInfo}/>
                        <div className={`min-h-screen`}>
                        <Routes>
                              <Route path="/" Component={HomeScreen} /> 
                              <Route path="/about" Component={AboutScreen} /> 
                              <Route path="/cotization" element={<CotizationScreen userInfo={userInfo} productOptions={productOptions}/>}/> 
                              <Route path="/user" element={<UserScreen userInfo={userInfo}/>}  /> 
                              
                        </Routes>
                        </div>
                        <Footer/>
                  </BrowserRouter>
            </div>   
      )
}

export default App