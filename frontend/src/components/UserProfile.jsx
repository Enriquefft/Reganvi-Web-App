import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../reducers/userReducers';
import { Container, Row, Col, Form, Card, Dropdown } from 'react-bootstrap';
import { genderMapping } from '../utils';
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
            const genderValue = genderMapping[userInfo.user.gender];
            setGender(genderValue)
      }, [userInfo])

      const handleLogout = (e) => {
            e.preventDefault();
           
            dispatch(logout({ token:userInfo.token }));
      };

      const handleRefresh = (e) => {
            e.preventDefault();

            dispatch(login({ email:"", password:"", token:userInfo.token, expiry:userInfo.expiry }))
            .then((result) => {
                  if (result.payload) {
                        if (result.payload.error) {
                              setLoginError(result.payload.error)
                        } 
                  } else {
                        setLoginError(result.error.message)
                  }
            })
            
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
                                                <h2 className="text-2xl font-semibold my-4 flex align-items-center">
                                                      Tu perfil
                                                      {
                                                                  userInfo.loading == true ? (
                                                                        <img
                                                                              src="/ring_black.svg"
                                                                              alt="Loading..."
                                                                              className="w-6 h-auto ml-2"
                                                                        />
                                                                  ) : (
                                                                        <button onClick={(e) => {handleRefresh(e)}} className='ml-2'>
                                                                              <img
                                                                                    src="/reload_icon.png"
                                                                                    alt="Reload"
                                                                                    className="w-4 h-auto"
                                                                              />
                                                                        </button>
                                                                  )
                                                            }
                                                </h2>
                                                
                                                <Form className='flex flex-col items-start text-start  ' id="userProfileForm" disabled readOnly onSubmit={(e) => {e.preventDefault()}} >
                                                      <Form.Group controlId="first_name" className='w-full '>
                                                            <Form.Label>Primer Nombre</Form.Label>
                                                            <Form.Control
                                                                  type="first_name"
                                                                  value={userInfo.loading == true ? (""):(userInfo.user.first_name)}
                                                                  className='rounded mb-3'
                                                                  readOnly
                                                            />
                                                      </Form.Group>
                                                      <Form.Group controlId="last_name" className='w-full'>
                                                            <Form.Label>Apellido</Form.Label>
                                                            <Form.Control
                                                                  type="last_name"
                                                                  value={userInfo.loading == true ? (""):(userInfo.user.last_name)}
                                                                  className='rounded mb-3'
                                                                  readOnly
                                                            />
                                                      </Form.Group>

                                                      <Form.Group controlId="gender" className='w-full'>
                                                            <Form.Label>Género</Form.Label>
                                                            <Form.Control
                                                                  type="gender"
                                                                  value={userInfo.loading == true ? (""):(gender)}
                                                                  className='rounded mb-3'
                                                                  readOnly
                                                            />
                                                      </Form.Group>

                                                      <Form.Group controlId="phone_number" className='w-full'>
                                                                  
                                                                  <Form.Label>Número de Teléfono</Form.Label>
                                                                  <Row className='items-center mb-3'>
                                                                        <Col xs={3} className='pr-0'> 
                                                                              <Form.Control type="phone_number" value={userInfo.loading == true ? (""):(phone_number_code)} className='mx-0' readOnly style={{borderRadius: '4px 0 0 4px', borderTop: '1px solid #ced4da', borderLeft: '1px solid #ced4da', borderBottom: '1px solid #ced4da', borderRight: '0' }}/>
                                                                        </Col>
                                                                        <Col xs={9} className='pl-0'>
                                                                              <Form.Control type="phone_number" value={userInfo.loading == true ? (""):(phone_number)} className='mx-0' readOnly style={{borderRadius: '0 4px 4px 0'}}/>
                                                                        </Col> 
                                                                  </Row>
                                                            </Form.Group>

                                                      <Form.Group controlId="email" className='w-full'>
                                                            <Form.Label>Correo Electrónico</Form.Label>
                                                            <Form.Control
                                                                  type="email"
                                                                  value={userInfo.loading == true ? (""):(userInfo.user.email)}
                                                                  className='rounded mb-3'
                                                                  readOnly
                                                            />
                                                      </Form.Group>

                                                      

                                                      <div className="flex flex-wrap mt-2">
                                                            <button className="m-2 w-32 p-2 text-black border-2 rounded-xl bg-white  hover:text-gray-400" onClick={() => {handleShowEditForm(false)}} >
                                                                  Editar Perfil
                                                            </button>  
                                                            <button className="m-2 w-32 p-2 text-white bg-red-600 rounded-xl hover:bg-gray-400" onClick={handleLogout} >
                                                                  Cerrar Sesión
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