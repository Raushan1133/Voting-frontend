import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const UserAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query:(user) => {
            return{
                url:'user/signup',
                method:'POST',
                body:user,
                headers:{
                    'content-type':'application/json'
                }
            }
        }
    }),
    loginUser:builder.mutation({
        query : (user) =>{
            return{
                url:'user/login',
                method:'POST',
                body:user,
                headers:{
                    'content-type':'application/json'
                }
            }
        }
    }),
    getProfile:builder.query({
        query:(token) =>{
            return{
                url:'user/profile',
                method:'GET',
                headers:{
                    'authorization': `Bearer ${token}`
                }
            }
        }
    }),
    addCandidate: builder.mutation({
        query : ({user,token}) =>{
            return{
                url:'candidate',
                method:'POST',
                body:user,
                headers:{
                    'authorization': `Bearer ${token}`
                }
            }
        }
    }),
    getCandidates:builder.query({
        query : (token) =>{
            return{
                url:'candidate/candidatelist',
                method:'GET'
            }
        }
    }),
    voting:builder.mutation({
        query:({candidateID,token})=>{
            return{
                url:`candidate/vote/${candidateID}`,
                method:'POST',
                headers:{
                    'authorization': `Bearer ${token}`
                }
            }
        }
    }),
    votecount:builder.query({
        query:()=>{
            return{
                url:'candidate/vote/count',
                method:'GET'
            }
        }
    }),
    deletecandidate:builder.mutation({
        query:({candidateID}) =>{
            return{
                url:`candidate/${candidateID}`,
                method:'DELETE'
            }
        }
    }),
    updatecandidate:builder.mutation({
        query:({updatedData,candidateID})=>{
            return{
                url:`candidate/${candidateID}`,
                body:updatedData,
                method:'PUT'
            }
        }
    })
  }),
  
})


export const { useRegisterUserMutation , useLoginUserMutation , useGetProfileQuery , useAddCandidateMutation , useGetCandidatesQuery , useVotingMutation , useVotecountQuery , useDeletecandidateMutation , useUpdatecandidateMutation} = UserAuthApi