import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { BASE_URL } from '../utils'
import { useNavigate } from 'react-router-dom'
import { mainBlue, mainGreen, mainPink, mainOrange, buttonStyle1, buttonOnHover1, buttonOffHover1, buttonStyle2, buttonOnHover2, buttonOffHover2 } from '../utils';


function Header({ userInfo }) {
      const navigate = useNavigate()

      const homePage = () => {
            navigate('/')
      }
      const aboutPage = () => {
            navigate('/about')
      }
      const cotizationPage = () => {
            navigate('/cotization')
      }
      const userPage = () => {
            navigate('/user')
      }

      return (
            <Navbar expand="lg" className="bg-body-tertiary sticky py-1 px-4 w-full bg-white" /*style={{backgroundColor:"#442B48"}}*/ style={{position:"sticky", top:0, zIndex:1000}}>
                  <Container  className='px-4'>
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
                                    className=" w-16 h-auto p-2"
                              />
                        
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className='bg-black rounded-xl border-0 px-2 border-black'/>
                        <Navbar.Collapse id="basic-navbar-nav ">
                              <Nav className="w-full">
                                    <Nav.Link onClick={homePage} className='self-center mx-2'>Inicio </Nav.Link>
                                    <Nav.Link onClick={aboutPage} className='self-center mx-2'>Nosotros </Nav.Link>
                                    <Nav.Link onClick={cotizationPage} className='text-black w-auto px-3 text-center mx-4 rounded-3xl self-center' 
                                    style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}
                                    
                                    >Cotiza tu pedido </Nav.Link>


                                    <div className='flex ml-lg-auto self-center'>
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