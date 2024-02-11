import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from '../utils'

// Define an initial state that includes userInfo from localStorage if available
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {expiry:null,token:null,user:null}

const initialState = {
      userInfo: userInfoFromStorage,
      error: null,
}

// Create an async thunk for the login action
export const login = createAsyncThunk("userInfo/login", async ({ email, password, token, expiry }) => {
      try {
            if (token) {
                  // If a token is available, send a refresh request
                  const response = await fetch(`${BASE_URL}/api/users/refresh/`, {method: "GET", headers: {Authorization: `Token ${token}`,}})

                  if (!response.ok) {throw new Error("Refresh request failed")}

                  const refreshed = await response.json()
                  const data = {expiry:expiry, token:token, user:refreshed}
                  return data
            } else {
                  // If no token is available, send a login request with email and password
                  const formData = new FormData()
                  formData.append("email", email)
                  formData.append("password", password)

                  const response = await fetch(`${BASE_URL}/api/users/login/`, {method: "POST", body: formData})

                  if (!response.ok) {
                        const data = await response.json()
                        if (data.non_field_errors) throw new Error("Wrong credentials")
                        if (data.email) throw new Error("Invalid email")
                        throw new Error("Login failed")
                  }

                  const data = await response.json()
                  return data
            }
      } catch (error) {
            // Handle any errors here
            throw error;
      }
});

export const signup = createAsyncThunk("userInfo/signup", async ({ first_name, last_name, email, phone_number, gender, password }) => {
      try {
            const genderMapping = {
                  male: 1,
                  female: 2,
                  other: 0,
                };
            const lowercasedGender = gender.toLowerCase();
            const genderValue = genderMapping[lowercasedGender];

            const formData = new FormData();
            formData.append("first_name", first_name);
            formData.append("last_name", last_name);
            formData.append("email", email);
            formData.append("phone_number", phone_number);
            formData.append("gender", genderValue);  
            formData.append("password", password);
        
            const response = await fetch(`${BASE_URL}/api/users/register/`, {
                  method: "POST",
                  body: formData,
            })

            const data = await response.json()

            if (response.status === 201) {
                  return data
                }

            if (!response.ok) {
                  if (data.email) throw new Error("User with that email already exists")
                  if (data.phone_number) { 
                        if(data.phone_number[0] === "The phone number entered is not valid.") throw new Error("The phone number entered is not valid")
                        throw new Error("User with that phone number already exists")
                  } 
                  throw new Error("Error creating user")
            }

          
      } catch (error) {
            // Handle any errors here
            throw error;
      }
});

export const update = createAsyncThunk("userInfo/update", async ({ id, first_name, last_name, email, phone_number, gender, password, token }) => {
      try {
            const genderMapping = {
                  male: 1,
                  female: 2,
                  other: 0,
                };
            const lowercasedGender = gender.toLowerCase();
            const genderValue = genderMapping[lowercasedGender];

            const formData = new FormData();
            formData.append("first_name", first_name);
            formData.append("last_name", last_name);
            formData.append("email", email);
            formData.append("phone_number", phone_number);
            formData.append("gender", genderValue);  
            formData.append("password", password);
        
            const response = await fetch(`${BASE_URL}/api/users/update/${id}/`, {
                  method: "PUT",
                  headers: {Authorization: `Token ${token}`},
                  body: formData,
            })

            const data = await response.json()

            if(!response.ok) {
                  if (data.email) {
                        if (data.email[0] === "CustomUser with this email already exists.") throw new Error("User with that email already exists")
                        throw new Error("Invalid email address")
                  }
                  if (data.phone_number) { 
                        if(data.phone_number[0] === "The phone number entered is not valid.") throw new Error("The phone number entered is not valid")
                        throw new Error("User with that phone number already exists")
                  } 
                  throw new Error("Error updating user")
            }

            return data
          
      } catch (error) {
            // Handle any errors here
            throw error;
      }
});

export const imageUpdate = createAsyncThunk("userInfo/imageUpdate", async ({ id, email, gender, profile_image, token }) => {
      try {       
            const formData = new FormData();
            formData.append("email", email);
            formData.append("gender", gender);  
            formData.append("profile_image", profile_image);
           
            const response = await fetch(`${BASE_URL}/api/users/update/${id}/`, {
                  method: "PUT",
                  headers: { Authorization: `Token ${token}` },
                  body: formData,
            });
      
            const data = await response.json()
      
            if (!response.ok) {
                  // Handle error responses as needed
                  throw new Error("Error updating profile image")
            }
      
            return data

      } catch (error) {
      // Handle any errors here
            throw error;
      }
});
    


export const logout = createAsyncThunk("userInfo/logout", async ({ token }) => {
      try {            
            const response = await fetch(`${BASE_URL}/api/users/logout/`, {method: "POST", headers: {Authorization: `Token ${token}`,}})
            
            if (response.status === 204) {
                  // Return a resolved promise with the desired result
                  return null;
                }

            if (!response.ok && response.stats !== 204) {throw new Error("Logout request failed")}

            const data = await response.json()
            return data

      } catch (error) {
            // Handle any errors here
            throw error;
      }
});

// Create a userInfo slice
export const userInfoSlice = createSlice({
      name: "userInfo",
      initialState,
      reducers: {
            resetUserInfo: (state) => {
                  localStorage.removeItem("userInfo")
                  return {
                        ...state,
                        userInfo: {expiry:null,token:null,user:null, loading:false},
                        userChildren:{reservations:null,eventinscriptions:null, materialpurchases:null, chats_student:null, reviews:null, refundrequests:null, eventrefundrequests:null, loading:false},
                        error: null,
                  }

            }
      }, // Se puede añadir reducer de logout 
      extraReducers: (builder) => {
            builder
            .addCase(login.pending, (state, action) => {
                  return {
                        ...state, 
                        userInfo:{...state.userInfo, loading:true},
                  }
            })
            .addCase(login.fulfilled, (state, action) => {
                  localStorage.setItem("userInfo", JSON.stringify(action.payload))
                  return {
                        ...state, 
                        userInfo:{...action.payload, loading:false},
                  }
            })
            .addCase(login.rejected, (state, action) => {
                  return {
                        ...state, 
                        userInfo:{expiry:null,token:null,user:null, loading:false},
                        error: action.error.message,
                  }
            })
            .addCase(update.pending, (state, action) => {
                  return {
                        ...state, 
                        userInfo:{...state.userInfo, loading:true}
                  }
            })
            .addCase(update.fulfilled, (state, action) => {
                  const existingUserInfo = JSON.parse(localStorage.getItem("userInfo"))
                  existingUserInfo.user = action.payload
                  localStorage.setItem("userInfo", JSON.stringify(existingUserInfo))
                  return {
                        ...state, 
                        userInfo:{...state.userInfo, user:action.payload, loading:false}
                  }
            })
            .addCase(update.rejected, (state, action) => {
                  return {
                        ...state, 
                        userInfo:{...state.userInfo, loading:false}
                  }
            })
            .addCase(imageUpdate.pending, (state, action) => {
                  return {
                        ...state, 
                        userInfo:{...state.userInfo, loading:true}
                  }
            })
            .addCase(imageUpdate.fulfilled, (state, action) => {
                  const existingUserInfo = JSON.parse(localStorage.getItem("userInfo"))
                  existingUserInfo.user = action.payload
                  localStorage.setItem("userInfo", JSON.stringify(existingUserInfo))
                  return {
                        ...state, 
                        userInfo:{...state.userInfo, user:action.payload, loading:false}
                  }
            })
            .addCase(imageUpdate.rejected, (state, action) => {
                  return {
                        ...state, 
                        userInfo:{...state.userInfo, loading:false}
                  }
            })
            .addCase(logout.pending, (state, action) => {
                  return {
                        ...state,
                        userInfo: {...state.userInfo, loading:true},
                        userChildren:{...state.userChildren, loading:false},
                  }
            })
            .addCase(logout.fulfilled, (state, action) => {
                  localStorage.removeItem("userInfo");
                  return {
                        ...state,
                        userInfo: {expiry:null,token:null,user:null, loading:false},
                        error: null,
                  }
            })
            .addCase(logout.rejected, (state, action) => {
                  localStorage.removeItem("userInfo");
                  return {
                        ...state,
                        userInfo: {expiry:null,token:null,user:null, loading:false},
                        error: null,
                  }
            })
      },
});

export const { resetUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer
