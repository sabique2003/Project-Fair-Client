import React from 'react'
import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addProjectApi } from '../Services/allApis';
import { useContext } from 'react';
import { addProjectResponseContext } from '../Context/Contextapi';

function Add() {
    const [show, setShow] = useState(false);
    const [project,setProject]=useState({
      title:"",desc:"",language:"",demo:"",github:"",image:""
    })

    const [preview,setPreview]=useState("")

    const {addResponse,setAddResponse}=useContext(addProjectResponseContext)

    useEffect(()=>{
      if(project.image){
        setPreview(URL.createObjectURL(project.image))
      }
      else{
        setPreview("")
      }
    },[project.image])

    const handleAddproject=async()=>{
      console.log(project);
      const {title,desc,language,demo,github,image}=project

      if(!title || !desc || !language || !demo || !github || !image){
        toast.warning("Enter Valid Input !!")
      }
      else{
        const fd=new FormData()
        fd.append('title',title)
        fd.append('desc',desc)
        fd.append('languages',language)
        fd.append('demo',demo)
        fd.append('github',github)
        fd.append('image',image)

        const header={
          'Content-Type':'multipart/form-data',
          'Authorization':`Token ${sessionStorage.getItem('token')}`
        }
        const res= await addProjectApi(fd,header)
        console.log(res);
        if(res.status==200){
          toast.success("Project Added")
          handleClose()
          setAddResponse(res)
        }
        else{
          toast.error("Project Adding Failed")
        }
        
      }
      
    }

    const handleClose = () => {
      setShow(false);
      setPreview("")
      setProject({title:"",desc:"",language:"",demo:"",github:"",image:""})

    }

    const handleShow = () => setShow(true);
  return (
    <>
    <button className="btn btn-warning" onClick={handleShow}>Add Project +</button>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton >
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
            <label>
                <input type="file" style={{display:"none"}} onChange={(e)=>setProject({...project,image:e.target.files[0]})}/>
                <img style={{cursor:"pointer"}} src={preview?preview:"https://cdn-icons-png.flaticon.com/512/4147/4147103.png"} alt="" className="img-fluid" />
                
            </label>
            </Col>
            <Col>
            <input type="text" onChange={(e)=>setProject({...project,title:e.target.value})} className="form-control mb-3" placeholder='Enter Project Title'/>
            <input type="text" onChange={(e)=>setProject({...project,desc:e.target.value})} className="form-control mb-3" placeholder='Description'/>
            <input type="text" onChange={(e)=>setProject({...project,language:e.target.value})} className="form-control mb-3" placeholder='Languages Used'/>
            <input type="text" onChange={(e)=>setProject({...project,github:e.target.value})} className="form-control mb-3" placeholder='GitHub Link'/>
            <input type="text" onChange={(e)=>setProject({...project,demo:e.target.value})} className="form-control mb-3" placeholder='Demo Link'/>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddproject}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add