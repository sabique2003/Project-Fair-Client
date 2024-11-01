import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className="container-fluid bg-primary text-light">
        <Row className='p-4'>
            <Col>
            <h4>Project Fair 2024</h4>
            <p style={{textAlign:"justify"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi cum reiciendis, laudantium tempore illum necessitatibus obcaecati fugiat! Provident, quaerat inventore odit, quibusdam minima at harum facilis doloribus, consectetur alias quod?</p>
            </Col>
            <Col>
            <h4>Links</h4>
            <div className="d-flex flex-column">
                <Link to={"/"} className='text-info'>Landing</Link>
                <Link to={"/auth"} className='text-info'>Login</Link>
                <Link to={"/projects"} className='text-info'>All Projects</Link>
            </div>
            </Col>
            <Col>
            <h4>Feedbacks</h4>
            <textarea name="" id="" className='form-control'></textarea>
            <button className='btn btn-secondary mt-3'>Submit</button>
            </Col>
        </Row>
    </div>
    </>
  )
}

export default Footer