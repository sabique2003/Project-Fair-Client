import React,{useState,useEffect} from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { allProjectsApi } from '../Services/allApis'

function Allprojects() {
  const [data,setData] = useState([])

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      getData()
    }
  },[])

  const getData=async()=>{
    const res=await allProjectsApi()
    if(res.status==200){
      setData(res.data)
    }
  }

  return (
    <>
    <Header/>
    <div className="container-fluid p-3">
      <h3>All Projects</h3>
      <div className='d-flex justify-content-around'>
        {
          data.length>0 ?
          data.map(item=>(
            <ProjectCard project={item}/>

          ))
          :
          <h3 className='text-danger text-center'>No Projects Availabe.Check You are Logged in</h3>


        }
      </div>
    </div>
    </>
  )
}

export default Allprojects