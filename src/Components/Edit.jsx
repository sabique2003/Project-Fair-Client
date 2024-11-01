import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import base_url from '../Services/base_url';
import { toast } from 'react-toastify';
import { editProjectApi } from '../Services/allApis'
import { editProjectResponseContext } from '../Context/Contextapi';


function Edit({project}) {

    const [show, setShow] = useState(false);
    const [data,setData]=useState({...project})
    const [preview,setPreview]=useState("")
    const {editResponse,setEditResponse} = useContext(editProjectResponseContext)

    useEffect(()=>{
      if(data.image.type){
        setPreview(URL.createObjectURL(data.image))
      }
      else{
        setPreview("")
      }
    },[data.image])
    
    const handleEdit=async()=>{
      console.log(data);
      console.log(data.image.type);
      
      const {title,description,languages,github,demo,image}=data
      if(!title || !description || !languages || !github || !demo || !image){
        toast.warning("Invalid Input")
      }
      else{
        if(data.image.type){
          const fd=new FormData()
          fd.append("title",title)
          fd.append("desc",description)
          fd.append("languages",languages)
          fd.append("github",github)
          fd.append("demo",demo)
          fd.append("image",image)

          const header={
            "Content-Type":"multipart/form-data",
            "Authorization":`Token ${sessionStorage.getItem('token')}`
          }

          const res=await editProjectApi(fd,project._id,header)
          console.log(res);
          if(res.status==200){
            toast.success("Project Updated!!")
            handleClose()
            setEditResponse(res)
          }
          else{
            toast.error("Updation failed !!")
          }
          

        }
        
        else{
          console.log("no file");
          const header={
            "Content-Type":"application/json",
            "Authorization":`Token ${sessionStorage.getItem('token')}`
          }

          const body={title:title,desc:description,languages,github,demo,image}

          const res=await editProjectApi(body,project._id,header)
          console.log(res);
          if(res.status==200){
            toast.success("Project Updated!!")
            handleClose()
            setEditResponse(res)
          }
          else{
            toast.error("Updation failed !!")
          }

        }
        
      }
      
    }
    
    const handleClose = () =>{
       
      setShow(false); 
      setData({...project})
      setPreview("")
    }
    const handleShow = () => setShow(true);

  return (

    <>
     <button className="btn" onClick={handleShow}><i className="fa-solid fa-pen-to-square fa-xl" style={{color: "#5f4b9b",}} /></button>

<Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton >
      <Modal.Title>Edit Project</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col>
        <label>
        <input type="file" style={{display:"none"}} onChange={(e)=>{setData({...data, image: e.target.files[0]})}} />
        <img style={{cursor:"pointer"}} src={preview?preview:`${base_url}/uploads/${project.image}`} alt="" className="img-fluid" />
        </label>
        </Col>
        <Col>
        <input type="text" defaultValue={project.title} onChange={(e)=>{setData({...data,title:e.target.value})}} className="form-control mb-3" placeholder='Enter Project Title'/>
        <input type="text" defaultValue={project.description} onChange={(e)=>{setData({...data,description:e.target.value})}} className="form-control mb-3" placeholder='Description'/>
        <input type="text" defaultValue={project.languages} className="form-control mb-3" onChange={(e)=>{setData({...data,languages:e.target.value})}} placeholder='Languages Used'/>
        <input type="text" defaultValue={project.github} className="form-control mb-3" onChange={(e)=>{setData({...data,github:e.target.value})}} placeholder='GitHub Link'/>
        <input type="text" defaultValue={project.demo} className="form-control mb-3" placeholder='Demo Link'/>
        </Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleEdit}>Update</Button>
    </Modal.Footer>
  </Modal>
    </>
  )
}

export default Edit