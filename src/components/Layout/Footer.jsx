import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <>
      <Box component={'footer'}  bgcolor={'black'} color={'white'} width={'100%'} p={5} sx={{xs:{p:1} , position:'',bottom:0}} mt={5}>
        <Typography variant='h6' textAlign={'center'}>
          All Rights Reserved &copy; Indian Government
        </Typography>
      </Box>
    </>
  )
}

export default Footer
