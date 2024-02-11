import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'
import { BASE_URL } from '../utils'
import { useNavigate } from 'react-router-dom'
import { mainBlue, mainGreen, mainPink, mainOrange, buttonStyle1, buttonOnHover1, buttonOffHover1, buttonStyle2, buttonOnHover2, buttonOffHover2 } from '../utils';


function Header({ userInfo }) {

      const [expanded, setExpanded] = useState(false)

      const navigate = useNavigate()

      const homePage = () => {
            navigate('/')
            setExpanded(false)
      }
      const aboutPage = () => {
            navigate('/about')
            setExpanded(false)
      }
      const cotizationPage = () => {
            navigate('/cotization')
            setExpanded(false)
      }
      const userPage = () => {
            navigate('/user')
            setExpanded(false)
      }

      return (
            <Navbar  expanded={expanded} expand="lg" className="bg-body-tertiary sticky py-1 px-4 w-full bg-gray-100 " /*style={{backgroundColor:"#442B48"}}*/ style={{position:"sticky", top:0, zIndex:1000}}>
                  <Container  className='px-8'>
                        <Navbar.Brand onClick={homePage}>
                              <img
                                    src="/Reganvi Logo.png"
                                    alt="Profile"
                                    style={{
                                          transition: 'transform 1s cubic-bezier(0.43, 0.13, 0.23, 0.96)'
                                    }}
                                    onLoad={(e) => e.target.classList.add('spin-on-load')}
                                    onMouseOver={(e) => e.target.classList.add('spin-on-hover')}
                                    onMouseOut={(e) => e.target.classList.remove('spin-on-hover')}
                                    className=" w-14 h-14"
                              />
                        </Navbar.Brand>
                        <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" className='bg-black rounded-xl border-0 px-2 border-black'/>
                        <Navbar.Collapse id="basic-navbar-nav" className=''>
                              <Nav className="w-full  flex flex-col align-items-start justify-content-start ">
                                    <Nav.Link onClick={homePage} className='mx-2 mt-3'>Inicio </Nav.Link>
                                    <Nav.Link onClick={aboutPage} className='ml-2 mr-4 mt-3'>Nosotros </Nav.Link>
                                    <Nav.Link onClick={cotizationPage} className='text-black w-auto px-3 text-center rounded-3xl my-3' 
                                    style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}
                                    
                                    >Cotiza tu pedido </Nav.Link>


                                    <div className='flex ml-lg-auto self-start my-2'>
                                    {
                                          userInfo.user ? (
                                                <Nav.Link onClick={userPage} className='flex'>
                                                      <img
                                                            src={userInfo.user.profile_image}
                                                            alt="Profile"
                                                            className="w-10 h-auto rounded-full"
                                                      />
                                                </Nav.Link>
                                                
                                          ) : (
                                                <Nav.Link onClick={userPage}>
                                                      <img
                                                            src={BASE_URL + '/images/Profile.jpg'}
                                                            alt="Profile"
                                                            className="w-10 h-auto rounded-full"
                                                      />
                                                </Nav.Link>
                                          )
                                    }
                                    </div>
                              </Nav>
                        </Navbar.Collapse>
                        
                  </Container>
            </Navbar>
      )
}

export default Header