import {useState} from 'react'
import { TextField, Button, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { useRegisterUserMutation } from '../../services/UserAuthApi';
import { storeToken } from '../../services/LocalStorageServices';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [error,setError]= useState({
    status:false,
    messege:"",
    type:""
});

const [registerUser] = useRegisterUserMutation();
const naviagte = useNavigate();

const handleSubmit =async (e)=>{

  e.preventDefault();
  function calculateAge() {
    // Get the value from the input field
    const dob = document.getElementById('age').value;

    // Parse the date of birth
    const dobDate = new Date(dob);
    const now = new Date();

    // Calculate the difference in years, months, and days
    let years = now.getFullYear() - dobDate.getFullYear();
    let months = now.getMonth() - dobDate.getMonth();
    let days = now.getDate() - dobDate.getDate();

    // Adjust for cases where the current month/day is before the birth month/day
    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // Display the result
    return years;
}


  const age = calculateAge();

  const data = new FormData(e.currentTarget);
  const actualData = {
    username:data.get('username'),
    age:age,
    mobile:data.get('mobile'),
    address:data.get('address'),
    aadharCardNumber: data.get('aadharCardNumber'),
    password: data.get('password'),
    tc: data.get('tc')
  };

  if(actualData.username && actualData.age && actualData.mobile && actualData.address && actualData.aadharCardNumber && actualData.password && actualData.tc){
    if(actualData.mobile.length !== 10){
      setError({status:true,messege:"Invalid Mobile Number",type:'error'});
    }else{
      if(actualData.aadharCardNumber.length !==12){
        setError({status:true,messege:"Invalid Aadhar Card Number",type:'error'});
      }else{
        if(actualData.password.length < 8){
          setError({status:true,messege:"Password Must contain atleast 8 digits or numbers",type:'error'});
        }else{
          if(actualData.age < 18){
            setError({status:true,messege:"Age Must Be 18 Or Above",type:'error'});

          }else{
            // Yaha Kaam karna hai
            const res = await registerUser(actualData);
            if(!res.status){
              setError({status:true,messege:"Internal server Error" , type:"error"});
              // return;
            }
            if(res.data.status === "success"){
              const token=res.data.token;
              storeToken(token);

              setError({status:true,messege:"Successfully Registered",type:'success'});
              setTimeout(() => {
                naviagte('/dashboard');
              }, 2000);
            }

            if(res.data.status === 'failed'){
              setError({status:true,messege:res.data.messege,type:'error'});
            }

          }
        }
      }
    }
  }else{
    setError({status:true,messege:"All fields are required",type:'error'});
  }

}

  return (
    <div>
      <Box component='form' noValidate sx={{mt:1}} id="registration-form" onSubmit={handleSubmit}>
      <TextField required fullWidth id="username" name='username' label="Name" type="text" margin="normal"/>
        <TextField margin="normal" required fullWidth id="age" name='age' label=''type='date' />
        <TextField required fullWidth id="mobile" name='mobile' label="Mobile" type="number" margin="normal"/>
        <TextField required fullWidth id="address" name='address' label="Address" type="text" margin="normal"/>
        <TextField required fullWidth id="aadharCardNumber" name='aadharCardNumber' label="Aadhar Card Number" type="number" margin="normal"/>
        <TextField required fullWidth id="password" name='password' label="Password" type="password" margin="normal"/>
        <FormControlLabel control={<Checkbox value={true} color='primary' name='tc' id='tc' />} label="I agree to term and condition."/> 
        <Box textAlign='center'>
            <Button type="submit" variant='contained' sx={{mt:3, mb:2, px:5}}>Register</Button>
        </Box>
        {
            error.status ? <Alert severity={error.type} closeText=''>{error.messege}</Alert> :''
        }
    </Box>
    </div>
  )
}

export default Registration
