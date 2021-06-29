import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col, Alert, Button, Form, Modal } from 'react-bootstrap';
import withReduxStore from "../utils/withReduxStore";
import Cake from '../api/dataObjects/Cake';
import CakesDataAccess from "../api/CakesDataAccess";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";

function NewCake(props: any) {
    const [validated, setValidated] = useState(false);
    const [newCake, setNewCake] = useState<Cake>({"difficulty": "Very easy"});
    const [selectedFile, setSelectedFile] = useState<File | undefined>();
    const [error, setError] = useState<string>();
    const [showError, setShowError] = useState(false);
    let history = useHistory();

    const navigateToList = ()=>{
      history.push(`/`);
    }

    const handleCloseError = () => setShowError(false);
    const handleShowError = () => setShowError(true);

    const postAll = async (newCake: Cake, selectedFile: File)=>{
        try {
            await CakesDataAccess.addNewCake(newCake, selectedFile);
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        props.updateCurrentScreen('NewCake')

    }, []);

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || !selectedFile) {
            event.preventDefault();
            event.stopPropagation();
            if(!selectedFile) handleShowError()
        } else {
            if (selectedFile) {
                newCake.id = uuidv4();
                newCake.dateTime = new Date().valueOf();
                await postAll(newCake, selectedFile);
                navigateToList();
            } else{
                handleShowError()
                return;
            }
        }
        setValidated(true);
    };

    const handleChange=(event:any)=>{
        setNewCake({ ...newCake, [event.target.id]: event.target.value } )
    }

    return <Container fluid>
        <Row className="justify-content-center">
            <Col lg='8'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group style={{ marginBottom: '20px' }} controlId="name">
                        <Form.Label>Cake name</Form.Label>
                        <Form.Control 
                        required type="text" 
                        placeholder="Cake name" 
                        value={newCake?.name}
                        onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">
                            Please input the cake name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '20px' }} controlId="author">
                        <Form.Label>Author</Form.Label>
                        <Form.Control 
                        required type="text" 
                        placeholder="Author" 
                        value={newCake?.author}
                        onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Please input your name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '20px' }} controlId="difficulty">
                        <Form.Label>Example select</Form.Label>
                        <Form.Control as="select"
                        value={newCake?.difficulty}
                        onChange={handleChange}>
                            <option>Very easy</option>
                            <option>Easy</option>
                            <option>More effort</option>
                            <option>Difficult</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '20px' }} controlId="effort">
                        <Form.Label>Time needed</Form.Label>
                        <Form.Control 
                        required type="text" 
                        placeholder="How long it takes to cook it" 
                        value={newCake?.effort}
                        onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Please input how long it takes to prepare and cook it.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '20px' }} controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                        required as="textarea" 
                        rows={3} 
                        value={newCake?.description}
                        onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Please input the description.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '20px' }} controlId="effort">
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                        required type="file" 
                            onChange={(e) => {
                                const target = (e.target as HTMLInputElement);
                                if ((target && target.files && target.files.length > 0)) {
                                    if (target.files[0].type != "image/png" && target.files[0].type != "image/jpeg") {
                                        handleShowError();
                                        setSelectedFile(undefined);
                                    } else {
                                        setSelectedFile(target.files[0] as File)
                                    }
                                }
                            }
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose the cake image file.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" variant="primary">Save</Button>
                    <Alert variant="warning">
                       {error}
                    </Alert>
                </Form>
            </Col>
        </Row>

        <Modal show={showError} onHide={handleCloseError}>
            <Modal.Header>
                <Modal.Title>Warning</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Image should be a png of jpeg file.</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseError}>Close</Button>
            </Modal.Footer>
        </Modal>
    </Container>
}

export default withReduxStore(NewCake);