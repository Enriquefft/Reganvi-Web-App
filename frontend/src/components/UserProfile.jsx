import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/userReducers';
import { Container, Row, Col, Form, Card, Dropdown } from 'react-bootstrap';

function UserProfile( {userInfo, handleShowEditForm} ) {
      const dispatch = useDispatch()

      const [gender, setGender] = useState('')
      const [phone_number_code, setPhoneNumberCode] = useState('')
      const [phone_number, setPhoneNumber] = useState('')

      useEffect(() => {
            const raw_phone_number = userInfo.user.phone_number
            const phone_number_code = raw_phone_number.substring(0, raw_phone_number.length - 9)
            const phone_number_main = raw_phone_number.slice(-9)
            setPhoneNumberCode(phone_number_code)
            setPhoneNumber(phone_number_main)
            const genderMapping = {
                  1: 'male',
                  2: 'female',
                  0: 'other',
                  }
            const genderValue = genderMapping[userInfo.user.gender];
            setGender(genderValue)
      }, [userInfo])

      const handleLogout = (e) => {
            e.preventDefault();
           
            dispatch(logout({ token:userInfo.token }));
      };

      return (
            <Container fluid className="d-flex align-items-center justify-content-center">
                  <Card className="bg-light w-70 my-5" style={{ borderRadius: '15px' }}>
                        <Card.Body className="p-4 ">
                              <Row>
                                    <Col xs={12} md={5} className="flex items-start justify-center pb-3 pb-md-0">
                                          <img
                                                src={userInfo.user.profile_image}
                                                alt="Profile"
                                                className="w-80 h-auto rounded-2xl border border-gray-600"
                                          />
                                    </Col>
                                    <Col xs={12} md={7} className="text-center mx-sm-3 mx-md-0">
                                          <div className="flex flex-col items-start justify-top h-full">
                                                <h2 className="text-2xl font-semibold my-4">
                                                      Your Profile
                                                </h2>
                                                
                                                <Form className='flex flex-col items-start text-start  ' >
                                                      <Form.Group controlId="first_name" className='w-full '>
                                                            <Form.Label>First Name</Form.Label>
                                                            <Form.Control
                                                                  type="first_name"
                                                                  value={userInfo.user.first_name}
                                                                  className='rounded mb-3'
                                                                  readOnly
                                                            />
                                                      </Form.Group>
                                                      <Form.Group controlId="last_name" className='w-full'>
                                                            <Form.Label>Last Name</Form.Label>
                                                            <Form.Control
                                                                  type="last_name"
                                                                  value={userInfo.user.last_name}
                                                                  className='rounded mb-3'
                                                                  readOnly
                                                            />
                                                      </Form.Group>

                                                      <Form.Group controlId="gender" className='w-full'>
                                                            <Form.Label>Gender</Form.Label>
                                                            <Form.Control
                                                                  type="gender"
                                                                  value={gender}
                                                                  className='rounded mb-3'
                                                                  readOnly
                                                            />
                                                      </Form.Group>

                                                      <Form.Group controlId="phone_number" className='w-full'>
                                                            
                                                            <Form.Label>Phone Number</Form.Label>
                                                            <Row className='items-center mb-3'>
                                                                  <Col xs={3} className='items-center'> 
                                                                        <Dropdown className='rounded text-center bg-gray-200 py-2' disabled>
                                                                                    {phone_number_code}
                                                                            
                                                                        </Dropdown>
                                                                  </Col>
                                                                  <Col xs={9} >
                                                                        <Form.Control
                                                                              type="phone_number"
                                                                              value={phone_number}
                                                                              className='rounded mx-0'
                                                                              readOnly
                                                                        />
                                                                  </Col>
                                                            </Row>
                                                      </Form.Group>

                                                      <Form.Group controlId="email" className='w-full'>
                                                            <Form.Label>Email Address</Form.Label>
                                                            <Form.Control
                                                                  type="email"
                                                                  value={userInfo.user.email}
                                                                  className='rounded mb-3'
                                                                  readOnly
                                                            />
                                                      </Form.Group>

                                                      

                                                      <div className="flex flex-wrap mt-2">
                                                            <button className="m-2 w-32 p-2 text-black border-2 rounded-xl bg-white  hover:text-gray-400" onClick={() => {handleShowEditForm(false)}} >
                                                                  Edit Profile
                                                            </button>  
                                                            <button className="m-2 w-32 p-2 text-white bg-red-600 rounded-xl hover:bg-gray-400" onClick={handleLogout} >
                                                                  Logout
                                                            </button>
                                                                              
                                                      </div>
                                                </Form>
                              
                                          </div>
                                    </Col>
                              </Row>
                        </Card.Body>
                  </Card>
            </Container>
      )
}

export default UserProfile