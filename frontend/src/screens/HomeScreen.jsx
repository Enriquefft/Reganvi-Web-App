import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { BASE_URL } from '../utils'
import { useNavigate } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { mainBlue, mainGreen, mainPink, mainOrange, buttonStyle1, buttonOnHover1, buttonOffHover1,  buttonStyle2, buttonOnHover2, buttonOffHover2 } from '../utils';


function HomeScreen() {
      const navigate = useNavigate();

      const handleButtonClick = () => {
            navigate('/cotization');
      };


      const firstBanner = {
            backgroundImage: `url(${BASE_URL + '/images/RecyclingFirstBanner1.png'})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center', 
            backgroundColor: '#f0f0f0', 
      }; //style={firstBanner}

      const secondBanner = {
            backgroundImage: `url(${BASE_URL + '/images/RecyclingFirstBanner.png'})`, 
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'center', 
            backgroundColor: '#f0f0f0', 
      }; //style={secondBanner}
      
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

      return (
            <> 
            <div className="w-full" style={firstBanner}>
                  {/* First Banner */}
                  <div className='flex bg-gray-800 bg-opacity-50' >
                        <Container className='my-40 text-white p-4' style={{ backgroundColor:"rgba(0,0,0,0.7", boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', }}>                  
                              <h1 className="">Encuentra los mejores proveedores locales de materiales reciclados</h1>
                              <p className='opacity-80'>Conectamos a proveedoresde materiales reciclados con corporaciones de industrias reutilizadoras</p>
                              <OverlayTrigger
                                    key="bottom"
                                    placement="bottom"
                                    overlay={<Tooltip id="tooltip-bottom">Ingresa los productos y cantidades que deseas para poder asesorarte.</Tooltip>}
                              >
                                    <button onClick={handleButtonClick} className="text-black w-48 my-2 p-2  rounded-xl" 
                                    style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}
                                    >
                                          Cotiza tu pedido
                                    </button>
                              </OverlayTrigger>
                        </Container>
          
                  </div>
            </div>
            <Container className="my-20 p-2" style={{ boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', borderRadius: '10px', }}>
                  {/* Company Logos */}
                  
                  <Row className="mb-4 align-center justify-center">
                        {
                              companyLogos.map((company, index) => (
                                    <Col key={index} xs={4} sm={2} className='p-4'>
                                          <img src={company.image}/>
                                    </Col>
                              ))
                        }
                  </Row>
            </Container>

            <Container className="my-5" >
                  {/* Recyclable Products */}
                  <Row className="mb-4">
                        <Col>
                              <h2>Productos Principales</h2>
                        </Col>
                  </Row>
                  <Row className='border rounded-xl p-3' >
                        {
                              mainProducts.map((product, index) => (
                                    
                                    <Col key={index} md={6} className='my-4'>
                                          <Card style={{ boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', borderRadius: '10px', }}>
                                                <Card.Img variant="top" src={product.image} />
                                                <Card.Body>
                                                      <Card.Title>{product.title}</Card.Title>
                                                      <Card.Text>
                                                            {product.description}
                                                      </Card.Text>
                                                     
                                                </Card.Body>
                                          </Card>             
                                    </Col>
                                    
                              ))
                        }
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
            
      </>
      );
}

export default HomeScreen;
