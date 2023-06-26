import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import {useAuth} from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'
const Profile = () => {
  const [auth,setAuth] =useAuth();
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[phone,setPhone]=useState("")
  const[address,setAddress]=useState("")

  useEffect(() =>{
    const {email,name,phone,address} =auth?.user
    setName(name)
    setPhone(phone)
    setEmail(email)
    setAddress(address)
  },[auth?.user])

  const handleSubmit =async (e) =>{
    e.preventDefault()
    try{
       const {data} = await axios.put('/api/v1/auth/profile',{name,email,password,phone,address});
       if(data?.error)
       {
        toast.error(data?.error)
       }
       else
       {
        setAuth({...auth,user:data?.updatedUser});
        let ls =localStorage.getItem("auth");
        ls=JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth",JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
       }
    }
    catch(error)
    {
        console.log(error)
        toast.error('Something went wrong')
    }
};
  return (
    <Layout title={'Your Profile'}>
     <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
            <div className="col-md-3">
                <UserMenu />
            </div>
            <div className="col-md-9">
            <div className="form-container" style={{ marginTop: "-40px" }}>
        <h1> USER PROFILE </h1>
        <form  onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your name"

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

              disabled
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

            />
          </div>
          <button type="submit" className="btn btn-primary">
            UPDATE
          </button>
          
        </form>
      </div>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default Profile