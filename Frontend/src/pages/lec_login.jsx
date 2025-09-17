import React, { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { green } from '@mui/material/colors';

const LecLogin = () => {

  const [email,setemail] =  useState('');
  const [password,setpassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading,setloading] = useState(false);

  const LogInButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }));

    async function LoginLecturerUser (event){
      event.preventDefault();
      console.log(email);
      console.log(password);
      setloading(true);
      if(email==='' || password===''){
        enqueueSnackbar("Please Complete all fields !", { 
          variant: "error", 
          autoHideDuration: 3000 
        });
        setloading(false);
      }else{
        try{
          const LecturrLogingDetails = new FormData();
          LecturrLogingDetails.append("email",email);
          LecturrLogingDetails.append("password",password);
          const response = await axios.post('http://localhost:1337/lecturer/lecturerlogin', LecturrLogingDetails, {
            headers: { "Content-Type": "multipart/form-data" },
          });
            const data = await response.data
            if(data.status==='ok'){
              localStorage.clear();
              localStorage.setItem('lecturertoken',data.user);
              localStorage.setItem('role','lecturer');
              enqueueSnackbar("Lecturer Loging Successful !", { 
                variant: "success", 
                autoHideDuration: 3000 
              });
              setloading(true);;
            navigate('/lecturer');
            }else{
              console.log(data);
              enqueueSnackbar("Lecturer Not Found !", { 
                variant: "error", 
                autoHideDuration: 3000 
              });
              console.log("Error with lecturer loging");
              setloading(false);;
            }
        }catch(error){
          console.log(error);
          setloading(false);
        }
      }
    }




    return (
        <div class="flex flex-col min-h-screen">
            <Header/>
            <div class="flex-grow flex items-center justify-center px-4">
    <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md">
      <div>
        <h2 class="lg:text-5xl text-3xl font-bold lg:leading-[px] text-slate-900">
          Login for Lecturer Portal
        </h2>
      </div>

      <form class="max-w-md md:ml-auto w-full" onSubmit={LoginLecturerUser}>
        <h3 class="text-slate-900 lg:text-3xl text-2xl font-bold mb-5">Sign in</h3>

        <div class="space-y-6">
          <div>
            <label class="text-sm text-slate-800 font-medium mb-2 block">Email</label>
            <input
              name="email"
              type="email"
              onChange={(e)=>{setemail(e.target.value)}}
              required
              class="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label class="text-sm text-slate-800 font-medium mb-2 block">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e)=>{setpassword(e.target.value)}}
              required
              class="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 focus:bg-transparent"
              placeholder="Enter Password"
            />
          </div>
        </div>

        <div class="mt-5">
        <LogInButton loadingPosition="end"   onClick={LoginLecturerUser} loading={loading} fullWidth 
        className="w-full shadow-xl py-2.5 px-4 cursor-pointer text-sm font-semibold rounded text-white bg-red-600 hover:bg-blue-700 focus:outline-none" 
        variant="contained">Log In</LogInButton>
        </div>
      </form>
    </div>
  </div>
            <Footer/>
        </div>
    );
};

export default LecLogin;