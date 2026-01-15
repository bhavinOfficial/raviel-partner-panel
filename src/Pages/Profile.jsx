import { Container } from '@mui/material'
import React from 'react'
import SeeProfile from '../Components/Profile/SeeProfile'

const Profile = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ maxWidth: "1400px", fontFamily: "Inter" }}
      >
        <SeeProfile />  
      </Container> 
    </>
  )
}

export default Profile
