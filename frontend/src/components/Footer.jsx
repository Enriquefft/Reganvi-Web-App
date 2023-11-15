import React from 'react'
import { Row, Col, Navbar, Nav, Container } from 'react-bootstrap'
import { BASE_URL } from '../utils'
import { useNavigate } from 'react-router-dom'

function Footer() {
      const navigate = useNavigate()

      const homePage = () => {
            navigate('/')
      }
      const cotizationPage = () => {
            navigate('/cotization')
      }
      const userPage = () => {
            navigate('/user')
      }

      return (
            <div className='bg-black text-white'>
                  <Container className='py-10'>
                        <Row>
                              <Col sm={4} className='py-3'>
                                    <div onClick={homePage} className='flex mb-4'>
                                          <img
                                                src="/Reganvi Logo.png"
                                                alt="Profile"
                                                className="w-20 h-auto p-2"
                                          />
                                          <h4 className='pt-2 pb-4 px-2'>Reganvi</h4>
                                    </div>
                                    <p className='mb-0'>Número de licencia: 123-456-7890</p>
                                    <p>© 2023 Reganvi Perú</p>
                                    
                              </Col>

                              <Col sm={3} className='py-3'>
                                    <h6 className='mb-8'>Contacto</h6>
                                    <p className='mb-0'>Teléfono: +51 994 898 110</p>
                                    <p>Email: reganvi.pe@gmail.com</p>
                                    <p className='mb-0'>Jr. Pablo Arguedas 498,</p>
                                    <p>San Juan de Miraflores, Lima, Perú</p> 
                              </Col>

                              <Col sm={3} className='py-3'>
                                    <h6 className='mb-8'>Horario</h6>
                                    <p className='mb-0'>Lun - Vie: 8:00 - 20:00</p>
                                    <p>Sábado: 9:00 - 19:00</p>
                              </Col>

                              <Col sm={2} className='py-3'>
                                    <h6 className='mb-8'>Recursos</h6>
                                    <p className='mb-0'>Localidad</p>
                                    <p className='mb-0'>Tips</p>
                                    <p className='mb-0'>FAQ's</p>
                                    <p>Privacidad y Términos</p>
                                    
                              </Col>
                        

                        </Row>
                        
                  </Container>
            </div>
   
      )
}

export default Footer