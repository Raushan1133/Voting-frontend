import { AppBar, Box, IconButton, Toolbar, Typography , Divider, Drawer } from '@mui/material'
import {useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../styles/HeaderStyle.css'
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {
  const [mobileOpen , setMobileOpen] =useState(false);
  const [modal , setModal] =useState(false);
  const handledrawerToggle = () =>{
    setMobileOpen(!mobileOpen);
  }

  const handleProfiledrawerToggle = () =>{
    setModal(!modal);
  }

  // Nav Drawer
  const drawer = (
    <Box onClick = {handledrawerToggle} sx={{textAlign:'center'}}>
         <Typography variant='h6' component='div' sx={{flexGrow:1,my:2}}>
         <img src={Logo} height={'80px'} style={{marginLeft:'20px'}} alt="" />
        </Typography>
        <Divider/>
        <Box>
        <ul className='nav' style={{color:'black'}}>
          <li style={{color:'black'}}><NavLink style={{color:'black'}} to={'/dashboard'}>Dashboard</NavLink></li>
          <li><NavLink to={'/votecount'}>Live Vote Count</NavLink></li>
          <li><NavLink>Report</NavLink></li>
          {/* <li><NavLink style={{marginRight:'30px'}} aria-label='open profileDrawer' edge='end' to={'/profile'}  onClick={handleProfiledrawerToggle}><IconButton><AccountCircleIcon sx={{color:'red'}}/></IconButton> Profile</NavLink></li> */}
          <li><NavLink style={{marginRight:'30px'}} to={'/profile'}><IconButton><AccountCircleIcon sx={{color:'red'}}/></IconButton> Profile</NavLink></li>
        </ul>
        </Box>
    </Box>
  )

  // Profile Drawer
  const profileDrawer = (
    <Box onClick = {handleProfiledrawerToggle} sx={{textAlign:'center'}}>
         <Typography variant='h6' component='div' sx={{flexGrow:1,my:2}}>
          <h1>Profile</h1>
          <Typography variant='h6'>User Name: </Typography>
          <Typography variant='h6'>Aadhar Number: </Typography>
        </Typography>
        <Divider/>
        <Box>
        <ul className='nav' style={{color:'black'}}>
          <li><NavLink>Change Password</NavLink></li>
          <li><NavLink to='/'>Log Out</NavLink></li>
        </ul>
        </Box>
    </Box>
  )
  return (
    <>
      <Box>
      <AppBar sx={{display:'flex'}}>
       <Toolbar>
       <IconButton color='inherit' aria-label='open drawer' edge='start' sx={{mr:2, display:{sm:'none'} }} onClick={handledrawerToggle}>
            <MenuIcon />
          </IconButton>
       <Typography variant='div' sx={{flexGrow:1}}>
          <img src={Logo} height={'80px'} style={{marginLeft:'20px'}} alt="Logo" />
        </Typography>
       <Box sx={{ display: {xs:'none' , sm:'block' }}}>
       <ul className='navbar'>
          <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
          <li><NavLink to={'/votecount'}>Live Vote Count</NavLink></li>
          <li><NavLink>Report</NavLink></li>
          {/* <li><IconButton  aria-label='open profileDrawer' edge='end' to={'/profile'} onClick={handleProfiledrawerToggle}><AccountCircleIcon sx={{color:'white'}}/></IconButton></li> */}
          <li><NavLink to={'/profile'} ><AccountCircleIcon sx={{color:'white'}} /></NavLink></li>

        </ul>
       </Box>
       </Toolbar>
      </AppBar>

      {/* Nav Drawer */}
      <Box component='nav'>
        <Drawer variant='temporary' open={mobileOpen} onClose={handledrawerToggle} sx={{display:{sm:'none',xs:'block'}, "& .MuiDrawer-paper":{boxSizing:'border-box',width:'240px'}}}>
          {drawer}
        </Drawer>
      </Box>

      {/* Profile Drawer */}
      <Box component='div'>
        <Drawer variant='temporary' open={modal}  onClose={handleProfiledrawerToggle} sx={{"& .MuiDrawer-paper":{boxSizing:'border-box',width:'240px'}}}>
          {profileDrawer}
        </Drawer>
      </Box>
      <Box>
      <Toolbar />
      </Box>
      </Box>
    </>
  )
}

export default Navbar
