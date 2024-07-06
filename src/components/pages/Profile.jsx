import { Box, Button, Grid, IconButton, Stack, Typography, colors } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import {  Edit, Logout } from '@mui/icons-material'
import { getToken, removeToken } from '../../services/LocalStorageServices'
import { useGetProfileQuery } from '../../services/UserAuthApi'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const token = getToken();
    const navigate = useNavigate();

    const handleLogout = ()=>{
        // setProfileData({
        //     name:'',
        //     age:'',
        //     mobile:'',
        //     address:'',
        //     aadharCardNumber:'',
        //     isvoted:null
        // })
        navigate('/');
        removeToken('token');
    }
    const [profileData,setProfileData] = useState({
        name:'',
        age:'',
        mobile:'',
        address:'',
        aadharCardNumber:'',
        isvoted:null
    })

    const {data , isSuccess} = useGetProfileQuery(token);
    
    useEffect(()=>{
        if(data && isSuccess){
            setProfileData({
                name: data.user.username,
                age:data.user.age,
                mobile:data.user.mobile,
                address:data.user.address,
                aadharCardNumber:data.user.aadharCardNumber,
                isvoted:data.user.isVoted
            })
        }
    },[data,isSuccess]);

  return (
    < >
      <Layout>
      <Box mt={5}>
        <Grid container gap={3}>
            <Grid xs={12} item textAlign={'center'}>
                <Typography variant='h2' color={'blue'}>
                    Profile
                </Typography>
            </Grid>
            <Grid display={'flex'} container alignItems={'center'} justifyContent={'center'} xs={12}  gap={2}>
            <Grid item xs={10} sm={5} display={'flex'} textAlign={'center'} alignItems={'center'} boxShadow={3} p={3} mt={3}>
                Name: { profileData?.name }
            </Grid>
            <Grid item xs={10} sm={5} display={'flex'} textAlign={'center'} alignItems={'center'} boxShadow={3} p={3} mt={3}>
                Age: {profileData?.age}
            </Grid>

            <Grid item xs={10} sm={5} display={'flex'} textAlign={'center'} alignItems={'center'} boxShadow={3} p={3} mt={3}>
                Mobile: {profileData?.mobile}
            </Grid>

            <Grid item xs={10} sm={5} display={'flex'} textAlign={'center'} alignItems={'center'} boxShadow={3} p={3} mt={3}>
                Address: {profileData?.address}
            </Grid>

            <Grid item xs={10} sm={5} display={'flex'} textAlign={'center'} alignItems={'center'} boxShadow={3} p={3} mt={3}>
                Aadhar Card Number: {profileData?.aadharCardNumber}
            </Grid>

            <Grid item xs={10} sm={5} display={'flex'} textAlign={'center'} alignItems={'center'} boxShadow={3} p={3} mt={3}>
                Is Voted: { profileData?.isvoted?"Voted" : "Not Voted" }
            </Grid>
            </Grid>

            
        </Grid>
        <Box textAlign={'center'} mt={10} > 
                <Button endIcon={<Edit />} variant='contained'> Update Record</Button>
                <Button endIcon={<Logout /> } onClick={handleLogout}  variant='contained' sx={{color:'white',bgcolor:'red' , ml:3}} > Log out</Button>
            </Box>
      </Box>
      </Layout>
    </>
  )
}

export default Profile
