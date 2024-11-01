import React from 'react'
import { Row,Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import base_url from '../Services/base_url';


function ProjectCard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Card style={{ width: '18rem' }} className='m-2'>
      <Card.Img height={"100%"} width={"300px"} variant="top" style={{cursor:"pointer"}} onClick={handleShow} src={`${base_url}/uploads/${project.image}`}/>
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
      </Card.Body>
    </Card>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6} sm={12}>
                <img width={"100%"} src={`${base_url}/uploads/${project.image}`} alt="" />
                </Col>
                <Col md={6} sm={12}>
                <h6><span className='text-info'>Description:</span>{project.description}</h6>
                <p>
                    <span className='text-info'>Languages:</span>
                    {project.languages}
                </p>
                <div className='d-flex justify-content-between'>
                    <a href={project.github} target='_blank'><i className="fa-brands fa-github" /></a>
                    <a href={project.demo} target='_blank'><i className="fa-solid fa-link" style={{color: "#07784d",}} /></a>
                </div>
                </Col>
            </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard