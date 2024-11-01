import React,{useState,useEffect,useContext} from 'react'
import { profileUpdateApi } from '../Services/allApis'
import { toast } from 'react-toastify'
import base_url from '../Services/base_url'
import { useNavigate } from 'react-router-dom'
import { tokenContext } from '../Context/TokenContext'

function Profile() {
    const nav=useNavigate()
    const [status,setStatus] = useState(false)
    const [userData,setUserData]=useState({
        profile:"",username:"",github:"",linkedin:""
    })
    const [preview,setPreview]=useState("")
    const {tokenStatus,setTokenStatus}=useContext(tokenContext)

    useEffect(()=>{
        if(sessionStorage.getItem('username')){
            setUserData({...userData,username:sessionStorage.getItem('username'),github:sessionStorage.getItem('github'),linkedin:sessionStorage.getItem('linkedin'),profile:sessionStorage.getItem('profile')
            })
        }
    },[])

    useEffect(()=>{
        if(userData.profile && userData.profile.type){
            setPreview(URL.createObjectURL(userData.profile))
        }
        else{
            setPreview("")
        }
    },[userData.profile])


    const handleProfileUpdation=async()=>{
        console.log(userData);
        const {username,github,linkedin,profile}=userData
        if(!username || !github || !linkedin || !profile){
            toast.error("Please Enter the Valid data")
            return;
        }
        if(userData.profile.type){
            const fd=new FormData()
            fd.append("username",username)
            fd.append("github",github)
            fd.append("linkedin",linkedin)
            fd.append("profile",profile)

            const header={
                "Content-Type":"multipart/form-data",
                "Authorization":`Token ${sessionStorage.getItem('token')}`
              }
              const res=await profileUpdateApi(fd,header)
              console.log(res);
              if(res.status===200){
                toast.success("Profile Updated")
                changeStatus()
                sessionStorage.clear()
                setTokenStatus(false)
                nav('/auth')
              }
              }
              else{
                const header={
                    "Content-Type":"application/json",
                    "Authorization":`Token ${sessionStorage.getItem('token')}`
                  }
                const res=await profileUpdateApi(userData,header)
                if(res.status==200){
                    toast.success("Profile Updated")
                    changeStatus()
                    sessionStorage.clear()
                    setTokenStatus(false)
                    nav('/auth')
                        
                  }
                  else{
                    toast.error("Profile Updation Failed !")
                  }
            
            
        }       
        
    }
    const changeStatus=()=>{
        setStatus(!status)
    }
  return (
    <>
    <div className="container-fluid p-3 d-flex justify-content-center align-items-center">
        {
            status?
            <div className='border shadow border-dark'>
                <h5 className="text-center">Profile</h5>
                <div className="p-3">
                    <label>
                        <input type="file" style={{display:"none"}} onChange={(e)=>setUserData({...userData,profile:e.target.files[0]})}/>
                        <img src={preview?preview:sessionStorage.getItem('profile')?`${base_url}/uploads/${sessionStorage.getItem('profile')}`:"https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"}
                        className='img-fluid mb-3' alt="" />
                    </label>
                    <input type="text" onChange={(e)=>setUserData({...userData,username:e.target.value})} defaultValue={userData.username} placeholder='UserName' className='form-control mb-3' />
                    <input type="text" onChange={(e)=>setUserData({...userData,github:e.target.value})} defaultValue={userData.github} placeholder='GitHub Url' className='form-control mb-3' />
                    <input type="text" onChange={(e)=>setUserData({...userData,linkedin:e.target.value})} defaultValue={userData.linkedin} placeholder='LinkedIn Url' className='form-control mb-3' />
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-success" onClick={handleProfileUpdation}>Update</button>
                        <button className="btn btn-danger" onClick={changeStatus}>Cancel</button>
                    </div>
                    </div>
                </div>:
                
                <h5 style={{textDecoration:"underline",color:"blue",cursor:"pointer"}} onClick={changeStatus}>Edit Profile</h5>
                
            
        }
    </div>
    </>
  )
}

export default Profile