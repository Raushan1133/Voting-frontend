import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useVotecountQuery } from "../../services/UserAuthApi";
import { Grid, Typography } from "@mui/material";
import BJP from '../../assets/images/bjp-png.png'


const VoteCount = () => {

  const { data, isSuccess } = useVotecountQuery();
  const [voteList , setVoteList]= useState([]);

  useEffect(()=>{
    if(data && isSuccess)
        setVoteList(data);
  })
  let i=1;
  return (
    <Layout>
        <Grid container mt={4} pl={5}>
      {isSuccess
        ? voteList.map((count) => (
            <Grid
              xs={12}
              item
              mt={3}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Grid
                item
                bgcolor={"white"}
                textAlign={"center"}
                display={"flex"}
                justifyContent={"space-between"}
                boxShadow={3}
                xs={9}
                borderRadius={3}
                p={2}
              >
                <Typography textAlign={"center"} variant="h6">
                  {i++}. {count.party}
                </Typography >
                <img src={BJP} height={"50px"} alt="bjp" />
              </Grid>
              <Grid xs={2} item><Typography variant="h4"  sx={{ mr:2, mt:2, bgcolor:'red',color:'white',fontWeight:'bold', textAlign:'center', borderRadius:'50%', height:'50px', width:'50px', lineHeight:1.5}}>{count.count}</Typography></Grid>
            </Grid>
          ))
        : "Loading..."}
        </Grid>
    </Layout>
  );
};

export default VoteCount;
