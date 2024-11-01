import React,{useState,useEffect} from 'react'
import Header from '../Components/Header'
import { Row,Col } from 'react-bootstrap'
import Add from '../Components/Add'
import Edit from '../Components/Edit'
import Profile from '../Components/Profile'
import { getProjectlistApi } from '../Services/allApis'
import { useContext } from 'react'
import { addProjectResponseContext,editProjectResponseContext } from '../Context/Contextapi'
import { deleteProjectApi } from '../Services/allApis'
import { toast } from 'react-toastify'

function Dashboard() {
  const [data,setData]=useState([])

  const {addResponse,setAddResponse}=useContext(addProjectResponseContext)
  const {editResponse,setEditResponse}=useContext(editProjectResponseContext)

  useEffect(()=>{
    getData()
  },[addResponse,editResponse])

  const handleDelete = async (id) => {
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    try {
        const res = await deleteProjectApi(id, header)
        if (res.status === 200) {
            toast.success('Project Deleted!!')
            getData()
        } else {
            toast.warning('Something went Wrong !!')
        }
    } catch (error) {
        console.error('Error:', error)
        toast.error('Error occurred while deleting the project.')
    }
}
  const getData=async()=>{
    const header={
      'Content-Type':'application/json',
      'Authorization':`Token ${sessionStorage.getItem('token')}`
    }
    const res=await getProjectlistApi(header)
    console.log(res);
    if(res.status==200){
      setData(res.data)
    }else{
      console.log(res);
      
    }
    
    
  }
  return (
    <>
    <Header />
    <div className="container-fluid">
      <h2>User Projects</h2>
      <Row>
        <Col sm={12} md={8}>
        <div className="w-100 border shadow border-dark p-3 my-3">
          <Add />
          <div className="m-4 px-3 py-5 bg-light border ">

            {/* Project List */}
            {
              data?.length>0 ?
              <>
              {
                data?.map(item=>(
                <div className="border shadow border-2 d-flex justify-content-between p-3 my-2">
                <h4>{item.title}</h4>
                <div className='d-flex'>
                  <a  href={item.github} target='_blank' className='btn text-dark'><i className="fa-brands fa-github fa-xl" style={{color: "#0a2657",}} /></a>
                  <Edit project={item}/>
                  <a className='btn' onClick={()=>{handleDelete(item._id)}}>
                  <i className="fa-solid fa-trash fa-xl" style={{color: "#c31821",}} />
                  </a>
                </div>
              </div>
              ))
              }
            
              </>
              
            :
            <h3 className='text-center text-danger'>
              No Projects Added !!
            </h3>
            }
            


          </div>
        </div>
        </Col>
        <Col sm={12} md={4}>
        <Profile/>
        </Col>
      </Row>
    </div>
    </>
  )
}

export default Dashboard