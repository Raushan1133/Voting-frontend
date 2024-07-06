import { TextField, Button, Box, Alert } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../services/UserAuthApi";
import { storeToken } from "../../services/LocalStorageServices";

const UserLogin = () => {
  const [error,setError]= useState({
    status:false,
    messege:"",
    type:""
});

  const [loginUser]= useLoginUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      aadharCardNumber:data.get('aadharCardNumber'),
      password:data.get('password')
    }


    if(actualData.aadharCardNumber && actualData.password){
      const res = await loginUser(actualData);
      if(!res.status){
        setError({status:true,messege:"Internal server Error" , type:"error"});
      }
        if(res.data.status === "success"){
          const token = res.data.token;
          storeToken(token);
          setError({status:true,messege:"Login Success , Redirecting To Dashboard",type:'success'});
            if(res.data.user.role === 'admin'){
              setTimeout(() => {
                navigate('/admindashboard');
              }, 2000);
            }else{
              setTimeout(() => {
                navigate('/dashboard');
              }, 2000);
            }
         
        }

        if(res.data.status === "failed"){
          setError({status:true,messege:res.data.messege,type:'error'});
        }
    }else{
      setError({status:true,messege:"Both Fields Are Required",type:'error'});
    }
  }

  return (
    <>
    <Box component='form' noValidate sx={{mt:1}} id="login-form" onSubmit={handleSubmit}>
        <TextField margin="normal" required fullWidth id="aadharCardNumber" name='aadharCardNumber' label='Aadhar Card Number' />

        <TextField required fullWidth id="password" name='password' label="Password" type="password" margin="normal"/>
        <Box textAlign='center'>
            <Button type="submit" variant='contained' sx={{mt:3, mb:2, px:5}}>Login</Button>
        </Box>
        <NavLink to='/sendpasswordresetemail'>Forgot Password</NavLink>
        {
            error.status ? <Alert severity={error.type} sx={{mt:4}}>{error.messege}</Alert> :''
        }
    </Box>
    </>
  )
}

export default UserLogin;
