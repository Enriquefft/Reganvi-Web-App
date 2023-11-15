import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, signup } from '../reducers/userReducers';
import { Container, Row, Col, Form, Card, Dropdown } from 'react-bootstrap';

import { countryCodes } from '../utils'

function UserSignup({ handleShowLogin }) {
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
                                          <h2 className="text-center mb-4">Signup</h2>
                                          <Form onSubmit={handleSignup} className='flex flex-col items-center ' >
                                                <Form.Group controlId="first_name" className='w-full'>
                                                      <Form.Label>First Name</Form.Label>
                                                      <Form.Control
                                                            type="first_name"
                                                            placeholder="Enter first name"
                                                            value={first_name}
                                                            onChange={(e) => setFirstName(e.target.value)}
                                                            className='rounded mb-3'
                                                      />
                                                </Form.Group>
                                                <Form.Group controlId="last_name" className='w-full'>
                                                      <Form.Label>Last Name</Form.Label>
                                                      <Form.Control
                                                            type="last_name"
                                                            placeholder="Enter last name"
                                                            value={last_name}
                                                            onChange={(e) => setLastName(e.target.value)}
                                                            className='rounded mb-3'
                                                      />
                                                </Form.Group>

                                                <Form.Group controlId="email" className='w-full'>
                                                      <Form.Label>Email Address <span className='text-red-400'>*</span></Form.Label>
                                                      <Form.Control
                                                            type="email"
                                                            placeholder="Enter email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                            className='rounded mb-3'
                                                      />
                                                </Form.Group>

                                                <Form.Group controlId="phone_number" className='w-full'>
                                                      <Form.Label>Phone Number <span className='text-red-400'>*</span></Form.Label>
                                                      <Row className='items-center mb-3'>
                                                            <Col xs={3} className='items-center'>
                                                                  <Dropdown className='rounded' onSelect={handleCountryCodeChange}>
                                                                        <Dropdown.Toggle className='rounded mx-0 w-20 bg-white ' variant='light' id="country-code-dropdown">
                                                                              {phone_number_code}
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu
                                                                              align="start"
                                                                              onChange={(e) => setPhoneNumberCode(e.target.value)}
                                                                              flip={false}
                                                                        >
                                                                              {countryCodes.map((country) => (
                                                                                    <Dropdown.Item key={country.code} eventKey={country.code}>
                                                                                    {country.code} - {country.name}
                                                                                    </Dropdown.Item>
                                                                              ))}
                                                                        </Dropdown.Menu>
                                                                  </Dropdown>
                                                            </Col>
                                                            <Col xs={9} >
                                                                  <Form.Control
                                                                        type="phone_number"
                                                                        placeholder="Enter phone number"
                                                                        value={phone_number}
                                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                                        required
                                                                        className='rounded mx-0'
                                                                  />
                                                            </Col>
                                                      </Row>
                                                </Form.Group>

                                                <Form.Group controlId="gender" className='w-full'> 
                                                      <Form.Label>Gender <span className='text-red-400'>*</span></Form.Label>
                                                      <Form.Select
                                                            value={gender}
                                                            onChange={(e) => setGender(e.target.value)}
                                                            required
                                                            className='rounded mb-3 w-full py-2 px-3 bg-gray-50'
                                                      >
                                                            <option value="">Select Gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                      </Form.Select>
                                                </Form.Group>

                                                <Form.Group controlId="password" className='w-full'>
                                                      <Form.Label>Password <span className='text-red-400'>*</span></Form.Label>
                                                      <Form.Control
                                                            type="password"
                                                            placeholder="Password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                            className='rounded mb-3'
                                                      
                                                      />
                                                </Form.Group>

                                                <Form.Group controlId="repeat_password" className='w-full'>
                                                      <Form.Label>Repeat Password <span className='text-red-400'>*</span></Form.Label>
                                                      <Form.Control
                                                            type="password"
                                                            placeholder="Repeat Password"
                                                            value={repeat_password}
                                                            onChange={(e) => setRepeatPassword(e.target.value)}
                                                            required
                                                            className='rounded mb-3'
                                                      
                                                      />
                                                </Form.Group>
                                                <button type="submit" className="m-2 w-32 p-2 text-white bg-green-600 rounded-xl hover:bg-gray-400">
                                                      Signup
                                                </button>
                                                
                                          </Form>
                                          {
                                                signupError !== '' ? (
                                                      <p className='text-red-400'>{signupError}</p>
                                                ) : (null)
                                          }
                                          <p>Already got an account? <button className='text-blue-400 mt-2 hover:text-black' onClick={handleShowLogin}>login</button></p>
                                          
                                    </Card.Body>
                              </Card>
                        </Col>
                  </Row>
            </Container>
      )
}

export default UserSignup