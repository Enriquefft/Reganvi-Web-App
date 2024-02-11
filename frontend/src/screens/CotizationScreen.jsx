import { Container, Row, Col, Button, Card, Form, Dropdown } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getProductOptions, productCotization } from '../reducers/productReducers';
import { BASE_URL } from '../utils';
import { mainBlue, mainGreen, mainPink, mainOrange, buttonStyle1, buttonOnHover1, buttonOffHover1, buttonStyle3, buttonOnHover3, buttonOffHover3 } from '../utils';


import { cotizationTypes, unitsOfMeasure } from '../utils'

function CotizationScreen({ productOptions, userInfo}) {
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const handleButtonClick = () => {
            navigate('/user');
      };

      const [productNames, setProductNames] = useState([])

      const [productCotizationResults, setProductCotizationResults] = useState([])

      const [productName, setProductName] = useState('')
      const [type, setType] = useState('paletizado')
      const [amount, setAmount] = useState(100)
      const [unitOfMeasure, setUnitOfMeasure] = useState('KG')

      const [productNameIsValid, setProductNameIsValid] = useState(false)
      const [typeIsValid, setTypeIsValid] = useState(true)
      const [unitOfMeasureIsValid, setUnitOfMeasureIsValid] = useState(true)

      const [productOptionsError, setProductOptionsError] = useState('')

      const handleProductNameChange = (selectedProductName) => {
            setProductName(selectedProductName)
            setProductNameIsValid(true)
      }

      const handleTypeChange = (selectedType) => {
            setType(selectedType)
            setTypeIsValid(true)
      }

      const handleUnitOfMeasureChange = (selectedUnitOfMeasure) => {
            setUnitOfMeasure(selectedUnitOfMeasure)
            setUnitOfMeasureIsValid(true)
      }
      

      const handleCotization = (e) => {
            e.preventDefault()
            if(productNameIsValid && typeIsValid && unitOfMeasureIsValid ) {
                  dispatch(productCotization({ token:userInfo?.token, product_name:productName, type:type, amount:amount, unit_of_measure:unitOfMeasure }))
                  .then((result) => {
                        if (result.payload) {
                              setProductCotizationResults(result.payload)
                              setProductOptionsError("")
                        } else {
                              setProductCotizationResults([])
                              setProductOptionsError(result.error.message)
                        }
                  })
            } else {
                  setProductOptionsError("Seleccione un producto valido.")
            }
      }

      useEffect(() => {
            dispatch(getProductOptions())
            .then((result) => {
                  if (result.payload) {
                        setProductNames(productOptions)
                  } else {
                        setProductOptionsError(result.error.message)
                  }
            })

      }, [userInfo.token])

      useEffect(() => {
            // Scroll to the top of the page when the component is mounted
            window.scrollTo(0, 0);
          }, []);

      return (
            <>
            <Container className="my-5">
                  <Row className="mb-2">
                        <Col>
                              <h1>Cotize su pedido</h1>
                              <p>Precios actualizados, los proveedores más cercanos a usted.</p>
                        </Col>
                  </Row>
                  {
                        userInfo?.user ? 
                        <Form onSubmit={handleCotization}>
                        <Row >
                              
                                                      
                                    <Col sm={6} md={4} lg={3} className='mb-2'>
                                          <Form.Group controlId="product_name" >
                                                <Form.Label className='mb-0'>Producto</Form.Label>
                                                <Dropdown className='rounded' onSelect={handleProductNameChange}>
                                                      <Dropdown.Toggle className="py-0 px-1 rounded w-full bg-white d-flex justify-content-between align-items-center" variant='outline-dark' id="product-name-dropdown">
                                                            {(productName !== "") ? productName : "Producto"}
                                                      </Dropdown.Toggle>
                                                      <Dropdown.Menu
                                                            align="start"
                                                            onChange={(e) => setProductName(e.target.value)}
                                                            style={{maxHeight: '300px', overflowY: 'auto'}}
                                                            popperConfig={{ modifiers: [{name: 'offset', options: {offset: [0, -150]}}], }}
                                                      >
                                                            <Dropdown.Header>Producto</Dropdown.Header>
                                                            {productNames?.map((product, i) => (
                                                                  <Dropdown.Item key={i} eventKey={product.name}>
                                                                        {product.name}
                                                                  </Dropdown.Item>
                                                            ))}
                                                      </Dropdown.Menu>
                                                </Dropdown>
                                          </Form.Group>
                                    </Col>
      
                                    <Col sm={6} md={4} lg={3} className='mb-2'>
                                          <Form.Group controlId="cotization_type" >
                                                <Form.Label className='mb-0'>Tipo</Form.Label>
                                                <Dropdown className='rounded' onSelect={handleTypeChange}>
                                                      <Dropdown.Toggle className='py-0 px-1 rounded w-full bg-white d-flex justify-content-between align-items-center' variant='outline-dark' id="product-name-dropdown">
                                                            {(type !== "") ? type : "Tipo de Producto"}
                                                      </Dropdown.Toggle>
                                                      <Dropdown.Menu
                                                            align="start"
                                                            onChange={(e) => setType(e.target.value)}
                                                            style={{maxHeight: '300px', overflowY: 'auto'}}
                                                            popperConfig={{ modifiers: [{name: 'offset', options: {offset: [0, -150]}}], }}
                                                      >
                                                            <Dropdown.Header>Tipo de producto</Dropdown.Header>
                                                            {cotizationTypes?.map((type) => (
                                                                  <Dropdown.Item key={type.id} eventKey={type.name}>
                                                                        {type.name}
                                                                  </Dropdown.Item>
                                                            ))}
                                                      </Dropdown.Menu>
                                                </Dropdown>
                                          </Form.Group>
                                    </Col>
      
                                    <Col sm={6} md={4} lg={3} className='mb-2'>
                                          <Form.Group controlId="cotization_type" >
                                                <Form.Label className='mb-0'>Cantidad</Form.Label>
                                                <Form.Control
                                                      type="number"
                                                      placeholder="Cantidad"
                                                      value={amount}
                                                      required
                                                      onChange={(e) => setAmount(e.target.value)}
                                                      className='py-0 px-1 rounded'
                                                      style={{border: '1px solid #343a40'}}
                                                />
                                          </Form.Group>
                                    </Col>
      
                                    <Col sm={6} md={4} lg={3} className='mb-2'>
                                          <Form.Group controlId="unit_of_measure" >
                                                <Form.Label className='mb-0'>Unidad</Form.Label>
                                                <Dropdown className='rounded' onSelect={handleUnitOfMeasureChange}>
                                                      <Dropdown.Toggle className='py-0 px-1 rounded w-full bg-white d-flex justify-content-between align-items-center' variant='outline-dark' id="product-name-dropdown">
                                                            {(unitOfMeasure !== "") ? unitOfMeasure : "Unidad"}
                                                      </Dropdown.Toggle>
                                                      <Dropdown.Menu
                                                            align="start"
                                                            onChange={(e) => setUnitOfMeasure(e.target.value)}
                                                            style={{maxHeight: '300px', overflowY: 'auto'}}
                                                            popperConfig={{modifiers: [{ name: 'offset', options: {offset: [0, -150]}, }],}}
                                                      >
                                                            <Dropdown.Header>Unidad</Dropdown.Header>
                                                            {unitsOfMeasure?.map((unit) => (
                                                                  <Dropdown.Item key={unit.id} eventKey={unit.name}>
                                                                        {unit.name}
                                                                  </Dropdown.Item>
                                                            ))}
                                                      </Dropdown.Menu>
                                                </Dropdown>
                                          </Form.Group>
                                    </Col>
      
                                    <Col sm={6} md={4} lg={3} className='mb-2 d-flex flex-column ml-auto'>
                                          <Form.Group controlId="submit" className='mt-auto'>
                                                <button type="submit" className="w-full py-1 text-white bg-black rounded-md hover:bg-gray-400">
                                                            Hacer Cotización  
                                                </button>
                                          </Form.Group>
                                    </Col>
                              
                        </Row>
                        {
                              productOptionsError !== '' ? (
                                    <p className='text-red-400'>{productOptionsError}</p>
                              ) : (null)  
                        }
                        </Form>
                        : <Container>
                              <Row>
                                    <Col className='flex flex-col align-items-center'>
                                          <h1 className='text-green-500'>Registrese gratis para cotizar productos</h1>
                                          <button onClick={handleButtonClick} className="text-white w-48 my-2 p-2 rounded-xl" style={buttonStyle3} onMouseEnter={(e) => buttonOnHover3(e)} onMouseLeave={(e) => buttonOffHover3(e)}>
                                                Registrarse gratis
                                          </button>
                                    </Col>
                              </Row>
                        </Container>
                  }
                  
            </Container>
                  
            <Container className="mb-5">
                  {productCotizationResults.products ? (
                        <>
                        <h3 className='mb-4'>Resultados</h3>
                        <Row className="border-top py-3">
                        {productCotizationResults?.products?.map((product, i) => (
                              
                                    <Col key={i} xs={6} sm={4} md={3} className='mb-3'>
                                          <Card>
                                                <img src={`${BASE_URL}${product.product_instance.image}`}/>
                                                <Card.Body>
                                                      <h5>{product.product_instance.product.name}</h5>
                                                      <p>Compañia: {product.product_instance.company.company_name}</p>
                                                      <p>Cantidad cotizada: {}</p>
                                                      <h5>Costo: s/.{Number(product.cotization_price).toFixed(2).replace('/\d(?=(\d{3})+\.)/g', '$&,') }</h5>
                                                      <p>Cantidad disponible: {product.available_quantity}</p>
                                                      {/*BUTTON*/}
                                                      <div className='py-1 px-3 mt-3 w-fit text-center rounded-xl '
                                                            style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}
                                                      >
                                                            Chatear con un asesor
                                                      </div>
                                                </Card.Body>
                                               
                                          </Card>                                          
                                    </Col>
                                   
                        ))}
                        </Row>
                        </>
                  ) : null}

            </Container>


            </>
      )
}

export default CotizationScreen