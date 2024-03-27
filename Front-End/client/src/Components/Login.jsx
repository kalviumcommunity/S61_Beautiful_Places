import axios from 'axios';
import React, { useState } from 'react'
import Cookies from 'js-cookie'; 

function Login() {

    const [loginUser, setloginUser] = useState({
        username : "",
        password : "",
      });    


      const handleChange = (e,field) => {
        e.preventDefault();
        setloginUser({...loginUser,[field]:e.target.value})
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/api/logout', { username:loginUser.username, password: loginUser.password });
          console.log("response",response);
          if (response.status === 200) {
            console.log(response.data);
            // Save the token in a cookie
            Cookies.set('username',loginUser.username);
            console.log('Login successful')

          } else {
            console.error('Login failed');
          }
        } catch (error) {
          console.error('An error occurred while logging in', error);
        }
      };
  return (
    <div className="bg-white rounded-lg py-5 text-black">
    <div className="container flex flex-col mx-auto bg-gray-300 rounded-lg w-[40vw] ">
      <div className="flex justify-center w-full h-full xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form className="flex flex-col w-full h-full pb-2 text-center bg-gray-300 rounded-3xl">
              <h3 className="mb-3 text-2xl font-extrabold text-dark-grey-900">Sign in</h3>
              <p className="mb-4 text-grey-700">Enter your email and password</p>
              <a className="flex items-center justify-center w-full  mb-2 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-500 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300 cursor-pointer">
                <img className="h-5 mr-2" src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png" alt="" />
                Sign in with Google
              </a>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">or</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>
              <label  className="mb-2 text-sm text-start text-grey-900">Username*</label>
              <input id="username" type="text" placeholder="username" className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-4 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={(e)=>{handleChange(e,"username")}} />
              <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
              <input id="password" type="password" placeholder="Enter a password" className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" onChange={(e)=>{handleChange(e,"password")}} />
              <button className="w-full px-6 py-5 mb-5 text-sm font-bold leading-none transition duration-300 md:w-96 rounded-2xl  bg-[#591FF9] text-white
               " onClick={handleSubmit}>Sign In</button>
              <p className="text-sm leading-relaxed text-grey-900">Not registered yet? <a href="/login" className="font-bold text-grey-700">Create an Account</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 my-5">
      <div className="w-full max-w-full sm:w-3/4 mx-auto text-center">
      </div>
    </div>
  </div>

  )
}

export default Login;