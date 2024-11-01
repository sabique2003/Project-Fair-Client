import React,{useEffect,useState} from 'react'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectsApi } from '../Services/allApis'

function Landing() {
  const [allProjects,setAllProjects]=useState([])


  useEffect(()=>{
    getData()
  },[])


  const getData=async()=>{
    const res=await allProjectsApi()
    console.log(res);
    if(res.status==200){
      setAllProjects(res.data)
    }
    
  }

  return (
    <>
    <div className="container-fluid bg-info d-flex align-items-center text-light" style={{height:"80vh"}}>
        <Row className="p-4">
            <Col className="d-flex justify-content-center flex-column">
            <h2>Project Fair</h2>
            <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam totam commodi placeat fugit illo tempora, nemo eaque. Qui voluptate odit, maiores earum, voluptatem magni sequi obcaecati eaque ab, numquam alias?
            </p>
            <div className="d-grid">
                <Link className='btn btn-success' to={"/auth"}>Start To Explore...</Link>
            </div>
            </Col>

            <Col>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/web-developer-illustration-download-in-svg-png-gif-file-formats--php-development-coding-characters-pack-people-illustrations-3767130.png?f=webp"
            className='img-fluid'
            alt="" />
            </Col>
        </Row>

    </div>

    <div className="container-fluid p-3">
        <h4 className='text-center'>Sample Projects</h4>
        <div className='d-flex justify-content-around mt-5'>
          {
            allProjects.length>0?
            allProjects.slice(0,3).map(item=>(
              <ProjectCard project={item}/>
            ))
            :
            <h4 className='text-center text-danger'>No Projects</h4>
          }
        </div>
        <div className='p-3 text-center mt-3'>
          <Link to="/projects">View More</Link>
        </div>
    </div>
    </>
  )
}

export default Landing