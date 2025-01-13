import React, { useState, useEffect } from "react";
import axios from "axios";


export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Input = (e) => {

    if (e.target.name == "username") {
      setUsername(e.target.value)

    }
    else if (e.target.name == "password") {
      setPassword(e.target.value)

    }
    else if (e.target.name == "email") {
      setEmail(e.target.value)
    }
  }


  const fetchData = async () => {


    try {
      const response = await axios.post(
        "https://hospital-food-delivery-management-backend-rf3c.onrender.com/user/signup",
        { username: username, password: password, email: email },
        {
          headers: {
            'Content-Type': 'application/json' // Corrected MIME type
          }
        }
      );
      console.log(response); // Handle success, e.g., store token in localStorage
    } catch (error) {
      console.error("Error:", error.response.data.message); // Handle error, e.g., display error message
    }
  };

  // Include dependencies

  return (
    <>
      <div className="flex flex-row bg-gradient-to-r from-slate-300 to-slate-500 min-h-screen">

        <div className=" text-white w-[1043px] h-[600px]  mx-auto mt-[30px] rounded-[5px] flex flex-row shadow-xl">

          <div className="bg-black flex flex-col w-[800px] h-[600px]  ">


            <span className="mx-auto text-[40px] mt-[10px]">Your Profile</span>


            <p className="mx-auto w-[260px]">Enter the login information for your </p>
            <span className="mx-[auto]">account</span>
            <div className="flex flex-col mx-auto">
              <label className="mt-[20px]" >Username</label>
              <input className="mt-[20px] w-[400px] h-[50px] rounded-[5px] px-[10px] bg-[#303030]" type="text" placeholder="Enter your username" name="username" onChange={Input}></input>
              <label className="mt-[20px] " >Email</label>
              <input className="mt-[20px] w-[400px] h-[50px] rounded-[5px] px-[10px] bg-[#303030]" type="email" placeholder="Enter your email" name="email" onChange={Input}></input>
              <label className="mt-[20px] " >Password</label>
              <input className="mt-[20px] w-[400px] h-[50px] rounded-[5px] px-[10px] bg-[#303030]" type="password" placeholder="Enter your password" name="password" onChange={Input}></input>

              <button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white w-[300px] mx-auto h-[50px] mt-[40px] rounded-[5px] text-black hover:bg-[white] hover:text-[black] " onClick={fetchData}>Submit</button>

            </div>


          </div>

          <div className="w-[800px] h-[600px] bg-gradient-to-r from-fuchsia-600 to-purple-600 ">

            <div className="flex flex-col w-[400px] h-[600px] mx-auto justify-center">

              <span className="mx-auto text-[40px]">Create New account</span>
                          <p className="text-[#ffffffb3] text-[20px] mt-[10px] ">Create a resume with ease! Sign up now to access personalized templates and exclusive features, making your job search simpler and more effective.</p>

            </div>



          </div>






        </div>




      </div>


    </>
  );
}