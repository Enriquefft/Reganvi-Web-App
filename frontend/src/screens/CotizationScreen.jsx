import { Container, Row, Col, Button, Card, Form, Dropdown } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProductOptions, productCotization } from '../reducers/productReducers';
import { mainBlue, mainGreen, mainPink, mainOrange, buttonStyle1, buttonOnHover1, buttonOffHover1, buttonStyle2, buttonOnHover2, buttonOffHover2 } from '../utils';


import { cotizationTypes, unitsOfMeasure } from '../utils'

function CotizationScreen({ productOptions, userInfo}) {
      const dispatch = useDispatch();

      const [productNames, setProductNames] = useState([])
      const [industries, setIndustries] = useState([])

      const [productCotizationResults, setProductCotizationResults] = useState([])

      const [productName, setProductName] = useState('')
      const [type, setType] = useState('')
      const [amount, setAmount] = useState('')
      const [unitOfMeasure, setUnitOfMeasure] = useState('')
      const [industry, setIndustry] = useState('')

      const [productNameIsValid, setProductNameIsValid] = useState(false)
      const [typeIsValid, setTypeIsValid] = useState(false)
      const [unitOfMeasureIsValid, setUnitOfMeasureIsValid] = useState(false)
      const [industryIsValid, setIndustryIsValid] = useState(false)

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
      
      const handleIndustryChange = (selectedIndustry) => {
            setIndustry(selectedIndustry)
            setIndustryIsValid(true)
      }

      const handleCotization = (e) => {
            e.preventDefault()
            if(productNameIsValid && typeIsValid && unitOfMeasureIsValid && industryIsValid) {
                  dispatch(productCotization({ token:userInfo.token, product_name:productName, type:type, amount:amount, unit_of_measure:unitOfMeasure, industry:industry }))
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
                  setProductOptionsError("Select an option for all the categories.")
            }
      }

      useEffect(() => {
            dispatch(getProductOptions({ token:userInfo.token }))
            .then((result) => {
                  if (result.payload) {
                        setProductNames(productOptions.product_names)
                        setIndustries(productOptions.industries)
                  } else {
                        setProductOptionsError(result.error.message)
                  }
            })

      }, [userInfo.token])

      return (
            <>
            <Container className="my-5">
                  <Row className="mb-2">
                        <Col>
                              <h3>Cotiza tu pedido</h3>
                              <p>Nuestra base de datos está actualizada con los productos más reelevantes en su zona, seleccione los filtros para que usted pueda encontrar el producto que busca.</p>
                        </Col>
                  </Row>
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
                                                      style={{
                                                            maxHeight: '300px', 
                                                            overflowY: 'auto',
                                                      }}
                                                      popperConfig={{
                                                            modifiers: [{
                                                                        name: 'offset',
                                                                        options: {offset: [0, -150]},
                                                            }],
                                                      }}
                                                >
                                                      <Dropdown.Header>Producto</Dropdown.Header>
                                                      {productNames.map((product, i) => (
                                                            <Dropdown.Item key={i} eventKey={product}>
                                                                  {product}
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
                                                      style={{
                                                            maxHeight: '300px', 
                                                            overflowY: 'auto',
                                                      }}
                                                      popperConfig={{
                                                            modifiers: [{
                                                                        name: 'offset',
                                                                        options: {offset: [0, -150]},
                                                            }],
                                                      }}
                                                     
                                                >
                                                      <Dropdown.Header>Tipo de producto</Dropdown.Header>
                                                      {cotizationTypes.map((type) => (
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
                                                style={{
                                                      border: '1px solid #343a40', // Dark border color
                                                }}
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
                                                      style={{
                                                            maxHeight: '300px', 
                                                            overflowY: 'auto',
                                                      }}
                                                      popperConfig={{
                                                            modifiers: [{
                                                                        name: 'offset',
                                                                        options: {offset: [0, -150]},
                                                            }],
                                                      }}
                                                >
                                                      <Dropdown.Header>Unidad</Dropdown.Header>
                                                      {unitsOfMeasure.map((unit) => (
                                                            <Dropdown.Item key={unit.id} eventKey={unit.name}>
                                                                  {unit.name}
                                                            </Dropdown.Item>
                                                      ))}
                                                </Dropdown.Menu>
                                          </Dropdown>
                                    </Form.Group>
                              </Col>

                              <Col sm={6} md={4} lg={3} className='mb-2'>
                                    <Form.Group controlId="industry" >
                                          <Form.Label className='mb-0'>Industria</Form.Label>
                                          <Dropdown className='rounded' onSelect={handleIndustryChange}>
                                                <Dropdown.Toggle className='py-0 px-1 rounded w-full bg-white d-flex justify-content-between align-items-center' variant='outline-dark' id="industry-dropdown">
                                                      {(industry !== "") ? industry : "Industria"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu
                                                      align="start"
                                                      onChange={(e) => setIndustry(e.target.value)}
                                                      style={{
                                                            maxHeight: '300px', 
                                                            overflowY: 'auto',
                                                      }}
                                                      popperConfig={{
                                                            modifiers: [{
                                                                        name: 'offset',
                                                                        options: {offset: [0, -150]},
                                                            }],
                                                      }}
                                                >
                                                      <Dropdown.Header>Industria</Dropdown.Header>
                                                      {industries.map((industry, i) => (
                                                            <Dropdown.Item key={i} eventKey={industry}>
                                                                  {industry}
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
            </Container>
                  
            <Container className="mb-5">
                  {productCotizationResults.products ? (
                        <>
                        <h3 className='mb-4'>Resultados</h3>
                        {productCotizationResults.products.map((product, i) => (
                        <Row key={i} className="border-top py-3">
                              <Col xs={6}>
                                    <h5>{product.product_instance.product.name}</h5>
                                    <p>Company: {product.product_instance.company.company_name}</p>
                                    <p>RUC: {product.product_instance.company.RUC}</p>
                              </Col>
                              <Col xs={6} className="text-right">
                                    <h5>s/.{Number(product.cotization_price).toFixed(2).replace('/\d(?=(\d{3})+\.)/g', '$&,') }</h5>
                              </Col>
                              <Col xs={12} >
                                    <div className='p-1 w-48 text-center rounded-xl '
                                    style={buttonStyle1} onMouseEnter={(e) => buttonOnHover1(e)} onMouseLeave={(e) => buttonOffHover1(e)}
                                    >
                                          Chatear con un asesor
                                    </div>
                              </Col>
                        </Row>
                        ))}
                        </>
                  ) : null}

            </Container>


            </>
      )
}

export default CotizationScreen