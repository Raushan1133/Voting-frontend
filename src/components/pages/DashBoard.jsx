import {useEffect, useState} from 'react'
import Layout from '../Layout/Layout'
import { Box, Button, Grid, Toolbar, Typography,Drawer, Divider, Modal, Alert } from '@mui/material'
import BJP from '../../assets/images/bjp-png.png'
// import INC from '../../assets/images/inc-png.png'
// import AAP from '../../assets/images/AAP_Symbol.png'
// import BSP from '../../assets/images/BSP.png'
// import NPP from '../../assets/images/NPP.png'
// import CPI from '../../assets/images/cpi.png'
// import { NavLink } from 'react-router-dom'
import { useGetCandidatesQuery } from '../../services/UserAuthApi'
import { useVotingMutation } from '../../services/UserAuthApi'
import { getToken } from '../../services/LocalStorageServices'


const DashBoard = () => {
  const [ voting ] = useVotingMutation();
  const {data , isSuccess} =useGetCandidatesQuery();
  const [modal , setModal] =useState(false);
  const [alert,setAlert] = useState({
    messege:'',
    type:''
  });
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

  const handleVote = async (e)=>{
    const token = getToken();
    const id = e.target.id;
    const res = await voting({candidateID:id,token:token});
    setModal(true);
    setAlert({
      messege:res.data.messege,
      type:res.data.status
    });
  }

  let i=1;
  return (
    <Layout>
      <Box pt={5}>
      <Toolbar sx={{mt:2}}>
        <Grid container>
          {/* BJP */}
          
          {/* <Grid xs={12} item sx={{display:'flex',justifyContent:'space-between'}}>
          <Grid item bgcolor={'white'} textAlign={'center'} display={'flex'} justifyContent={'space-between'} boxShadow={3} xs={9} borderRadius={3} p={2}><Typography textAlign={'center'} variant='h6'>1. Bhartiya Janta Party (BJP)</Typography>
            <img src={BJP} height={'50px'} alt="bjp" />
          </Grid>
          <Grid xs={2} item><Button variant='contained' size='large' sx={{ mt:2, bgcolor:'red',color:'white',fontWeight:'bold'}}> vote </Button></Grid>
          </Grid> */}

          {
            isSuccess ?  data.candidate.map((candidate)=>(
              <Grid xs={12} item mt={3} sx={{display:'flex',justifyContent:'space-between' }}>
            <Grid item bgcolor={'white'} textAlign={'center'} display={'flex'} justifyContent={'space-between'} boxShadow={3} xs={9} borderRadius={3} p={2}><Typography textAlign={'center'} variant='h6'>{i++}.  {candidate.name}</Typography>
              <img src={BJP} height={'50px'} alt="bjp" />
            </Grid>
            <Grid xs={2} item><Button variant='contained'className='vote-btn' onClick={handleVote} id={candidate._id} size='large' sx={{ mt:2, bgcolor:'red',color:'white',fontWeight:'bold'}}> vote </Button></Grid>
            </Grid>
            )) : 'Loading...'
          }

          <Modal open={modal} onClose= {()=>{setModal(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style} >
            <Typography variant='h1'>
              <Alert severity={alert.type}>{alert.messege}</Alert>
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={3}>
              <Button onClick={()=>{setModal(false)}} variant='contained' >close</Button>
              </Box>
            </Typography>
          </Box>
        </Modal>
          
        </Grid>
        </Toolbar>
      </Box>
    </Layout>
  )
}

export default DashBoard 
