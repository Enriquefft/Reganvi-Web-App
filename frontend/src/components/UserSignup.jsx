import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, signup } from '../reducers/userReducers';
import { Container, Row, Col, Form, Card, Dropdown } from 'react-bootstrap';

import { countryCodes, genderMapping } from '../utils'

function UserSignup({ userInfo, handleShowLogin }) {
      const dispatch = useDispatch();

      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      
      const [first_name, setFirstName] = useState('')
      const [last_name, setLastName] = useState('')
      const [gender, setGender] = useState('')
      const [phone_number_code, setPhoneNumberCode] = useState('')
      const [phone_number, setPhoneNumber] = useState('')
      const [repeat_password, setRepeatPassword] = useState('')

      const [signupError, setSignupError] = useState('')

      const handleSignup = (e) => {
            e.preventDefault();
            if(password === repeat_password) {
                  dispatch(signup({ first_name, last_name, email, phone_number:phone_number_code+phone_number, gender, password }))
                  .then((result) => {
                        if (result.payload) {
                              dispatch(login({ email, password, token:null, expiry:null }))
                              .then((result) => {
                                    setFirstName('')
                                    setLastName('')
                                    setEmail('')
                                    setPhoneNumberCode('')
                                    setPhoneNumber('')
                                    setGender('')
                                    setPassword('')
                                    setRepeatPassword('')
                                    setShowLogin(!showLogin)
                                    setSignupError('')
                              })
                        } else {
                              setSignupError(result.error.message)
                        }
                  })
            } else {
                  setSignupError('Passwords do not match')
            }
            
      };

      const handleCountryCodeChange = (selectedCode) => {
            setPhoneNumberCode(selectedCode);
      };



      return (
            <Container>
                  <Row className="justify-content-center py-20">
                        <Col xs={12} sm={8} md={6}>
                              <Card className='py-3' style={{ borderRadius: '15px' }}>
                                    <Card.Body className='flex flex-col items-center ' >
                                          <h2 className="text-center mb-4">Regístrese</h2>
                                          <Form onSubmit={handleSignup} className='flex flex-col items-center  w-3/4' >
                                                <Form.Group controlId="first_name" className='w-full'>
                                                      <Form.Label>Primer Nombre</Form.Label>
                                                      <Form.Control
                                                            type="first_name"
                                                            placeholder="Ingrese su primer nombre"
                                                            value={first_name}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                            className='rounded mb-3 border'
                                                      />
                                                </Form.Group>
                                                <Form.Group controlId="last_name" className='w-full'>
                                                      <Form.Label>Apellido</Form.Label>
                                                      <Form.Control
                                                            type="last_name"
                                                            placeholder="Ingrese su apellido"
                                                            value={last_name}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            className='rounded mb-3 border'
                                                      />
                                                </Form.Group>

                                                <Form.Group controlId="email" className='w-full'>
                                                      <Form.Label>Correo Electrónico <span className='text-red-400'>*</span></Form.Label>
                                                      <Form.Control
                                                            type="email"
                                                            placeholder="Ingrese su correo electrónico"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                            className='rounded mb-3 border'
                                                      />
                                                </Form.Group>

                                                <Form.Group controlId="phone_number" className='w-full'>
                                                      <Form.Label>Número de Teléfono <span className='text-red-400'>*</span></Form.Label>
                                                      <Row className='items-center mb-3'>
                                                            <Col xs={3} className='items-center pr-0'>
                                                                  <Dropdown className='rounded' onSelect={handleCountryCodeChange}>
                                                                        <Dropdown.Toggle className='w-full bg-white d-flex justify-content-between align-items-center ' variant='light' id="country-code-dropdown"
                                                                        style={{
                                                                              borderRadius: '4px 0 0 4px', // Adjust the border-radius as needed
                                                                              borderTop: '1px solid #dee2e6',
                                                                              borderLeft: '1px solid #dee2e6',
                                                                              borderBottom: '1px solid #dee2e6',
                                                                              borderRight: '0',
                                                                            }}
                                                                        
                                                                        >
                                                                              {(phone_number_code !== "") ? phone_number_code : (<div className="text-gray-500">-</div>)}
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu
                                                                              align="start"
                                                                              onChange={(e) => handleCountryCodeChange(e.target.value)}
                                                                              style={{ maxHeight: '300px', overflowY: 'auto', }}
                                                                              popperConfig={{ modifiers: [{ name: 'offset', options: {offset: [0, -150]}, }], }} 
                                                                        >
                                                                              {countryCodes.map((country) => (
                                                                                    <Dropdown.Item key={country.code} eventKey={country.code}>
                                                                                    {country.code} - {country.name}
                                                                                    </Dropdown.Item>
                                                                              ))}
                                                                        </Dropdown.Menu>
                                                                  </Dropdown>
                                                            </Col>
                                                            <Col xs={9} className='pl-0'>
                                                                  <Form.Control
                                                                        type="phone_number"
                                                                        placeholder="Ingrese su número de teléfono"
                                                                        value={phone_number}
                                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                                        required
                                                                        className='mx-0 border'
                                                                        style={{borderRadius: '0 4px 4px 0', }}
                                                                  />
                                                            </Col>
                                                      </Row>
                                                </Form.Group>

                                                <Form.Group controlId="gender" className='w-full'> 
                                                      <Form.Label>Género <span className='text-red-400'>*</span></Form.Label>
                                                      <Dropdown className='rounded mb-3' onSelect={setGender} required>
                                                            <Dropdown.Toggle className='rounded w-full bg-white border d-flex justify-content-between align-items-center' variant='light' id="gender-dropdown">
                                                                  {(gender !== "") ? gender : (<div className="text-gray-500">Seleccione su género</div>)}
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu
                                                                  align="start"
                                                                  onChange={(e) => setGender(e.target.value)}
                                                                  style={{ maxHeight: '300px', overflowY: 'auto', }}
                                                                  popperConfig={{ modifiers: [{ name: 'offset', options: {offset: [50, -100]} }], }}
                                                            >
                                                                  <Dropdown.Header>Género</Dropdown.Header>
                                                                  {Object.keys(genderMapping).map((key) => (
                                                                        <Dropdown.Item key={key} eventKey={genderMapping[key]}>
                                                                              {genderMapping[key]}
                                                                        </Dropdown.Item>
                                                                  ))}
                                                            </Dropdown.Menu>
                                                      </Dropdown>       
                                                </Form.Group>

                                                <Form.Group controlId="password" className='w-full'>
                                                      <Form.Label>Contraseña <span className='text-red-400'>*</span></Form.Label>
                                                      <Form.Control
                                                            type="password"
                                                            placeholder="Ingrese su contraseña"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                            className='rounded mb-3 border'
                                                      
                                                      />
                                                </Form.Group>

                                                <Form.Group controlId="repeat_password" className='w-full'>
                                                      <Form.Label>Repetir Contraseña <span className='text-red-400'>*</span></Form.Label>
                                                      <Form.Control
                                                            type="password"
                                                            placeholder="Repita su contraseña"
                                                            value={repeat_password}
                                                            onChange={(e) => setRepeatPassword(e.target.value)}
                                                            required
                                                            className='rounded mb-3 border'
                                                      
                                                      />
                                                </Form.Group>
                                                {
                                                      userInfo.loading == true ? (
                                                            <img
                                                                  src="/ring_black.svg"
                                                                  alt="Loading..."
                                                                  className="max-h-32 "
                                                            />
                                                      ) : (
                                                            <button type="submit" className="m-2 w-32 p-2 text-white bg-green-600 rounded-xl hover:bg-gray-400">
                                                                  Registrarme
                                                            </button>
                                                      )
                                                }
                                                
                                          </Form>
                                          {
                                                signupError !== '' ? (
                                                      <p className='text-red-400'>{signupError}</p>
                                                ) : (null)
                                          }
                                          <p>¿Ya tiene una cuenta? <button className='text-blue-400 mt-2 hover:text-black' onClick={handleShowLogin}>Inicie sesión</button></p>
                                          
                                    </Card.Body>
                              </Card>
                        </Col>
                  </Row>
            </Container>
      )
}

export default UserSignup