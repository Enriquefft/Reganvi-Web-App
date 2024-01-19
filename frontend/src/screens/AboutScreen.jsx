import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { BASE_URL } from '../utils'
import { useNavigate } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { mainBlue, mainGreen, mainPink, mainOrange, buttonStyle1, buttonOnHover1, buttonOffHover1,  buttonStyle2, buttonOnHover2, buttonOffHover2 } from '../utils';


function AboutScreen() {
 
      const secondBanner = {
            backgroundImage: `url(${BASE_URL + '/images/RecyclingFirstBanner.png'})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center', 
            backgroundColor: '#f0f0f0', 
      }; //style={secondBanner}
  return (
    <div>
      <Container >
      
            <Row className='py-4 my-4'>
                  <Col sm={12} className='text-center'>
                        <img
                              src="/Reganvi Logo.png"
                              alt="Profile"
                              style={{
                                    transition: 'transform 1s cubic-bezier(0.43, 0.13, 0.23, 0.96)'
                              }}
                              onLoad={(e) => e.target.classList.add('spin-on-load')}
                              onMouseOver={(e) => e.target.classList.add('spin-on-hover')}
                              onMouseOut={(e) => e.target.classList.remove('spin-on-hover')}
                              className=" w-48 h-auto p-2 mx-auto"
                        />
                        <h2 style={{color:mainGreen}}><b>R E G A N V I</b></h2>
                        <p style={{color:mainGreen}}>B2B ONE STOP SHOP DE MATERIALES RECICLADOS EN PERÚ</p>
                  </Col>
                  
            </Row>
      </Container>

      <Container>
            <Row className='py-4 my-4'>
                  <Col sm={12} className='text-center'>
                        <div>
                              <p>¡Saludos <span role="img" aria-label="recycle">♻️♻️</span>!</p>
                              <p>Les habla el equipo de Reganvi, startup que busca fortalecer la economía circular en el Perú.</p>
                              <p>Queremos conectar a sus empresas con corporaciones que requieren materiales reciclados de calidad. A través de nuestro marketplace digital, podrán publicar de manera gratuita las ofertas de PET, plástico y más que tienen disponible.</p>
                              <p>Al mismo tiempo, recibirán notificaciones sobre nuevas demandas de productos donde puedan participar. Esto ampliará sus oportunidades de negocio de forma sostenible.</p>
                              <p>Nuestra visión es impulsar la industria del reciclaje a gran escala mediante soluciones tecnológicas que simplifiquen los procesos. Los invitamos a ser parte de esta revolución verde con su inscripción.</p>
                        </div>
                  </Col>
            </Row>
      </Container>

      <div className='w-full' style={secondBanner}>
                  <div className='flex bg-gray-800 bg-opacity-50'>
                        <Container className="my-40 p-4" style={{ backgroundColor:"rgba(0,0,0,0.7", boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', }}>
                              {/* Banner */}
                  
                              <h2 className='mb-8 text-white'>Tu eliges el lugar, nosotros nos encargamos del resto.</h2>
                              <Row className='my-2'>
                                    <Col md={4}>
                                          <Card className='w-full text-white my-1' 
                                          style={buttonStyle1} 
                                          onClick={() => {window.open('https://wa.me/51994898110/')}}
                                          >
                                                <Card.Body>
                                                      <Card.Title>Contactanos:</Card.Title>
                                                      <Card.Text>
                                                            +51 994 898 110
                                                      </Card.Text>
                                                </Card.Body>
                                          </Card>     
                                    </Col>
                              </Row>
                              <Row className='my-2'>
                                    <Col md={4}>
                                          <Card className='w-full text-white ' 
                                          style={buttonStyle2} 
                                          onClick={() => {window.open('mailto:reganvi.pe@gmail.com')}}
                                          >
                                                <Card.Body>
                                                      <Card.Title>Correo electrónico:</Card.Title>
                                                      <Card.Text>
                                                            reganvi.pe@gmail.com
                                                      </Card.Text>
                                                </Card.Body>
                                          </Card>   
                                    </Col>
                              </Row>  
                        
                        </Container>
                  </div>
            </div>
    </div>
  )
}

export default AboutScreen