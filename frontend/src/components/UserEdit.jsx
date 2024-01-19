import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { update, imageUpdate } from '../reducers/userReducers';
import { Container, Row, Col, Form, Card, Dropdown } from 'react-bootstrap';

import { countryCodes } from '../utils'

function UserEdit({ userInfo, handleShowEditForm }) {
      const dispatch = useDispatch()

      const [email, setEmail] = useState(userInfo.user.email)
      const [password, setPassword] = useState('')
      
      const [first_name, setFirstName] = useState(userInfo.user.first_name)
      const [last_name, setLastName] = useState(userInfo.user.last_name)
      const raw_phone_number = userInfo.user.phone_number
      const [phone_number_code, setPhoneNumberCode] = useState(raw_phone_number.substring(0, raw_phone_number.length - 9))
      const [phone_number, setPhoneNumber] = useState(raw_phone_number.substring(phone_number_code.length, raw_phone_number.length))
      const genderMapping = {
            1: 'male',
            2: 'female',
            0: 'other',
      }
      const [gender, setGender] = useState(genderMapping[userInfo.user.gender])

      const [repeat_password, setRepeatPassword] = useState('')
      
      const [updateError, setUpdateError] = useState('')
      

      const handleUpdate = () => {
            if(password == repeat_password) {
                  dispatch(update({ id:userInfo.user.id, first_name, last_name, email, phone_number:phone_number_code+phone_number, gender, password, token:userInfo.token }))
                  .then((result) => {
                        if (result.payload) {
                              handleShowEditForm()
                              setFirstName('')
                              setLastName('')
                              setEmail('')
                              setPhoneNumberCode('')
                              setPhoneNumber('')
                              setGender('')
                              setPassword('')
                              setRepeatPassword('')
                              setUpdateError('')
                        } else {
                              setUpdateError(result.error.message)
                        }
                  })
            } else {
                  setUpdateError('Passwords do not match')
            }
 
      }

      const handleCancel = () => {
            handleShowEditForm()
            setFirstName('')
            setLastName('')
            setEmail('')
            setPhoneNumberCode('')
            setPhoneNumber('')
            setGender('')
            setPassword('')
            setRepeatPassword('')
            setUpdateError('')
      }

      const fileInputRef = useRef(null);
      
      const handleImageClick = () => {
            fileInputRef.current.click(); // Trigger the file input click
      };
      
      const handleFileChange = (e) => {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                  dispatch(imageUpdate({ id:userInfo.user.id, email:userInfo.user.email, gender:userInfo.user.gender, profile_image:selectedFile, token:userInfo.token }));
            }
      };

      const handleCountryCodeChange = (selectedCode) => {
            setPhoneNumberCode(selectedCode);
      };
      const handleGenderChange = (selectedGender) => {
            setGender(selectedGender);
      };


      return (
            <Container fluid className="d-flex align-items-center justify-content-center">
                  <Card className="bg-light w-70 my-5" style={{ borderRadius: '15px' }}>
                        <Card.Body className="p-4 ">
                              <Row>
                                    <Col xs={12} md={5} className="flex items-start justify-center pb-3 pb-md-0">
                                          <div>
                                                <div className="relative group" onClick={handleImageClick}>
                                                      <img
                                                            src={userInfo.user.profile_image}
                                                            alt="Profile Image"
                                                            style={{ cursor: 'pointer' }}
                                                            className="w-80 h-auto rounded-2xl border-2 border-black"
                                                      />
                                                      <div className="hidden rounded-2xl absolute inset-0 bg-black bg-opacity-50 text-white justify-center items-center group-hover:flex">
                                                            <span className="text-2xl">Edit Image</span>
                                                      </div>
                                                </div>
                                                <input
                                                      type="file"
                                                      ref={fileInputRef}
                                                      accept="image/*"
                                                      style={{ display: 'none' }}
                                                      onChange={handleFileChange}
                                                />
                                          </div>
                                    </Col>
                                    <Col xs={12} md={7} className="text-center mx-sm-3 mx-md-0">
                                          <div className="flex flex-col items-start justify-top h-full">
                                                <h2 className="text-2xl font-semibold my-4">
                                                      Edit Profile
                                                </h2>
                                                <Form disabled readOnly onSubmit={(e) => {e.preventDefault(); handleUpdate()}} className='flex flex-col items-start text-start ' >
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

                                                      <Form.Group controlId="gender" className='w-full'> 
                                                                        <Form.Label>Género</Form.Label>
                                                                        <Dropdown className='' onSelect={handleGenderChange} >
                                                                              <Dropdown.Toggle  className='rounded w-full bg-white border border-gray d-flex justify-content-between align-items-center mb-3' variant='light' id="gender-dropdown">
                                                                                    {(gender !== "") ? gender : (<div className="text-gray-500">Seleccione su género</div>)}
                                                                              </Dropdown.Toggle>
                                                                              <Dropdown.Menu
                                                                                    align="start"
                                                                                    onChange={(e) => handleGenderChange(e.target.value)}
                                                                                    style={{
                                                                                          maxHeight: '300px',
                                                                                          overflowY: 'auto',
                                                                                    }}
                                                                                    popperConfig={{
                                                                                          modifiers: [{
                                                                                                      name: 'offset',
                                                                                                      options: {offset: [0, -100]},
                                                                                          }],
                                                                                    }}
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

                                                      <Form.Group controlId="phone_number" className='w-full'>
                                                            
                                                            <Form.Label>
                                                                  Número de Teléfono
                                                                  
                                                            </Form.Label>
                                                            <Row className='items-center mb-3'>
                                                                  <Col xs={3} className='items-center pr-0 '> 
                                                                  <Dropdown className='rounded' onSelect={handleCountryCodeChange}>
                                                                        <Dropdown.Toggle
                                                                              className=' w-full bg-white  d-flex justify-content-between align-items-center mx-0' 
                                                                              variant='light' 
                                                                              id="phone-number-code-dropdown"
                                                                              style={{
                                                                                    borderRadius: '8px 0 0 8px', // Adjust the border-radius as needed
                                                                                    borderTop: '1px solid #dee2e6',
                                                                                    borderLeft: '1px solid #dee2e6',
                                                                                    borderBottom: '1px solid #dee2e6',
                                                                                    borderRight: '0',
                                                                                  }}
                                                                      
                                                                        >
                                                                              {(phone_number_code !== "") ? phone_number_code : "-"}
                                                                        </Dropdown.Toggle>
                                                                        <Dropdown.Menu
                                                                              align="start"
                                                                              onChange={(e) => handleCountryCodeChange(e.target.value)}
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
                                                                              <Dropdown.Header>Prefijo telefónico </Dropdown.Header>
                                                                              {countryCodes.map((country) => (
                                                                                    <Dropdown.Item key={country.code} eventKey={country.code}>
                                                                                          {country.code}{"_".repeat(6 - country.code.length)}{country.name}
                                                                                    </Dropdown.Item>
                                                                              ))}
                                                                        </Dropdown.Menu>
                                                                  </Dropdown>  
                                                                  </Col>
                                                                  <Col xs={9} className='pl-0' >
                                                                        <Form.Control
                                                                              type="phone_number"
                                                                              placeholder="Ingrese su número de teléfono"
                                                                              value={phone_number}
                                                                              onChange={(e) => setPhoneNumber(e.target.value)}
                                                                              style={{
                                                                                    borderRadius: '0 8px 8px 0', // Adjust the border-radius as needed
                                                                                  }}
                                                                                  className='rounded-l-none mx-0 border'
                                                                              />
                                                                  </Col>
                                                            </Row>
                                                      </Form.Group>

                                                      <Form.Group controlId="email" className='w-full'>
                                                            <Form.Label>Email Address</Form.Label>
                                                            <Form.Control
                                                                  type="email"
                                                                  placeholder="Enter email"
                                                                  value={email}
                                                                  onChange={(e) => setEmail(e.target.value)}
                                                                  className='rounded mb-3'
                                                            />
                                                      </Form.Group>

                                                      <Form.Group controlId="password" className='w-full'>
                                                            <Form.Label>Change Password</Form.Label>
                                                            <Form.Control
                                                                  type="password"
                                                                  placeholder="Enter New Password"
                                                                  value={password}
                                                                  onChange={(e) => setPassword(e.target.value)}
                                                                  className='rounded mb-3'
                                                            
                                                            />
                                                      </Form.Group>

                                                      <Form.Group controlId="repeat_password" className='w-full'>
                                                            <Form.Label>Repeat New Password</Form.Label>
                                                            <Form.Control
                                                                  type="password"
                                                                  placeholder="Repeat New Password"
                                                                  value={repeat_password}
                                                                  onChange={(e) => setRepeatPassword(e.target.value)}
                                                                  className='rounded mb-3'
                                                            
                                                            />
                                                      </Form.Group>
                                                      <div className="flex flex-wrap mt-2">
                                                            <button type="submit" className="m-2 w-32 p-2 text-white bg-blue-600 rounded-xl hover:bg-gray-400" >
                                                                  Save
                                                            </button>
                                                            <button className="m-2 w-32 p-2 text-black border-2 rounded-xl bg-white  hover:text-gray-400" onClick={(e) => {e.preventDefault(); handleCancel()}} >
                                                                  Cancel
                                                            </button> 
                                                      </div>
                                                      {
                                                            updateError !== '' ? (
                                                                  <p className='text-red-400'>{updateError}</p>
                                                            ) : (null)
                                                      }
                                                      
                                                </Form>
                                                
                                          </div>
                                    </Col>
                              </Row>
                        </Card.Body>
                  </Card>
            </Container>
      )
}

export default UserEdit