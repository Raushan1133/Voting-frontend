import React, { memo, useEffect, useMemo, useReducer, useState } from 'react'
import Layout from '../Layout/Layout'
import BJP from '../../assets/images/bjp-png.png'
import { IconButton,Grid,Typography, Box, Button, Tooltip, Modal, TextField, Alert } from '@mui/material'
import { Add, Delete, DeleteForever, Remove } from '@mui/icons-material'
import { useAddCandidateMutation } from '../../services/UserAuthApi'
import { getToken } from '../../services/LocalStorageServices'
import { useGetCandidatesQuery } from '../../services/UserAuthApi'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../../features/userSlice'
import { useDeletecandidateMutation } from '../../services/UserAuthApi'
import { useUpdatecandidateMutation } from '../../services/UserAuthApi'

const AdminDashboard = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius:3,
    xs:{width:300}
  };
   
  const [addCandidate] = useAddCandidateMutation();
  const {data,isSuccess} = useGetCandidatesQuery();
  const [deleteCandidate] = useDeletecandidateMutation();
  const [updatecandidate] =useUpdatecandidateMutation();
  const [deletemodal , setdeleteModal] =useState(false);
  const [updateModal , setUpdateModal] = useState({
    status:false,
    id:null
  });

  const [candidates,setCandidates] = useState([]);
  const [error , setError] = useState({
    status:false,
    messege:'',
    type:''
  });
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

  const handleCandidateDelete = async (e)=>{
    let id= e.target.id;
    console.log( "Id: "+ id);
    const res = await deleteCandidate({candidateID:id});
    if(res.data.status === 'success'){
      setdeleteModal(true);
      setError({
        status:res.data.status,
        messege:res.data.messege,
        type:'success'
      })
    }

    if(res.data.status !== 'success'){
      setdeleteModal(true);
      setError({
        status:res.data.status,
        messege:res.data.messege,
        type:'error'
      })
    }

    console.log(res)
  }
  const handleCandidateAdd = async (e)=>{ 
    e.preventDefault();
    const age = calculateAge();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name:data.get("candidate_name"),
      party:data.get("party_name"),
      age: age
    }
    if(actualData.name && actualData.party && actualData.age){
      if(actualData.age<18){
        setError({status:true,messege:"Age must be 18 or above",type:'error'})
      }else{
        const token = getToken();
    const res = await addCandidate({user:actualData,token:token});
    setError({status:true,messege:"Candidate Added",type:'success'})
      }
    }else{
      setError({status:true,messege:"All fields are required",type:'error'})
    }
  }

  const handleUpdateCandidate =async (e)=>{
    e.preventDefault();
    const age = calculateAge();
    const updatedata = new FormData(e.currentTarget);
    const actualData = {
      name:updatedata.get("candidate_name"),
      party:updatedata.get("party_name"),
      age: age
    }
    if(actualData.name && actualData.party && actualData.age){
        if(actualData.age < 18){
          setError({status:true,messege:"Age must be 18 or above",type:'error'})
        }else{
          let id = updateModal.id;
          const res =await updatecandidate({updatedData:actualData,candidateID:id});
          if(res.data.status === 'success'){
            setError({status:true,messege:"Candidate info updated ",type:'success'})
          }
          if(res.data.status !== 'success'){
            setError({status:true,messege:res.data.messege  ,type:'success'})
          }
        }
    }else{
      setError({status:true,messege:"Please Enter a valid data to update",type:'error'})
    }
    // setUpdateModal(true)
  }

  // console.table("db data: ", data);
  // console.log("Local data",candidates);

  
  const [modal , setModal] =useState(false);

  useEffect(()=>{
    if(data && isSuccess){
      setCandidates(data);
    }
  },[data,isSuccess,candidates,handleCandidateAdd]);



  let i=1;
  return (
    <>
      <Layout>
        <Box component={'div'} sx={{xs:{px:20}}} mt={10} >
            {
              isSuccess ? data.candidate.map((candidate)=>(
                <Grid   container sx={{display:'flex',justifyContent:'space-between',alignItems:'center',sm:{justifyContent:'none'}}} >
            <Grid sm={7} xs={6} mt={3} item bgcolor={'white'} textAlign={'center'} display={'flex'} justifyContent={'space-between'} boxShadow={3}  borderRadius={3} p={2}><Typography textAlign={'center'} variant='h6'> {i++}. {candidate.name}</Typography>
              <img src={BJP} height={'50px'} alt="bjp" />
            </Grid>
            <Grid item sm={2} xs={1} display={'flex'} alignItems={'center'} justifyContent={'end'} ><Button variant='contained' size='small' sx={{ mt:2,fontWeight:'bold',bgcolor:'red',":hover":{bgcolor:'red'}}} onClick={handleCandidateDelete}  id={candidate._id} >Remove</Button></Grid>

            <Grid item sm={2} xs={1} display={'flex'} alignItems={'center'} justifyContent={'start'}><Button variant='contained'   size='small' sx={{ mt:2, fontWeight:'bold',bgcolor:'blue',":hover":{bgcolor:'red'}}} id={candidate._id} onClick={(e)=>{setUpdateModal({status:true,id:e.target.id})}} >Edit</Button></Grid>
            </Grid>
              )) : 'Loading ... '
            } 
        </Box>
        <Box textAlign={'center'}  mt={10}>
            <Button variant='contained' endIcon={<Add />} onClick={()=>{setModal(true)}}>
                Add Candidate
            </Button>
        </Box>
        {/* Add candidate Modal*/}
        <Modal open={modal} onClose= {()=>{setModal(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style} >
            <Box component={'form'} onSubmit={handleCandidateAdd}>
              <Typography variant='h6'>Please Enter a valid Candidate Info</Typography>
              <TextField margin='normal' fullWidth required label='Candidate Name' id='candidate_name' name='candidate_name' type='text'/>
              <TextField fullWidth required label='Party Name' id='party_name' name='party_name' margin='normal' type='text'/>

              <TextField type='date' fullWidth required  id='age' name='age' margin='normal' />
              <Box margin={'normal'} textAlign={'center'} >
                <Button type='submit' variant='contained'>Submit</Button>
              </Box>
              <Box mt={2}>
                  {error.status ? <Alert severity={error.type}>{error.messege}</Alert>:''}
                </Box>
            </Box>
          </Box>
        </Modal>

        {/* Delete modal */}
        <Modal open={deletemodal} onClose={()=>{setdeleteModal(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style} >
          <Box mt={2}>
          {error.status ? <Alert severity={error.type}>{error.messege}</Alert>:''}
          </Box>
          </Box>
        </Modal>

        {/* Update candidate Modal*/}
        <Modal open={updateModal.status} onClose={()=>{setUpdateModal({status:false}); setError({status:false})}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style} >
            <Box component={'form'} onSubmit={handleUpdateCandidate}>
              <Typography variant='h6'>Please Enter Update Info</Typography>
              {/* <small style={{marginTop:'5px',color:'red'}}>Note:Candidate DOB is required for confirmation</small> */}
              <TextField margin='normal' required fullWidth  label='Candidate Name' id='candidate_name' name='candidate_name' type='text'/>
              <TextField fullWidth required   label='Party Name' id='party_name' name='party_name' margin='normal' type='text'/>
              <TextField type='date' required fullWidth   id='age' name='age' margin='normal' />
              <Box margin={'normal'} textAlign={'center'} >
                <Button type='submit' variant='contained'>Submit</Button>
              </Box>
              <Box mt={2}>
                  {error.status ? <Alert severity={error.type}>{error.messege}</Alert>:''}
                </Box>
            </Box>
          </Box>
        </Modal>
      </Layout>
    </>
  )
}

export default AdminDashboard;
