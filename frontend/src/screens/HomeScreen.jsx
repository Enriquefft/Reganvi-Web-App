import React from 'react'
import { useState, useEffect, useRef } from 'react';

import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap'
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

      const [controlWidth, setControlWidth] = useState(0)
      const handleResize = () => {
            const windowsWidth = window.innerWidth
            let newWidth = 0
            if(windowsWidth < 990){
                  newWidth = Math.round(windowsWidth * 0.9)
            } else if(windowsWidth < 2000){
                  newWidth = 1000
            } else {
                  newWidth = 1500
            }
            setControlWidth(newWidth)
      }

      const [productPage, setProductPage] = useState(0)
      const [productFirst, setProductFirst] = useState(0)
      const [productLast, setProductLast] = useState(4)

      const handleProductPage = (value) => {
            const num_pages = Math.ceil(productOptions?.length / 4)
            const new_page = productPage + value
            setProductPage(new_page < num_pages && new_page >= 0 ? new_page : productPage)
            setProductFirst(new_page < num_pages && new_page >= 0 ? new_page * 4 : productFirst)
            setProductLast(new_page < num_pages && new_page >= 0 ? new_page * 4 + 4 : productLast)
      }

      useEffect(() => {
            handleResize()
            window.addEventListener('resize', handleResize)
      
            return () => {
                  window.removeEventListener('resize', handleResize)
            }
      }, [])

      const [isOnScreenFirstBanner, setIsOnScreenFirstBanner] = useState(false);
      const [isOnScreenSecondBanner, setIsOnScreenSecondBanner] = useState(false);
      const [isOnScreenThirdBanner, setIsOnScreenThirdBanner] = useState(false);
      const [isOnScreenForthBanner, setIsOnScreenForthBanner] = useState(false);

      useEffect(() => {
            const desfase = 500
            const handleScroll = () => {
              const firstBannerBottom = document.getElementById('first_banner')?.getBoundingClientRect().bottom
              const isFirstBannerVisible = firstBannerBottom - desfase < window.innerHeight 
        
              const secondBannerBottom = document.getElementById('second_banner')?.getBoundingClientRect().bottom
              const isSecondBannerVisible = secondBannerBottom - desfase < window.innerHeight

              const thirdBannerBottom = document.getElementById('third_banner')?.getBoundingClientRect().bottom
              const isThirdBannerVisible = thirdBannerBottom - desfase < window.innerHeight

              const forthBannerBottom = document.getElementById('forth_banner')?.getBoundingClientRect().bottom
              const isForthBannerVisible = forthBannerBottom - desfase < window.innerHeight
        
              setIsOnScreenFirstBanner(isFirstBannerVisible)
              setIsOnScreenSecondBanner(isSecondBannerVisible)
              setIsOnScreenThirdBanner(isThirdBannerVisible)
              setIsOnScreenForthBanner(isForthBannerVisible)
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

      const [showProductModal, setShowProductModal] = useState(false)
      const [displayedProduct, setDisplayedProduct] = useState({})

      const handleProductModal = (product) => {
            setDisplayedProduct(product)
            setShowProductModal(!showProductModal)
      }
     
      return ( 
            <> 
            <Modal className='text-xs' show={showProductModal} onHide={() => handleProductModal({})} centered size="lg">
                        <Modal.Header closeButton>
                              <Modal.Title>{displayedProduct.name}</Modal.Title>
                              <span className='ml-auto mt-1 w-6 h-6 select-none' onClick={() => handleProductModal({})}>
                                    <img src="/cross_thin_icon.png"/></span>
                        </Modal.Header>
                        <Modal.Body>
                              <img className="mb-2 object-cover w-full h-40 rounded border" src={`${BASE_URL}${displayedProduct.image}`} />
                              <h6>Descripción</h6>
                              <p className='text-justify'>{displayedProduct.description}</p>
                              <div className='w-full flex justify-content-center'>
                              <button onClick={handleButtonClick} className="text-black w-48 my-2 p-2 rounded-xl" style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}>
                                    Cotiza Gratis
                              </button>
                              </div>
                                  
                        </Modal.Body>
                       
            </Modal>
            <div style={{}} id='first_banner' className='w-full bg-gray-100'>
                  <div className='flex flex-col p-5 lg:p-0 lg:flex-row items-center ' style={{ height:window.innerWidth >= 800 ? '800px' : '640px'  }}>
                        <Container className={`fade-in transform ${isOnScreenFirstBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'} transition-transform-opacity duration-1000 ease-in-out`}>
                              <Row>
                                    <Col xs={12} lg={4}>
                                          <h1 className='drop-shadow-xl'>Recicla, gana y vive</h1>
                                          <p className='drop-shadow-xl'>Encuentra los mejores proveedores de materiales reciclados en el Perú</p>
                                          <OverlayTrigger key="bottom" placement="bottom" overlay={<Tooltip id="tooltip-bottom">Ingresa los productos y cantidades que deseas para poder asesorarte.</Tooltip>}>
                                                <button onClick={handleButtonClick} className="text-black w-48 my-2 p-2  rounded-xl" style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}>
                                                      Cotiza Gratis
                                                </button>
                                          </OverlayTrigger>
                                    </Col>
                              </Row>
                        </Container>
                        <div className='flex lg:flex-col justify-center py-5'>
                              <img className={`absolute right-0 drop-shadow-2xl  ${window.innerWidth >= 990 ? 'w-3/5' : 'w-full' } fade-in transform ${isOnScreenFirstBanner ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-40'} transition-transform-opacity duration-1000  ease-in-out`} src={BASE_URL + '/images/hand.png'} alt='Hand image' />
                              <img className={`absolute  right-0 drop-shadow-2xl  ${window.innerWidth >= 990 ? 'w-3/5' : 'w-full' }  ${isOnScreenFirstBanner ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 delay-500 ease-in-out`} src={BASE_URL + '/images/globe.png'} alt='Globe image' />
                        </div>
                  </div>

            </div>
            <div style={firstBanner} id='second_banner' className='w-full '>
                  {/* First Banner */}
                  <div className={`flex  align-items-center bg-gray-900  ${isOnScreenSecondBanner ? 'bg-opacity-80' : 'bg-opacity-100'} transition duration-1000 ease-in-out`} /* 900 80 */
                  style={{ height:window.innerWidth >= 800 ? '800px' : '600px'  }} >
                        <Container className={`text-white p-4 h-fit fade-in transform ${isOnScreenSecondBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'} transition-transform-opacity duration-1000 ease-in-out `} >                  
                              
                              <h1 className='drop-shadow-xl'>Algunos de nuestros aliados</h1>
                              <Row className="align-center justify-center">
                                    {
                                          companyLogos.map((company, index) => (
                                                <Col key={index} xs={6} sm={3} className='p-4 flex align-items-center'>
                                                      <img className='w-full p-auto' src={company.image}/>
                                                </Col>
                                          ))
                                    }
                              </Row>

                        </Container>
          
                  </div>
            </div>
            

            <div id='third_banner' className="flex bg-gray-100 py-max align-items-center" style={{ height:window.innerWidth >= 800 ? '700px' : '1000px'  }}  >
                  {/* Recyclable Products */}
                  <Container className={`p-4 h-fit fade-in transform ${isOnScreenThirdBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'} transition-transform-opacity duration-1000 ease-in-out `}>
                        <Row className="mb-5">
                              <Col><h1>Algunos de nuestros productos</h1></Col>
                        </Row>
                        <Row className='align-items-center my-4' >
                              {
                                    productOptions?.length > 0 ? [...productOptions].slice(productFirst, productLast).map((product, index) => (
                                          
                                          <Col key={index} xs={6} md={3} className='py-2'>
                                                <Card style={{borderRadius:'40px'}} onClick={() => handleProductModal(product)} className='shadow-none hover:shadow-lg scale-100 hover:scale-105' >
                                                      <Card.Img style={{borderRadius:'40px 40px 0 0'}} variant="top" src={`${BASE_URL}${product.image}`} />
                                                      <Card.Body className=''>
                                                            <Card.Title className='h-12'>{product.name}</Card.Title>                                                      
                                                      </Card.Body>
                                                </Card>             
                                          </Col>
                                          
                                    )) : null
                              }
                        </Row>
                        <Row >
                              <Col xs={12} className='flex align-items-center justify-content-center py-2'>
                                    <div className={`w-8 ${productPage == 0 && 'opacity-25'} drop-shadow-none hover:drop-shadow-lg scale-100 hover:scale-110`} onClick={() => handleProductPage(-1)}><img src="/left_icon.png"/></div>
                                    <div>pagina {productPage + 1} of {Math.ceil(productOptions?.length / 4)}</div>
                                    <div className={`w-8 ${productPage == (Math.ceil(productOptions?.length / 4) - 1) && 'opacity-25'} drop-shadow-none hover:drop-shadow-lg scale-100 hover:scale-110`} onClick={() => handleProductPage(1)}><img src="/right_icon.png"/></div>
                              </Col>
                        </Row>
                  </Container>
            </div>

            <div id='forth_banner' className='w-full ' style={lastBanner}>
                  <div className={`flex  align-items-center bg-gray-900  ${isOnScreenForthBanner ? 'bg-opacity-80' : 'bg-opacity-100'} transition duration-1000 ease-in-out`} /* 900 80 */
                  style={{ height:window.innerWidth >= 800 ? '800px' : '600px'  }}>
                        <Container className={`p-4 h-fit fade-in transform ${isOnScreenForthBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-40'} transition-transform-opacity duration-1000 ease-in-out `}  >
                              {/* Banner */}
                  
                              <h1 className='mb-8 text-white text-center'>Contactanos para obtener las mejores ofertas locales</h1>
                              <Row className='my-2 justify-content-center'>
                                    <Col md={3} className='text-white flex flex-col align-items-center justify-center p-2 m-2  rounded-2xl' style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}  onClick={() => {window.open('https://wa.me/51994898110/')}}>
                                          +51 994 898 110
                                         
                                    </Col>
                                    <Col md={3} className='text-white flex flex-col align-items-center justify-center p-2 m-2 rounded-2xl' style={buttonStyle2} onMouseEnter={(e) => buttonOnHover2(e)} onMouseLeave={(e) => buttonOffHover2(e)}  onClick={() => {window.open('mailto:reganvi.pe@gmail.com')}}>
                                          reganvi.pe@gmail.com
                                         
                                    </Col>
                                    
                              </Row>
                             
                        </Container>
                  </div>
            </div>
            
      </>
      );
}

export default HomeScreen;
