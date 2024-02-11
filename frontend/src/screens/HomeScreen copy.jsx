import React from 'react'
import { useState, useEffect, useRef } from 'react';

import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { BASE_URL } from '../utils'
import { useNavigate } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { mainBlue, mainGreen, mainPink, mainOrange, buttonStyle1, buttonOnHover1, buttonOffHover1,  buttonStyle2, buttonOnHover2, buttonOffHover2 } from '../utils';


function HomeScreen({ productOptions }) {
      const navigate = useNavigate();

      const handleButtonClick = () => {
            navigate('/cotization');
      };


      
      
      const companyLogos = [
            {
                  image: `${BASE_URL + "/images/logo1sanmiguelindustrias.png"}`
            },
            {
                  image: `${BASE_URL + "/images/logo2pamolsa.png"}`
            },
            {
                  image: `${BASE_URL + "/images/logo3solpack.png"}`
            },
            {
                  image: `${BASE_URL + "/images/logo4papelera.png"}`
            },
            {
                  image: `${BASE_URL + "/images/logo5g&f.png"}`
            },
      ]
      const mainProducts = [
            {
                  title: "Botellas de plástico",
                  description:"¡Descubre la belleza de la sostenibilidad con nuestras botellas de plástico recicladas! Cada botella ha pasado por un proceso de transformación que no solo contribuye al cuidado del medio ambiente, sino que también te ofrece un producto de alta calidad. Nuestro compromiso con la reutilización del plástico no solo reduce la cantidad de residuos, sino que también ofrece una opción ecológica y elegante para tus necesidades diarias.",
                  image: `${BASE_URL + "/images/1botellas.png"}`
            },
            {
                  title: "Cartón",
                  description:"Abraza la practicidad y la consciencia ecológica con nuestro cartón reciclado. Cada caja cuenta una historia de sostenibilidad, transformando materiales usados en soluciones innovadoras. Estas cajas recicladas no solo son resistentes y versátiles, sino que también representan un paso hacia un futuro más verde. Úsalas para envolver tus regalos o almacenar tus pertenencias con estilo, sabiendo que estás haciendo una elección responsable.",
                  image: `${BASE_URL + "/images/2carton.png"}`
            },
            {
                  title: "Aluminio",
                  description:"Nuestro aluminio reciclado redefine la durabilidad y la elegancia. Proveniente de fuentes recicladas, este material ha sido cuidadosamente transformado para brindarte productos que destacan por su resistencia y ligereza. Desde envases hasta utensilios de cocina, cada artículo de aluminio reciclado es una declaración de compromiso con la preservación del planeta. Únete a nosotros en este viaje hacia un estilo de vida más sostenible sin sacrificar calidad ni estilo.",
                  image: `${BASE_URL + "/images/3aluminio.png"}`
            },
            {
                  title: "Chatarra",
                  description:"La chatarra reciclada no solo es un conjunto de metales y materiales diversos, sino una oportunidad para la creatividad y la innovación. Cada pieza cuenta una historia única de reutilización y transformación. Desde esculturas hasta elementos decorativos, nuestra chatarra reciclada ofrece una segunda vida a materiales previamente descartados. Explora la belleza de la imperfección y la originalidad en cada pieza, contribuyendo al ciclo continuo de reciclaje y reinvención.",
                  image: `${BASE_URL + "/images/4chatarra.png"}`
            },
      ]

      const [calendarWidth, setCalendarWidth] = useState(0)
      const handleResize = () => {
            const windowsWidth = window.innerWidth
            let newWidth = 0
            if(windowsWidth < 1000){
                  newWidth = Math.round(windowsWidth * 0.9)
            } else if(windowsWidth < 2000){
                  newWidth = 800
            } else {
                  newWidth = 1500
            }
            setCalendarWidth(newWidth)
      }

      useEffect(() => {
            handleResize()
            window.addEventListener('resize', handleResize)
      
            return () => {
                  window.removeEventListener('resize', handleResize)
            }
      }, [])


      const [isVisible, setIsVisible] = useState(false);
      const [isOnScreenFirstBanner, setIsOnScreenFirstBanner] = useState(false);
      const [isOnScreenSecondBanner, setIsOnScreenSecondBanner] = useState(false);


      useEffect(() => {
            setIsVisible(true);
      }, []);


      useEffect(() => {
            const desfase = 250
            const handleScroll = () => {
              const firstBannerBottom = document.getElementById('first_banner').getBoundingClientRect().bottom
              const isFirstBannerVisible = firstBannerBottom - desfase < window.innerHeight 
        
              const secondBannerBottom = document.getElementById('second_banner').getBoundingClientRect().bottom
              const isSecondBannerVisible = secondBannerBottom - desfase < window.innerHeight
        
              setIsOnScreenFirstBanner(isFirstBannerVisible)
              setIsOnScreenSecondBanner(isSecondBannerVisible)
            };
        
            window.addEventListener('scroll', handleScroll);
        
            handleScroll();
        
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
          }, []);

      const firstBanner = {
            backgroundImage: `url(${BASE_URL + '/images/RecyclingFirstBanner1.png'})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center', 
            backgroundColor: '#f0f0f0', 
      }; //style={firstBanner}

      const secondBanner = {
            backgroundImage: `url(${BASE_URL + '/images/plantbanner.png'})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center', 
            backgroundColor: '#f0f0f0', 
      }; //style={firstBanner}

      const lastBanner = {
            backgroundImage: `url(${BASE_URL + '/images/RecyclingFirstBanner.png'})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center', 
            backgroundColor: '#f0f0f0', 
      }; //style={lastBanner}
     
      return ( 
            <> 
            <div style={firstBanner} id='first_banner' className='w-full '>
                  {/* First Banner */}
                  <div className="flex  bg-gray-900 bg-opacity-80 align-items-center" /* 900 80 */
                  style={{ height:calendarWidth >= 800 ? '800px' : '600px'  }} >
                        <Container className={`text-white p-4 h-fit fade-in transform ${isOnScreenFirstBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'} transition-transform-opacity duration-1000 ease-in-out `} >                  
                              
                              <h1 className='drop-shadow-xl'>Encuentra los mejores proveedores locales de materiales reciclados</h1>
                              <p className='text-justify drop-shadow-xl'>Los mejores proveedores de materiales reciclados en el Perú</p>
                              <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip id="tooltip-bottom">Ingresa los productos y cantidades que deseas para poder asesorarte.</Tooltip>}>
                                    <button onClick={handleButtonClick} className="text-black w-48 my-2 p-2  rounded-xl" style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}>
                                          <h6 className='m-1 p-0'>Cotiza Gratis</h6>
                                    </button>
                              </OverlayTrigger>

                        </Container>
          
                  </div>
            </div>
            <div style={secondBanner} id='second_banner' className='w-full '>
                  {/* Second Banner */}
                  <div className={`flex bg-gray-900 align-items-center  ${isOnScreenSecondBanner ? 'bg-opacity-80' : 'bg-opacity-100'} transition duration-1000 ease-in-out `} /* 900 80 */
                  style={{ height:calendarWidth >= 800 ? '600px' : '500px'  }} >
                        <Container className={`text-white p-4 h-fit fade-in transform ${isOnScreenSecondBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'} transition-transform-opacity duration-1000 ease-in-out `} >                  
                              
                              <h1 className='drop-shadow-xl'>Encuentra los mejores proveedores locales de materiales reciclados</h1>
                              <p className='text-justify drop-shadow-xl'>Conectamos a proveedores de materiales reciclados con corporaciones de industrias reutilizadoras en el mercado Peruano, regístrate y ¡haz una cotización gratis!</p>
                              <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip id="tooltip-bottom">Ingresa los productos y cantidades que deseas para poder asesorarte.</Tooltip>}>
                                    <button onClick={handleButtonClick} className="text-black w-48 my-2 p-2  rounded-xl" style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}>
                                          Cotiza tu pedido
                                    </button>
                              </OverlayTrigger>

                        </Container>
          
                  </div>
            </div>
            <div style={secondBanner} id='second_banner' className='w-full '>
                  {/* Second Banner */}
                  <div className={`flex bg-gray-900 align-items-center  ${isOnScreenSecondBanner ? 'bg-opacity-80' : 'bg-opacity-100'} transition duration-1000 ease-in-out `} /* 900 80 */
                  style={{ height:calendarWidth >= 800 ? '600px' : '500px'  }} >
                        <Container className={`text-white p-4 h-fit fade-in transform ${isOnScreenSecondBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'} transition-transform-opacity duration-1000 ease-in-out `} >                  
                              
                              <h1 className='drop-shadow-xl'>Encuentra los mejores proveedores locales de materiales reciclados</h1>
                              <p className='text-justify drop-shadow-xl'>Conectamos a proveedores de materiales reciclados con corporaciones de industrias reutilizadoras en el mercado Peruano, regístrate y ¡haz una cotización gratis!</p>
                              <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip id="tooltip-bottom">Ingresa los productos y cantidades que deseas para poder asesorarte.</Tooltip>}>
                                    <button onClick={handleButtonClick} className="text-black w-48 my-2 p-2  rounded-xl" style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}>
                                          Cotiza tu pedido
                                    </button>
                              </OverlayTrigger>

                        </Container>
          
                  </div>
            </div>
            
            <Container className="my-5" >
                  <Row className='mb-4'>
                        <Col xs={12}>
                              <h3>Algunos de nuestros aliados estratégicos</h3>
                        </Col>
                  </Row>
                  {/* Company Logos */}
                  
                  <Row className="my-4 align-center justify-center">
                        {
                              companyLogos.map((company, index) => (
                                    <Col key={index} xs={4} sm={2} className='p-4'>
                                          <img src={company.image}/>
                                    </Col>
                              ))
                        }
                  </Row>
            </Container>

            <Container className="mb-8" >
                  {/* Recyclable Products */}
                  <Row className="">
                        <Col>
                              <h3>Algunos de nuestros productos</h3>
                        </Col>
                  </Row>
                  <Row className='' >
                        {
                              productOptions?.length > 0 ? [...productOptions].sort(() => Math.random() - 0.5).slice(0, 6).map((product, index) => (
                                    
                                    <Col key={index} xs={12} md={4} className='p-4'>
                                          <Card className='' >
                                                <Card.Img variant="top" src={`${BASE_URL}${product.image}`} />
                                                <Card.Body>
                                                      <Card.Title className='h-12'>{product.name}</Card.Title> 
                                                      <Card.Text className='h-28 overflow-hidden relative group text-xs text-justify'>
                                                            <span className=''>{product.description}</span>
                                                            <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white opacity-100 z-20"></span>

                                                      </Card.Text>
                                                     
                                                </Card.Body>
                                          </Card>             
                                    </Col>
                                    
                              )) : null
                        }
                  </Row>
            </Container>

            <div className='w-full ' style={lastBanner}>
                  <div className='flex bg-gray-800 bg-opacity-50 align-items-center ' style={{ height:'500px'  }}>
                        <Container className="p-4 h-fit" style={{ backgroundColor:"rgba(0,0,0,0.7", boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',}} >
                              {/* Banner */}
                  
                              <h3 className='mb-8 text-white'>Tu eliges el lugar, nosotros nos encargamos del resto.</h3>
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
            
      </>
      );
}

export default HomeScreen;
