import React,{useState} from "react";
import Layout from "../../components/Layout/Layout";
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'
import "../../style/AuthStyles.css"
const Register = () => {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[phone,setPhone]=useState("")
    const[address,setAddress]=useState("")
    const[answer,setAnswer]=useState("")
    const navigate=useNavigate();

    const handleSubmit =async (e) =>{
        e.preventDefault()
        try{
           const res= await axios.post('/api/v1/auth/register',{name,email,password,phone,address,answer});
           if(res && res.data.success){
            toast.success( res.data && res.data.message);
            navigate("/login");
           }
           else{
            console.log(res.data.nessage)
            toast.error(res.data.message)
           }
        }
        catch(error)
        {
            console.log(error)
            toast.error('Something went wrong')
        }
    };
  return (
    <Layout title="Register Page">
      <div className="form-container">
      <form  onSubmit={handleSubmit}>
      <h4 className="title">REGISTER FORM</h4>
      
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your phoneno."
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="enter your address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is your faviourite sports?"
              required
            />
            </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          
        </form>
      </div>
    </Layout>
  );
};

export default Register;
