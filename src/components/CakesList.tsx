import { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import CakesDataAccess from '../api/CakesDataAccess';
import withReduxStore from "../utils/withReduxStore";
import { useHistory, Link } from "react-router-dom";
import {backendLink} from '../consts';

function CakesList(props: any) {
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showSuccessDelete, setShowSuccessDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>();
    
    useEffect(() => {
        CakesDataAccess.getCakesList().then(cakesList => {
            props.updateCakesList(cakesList)
            props.updateCurrentCake(null);
            props.updateCurrentScreen('CakesList');
        });
    }, [])

    let history = useHistory();

    const handleClick = (id: string) => {
        history.push(`/details/${id}`);
    }

    const handleDelete = (id: string) => {
        setShowConfirmDelete(true)
        setIdToDelete(id)
    }

    const handleCloseConfirmYes = async (id: string) => {
        setShowConfirmDelete(false);
        await CakesDataAccess.deleteCake(id)
        props.deleteCake(id)
        setShowSuccessDelete(true)
        setIdToDelete(null)
    }

    const handleCloseConfirmNo= () => {
        setShowConfirmDelete(false)
    }

    return <Container fluid>
        {
            props.cakesList.map((cake: any) => {
                return <Row key={cake.name} className="justify-content-center" style={{ marginBottom: '30px' }} >
                    <Col lg='2' md='4'>
                        <Link to={`/details/${cake.id}`}> <img style={{ maxWidth: '10em' }} src={`${backendLink}/api/images/${cake.id}.png`} /></Link>
                    </Col>
                    <Col lg='4' md='6'>
                        <h2>{cake.name}</h2>
                        <h6>By {cake.author}</h6>
                        <div style={{ paddingTop: '10px' }}>
                            {cake.description}
                        </div>
                        <Button style={{ padding: '5px' }} onClick={() => {
                            handleClick(cake.id);
                        }} variant="link">More details</Button>
                    </Col>
                    <Col lg='1' md='1'>
                        <Button variant="link" onClick={() => {
                            handleDelete(cake.id);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </Button>
                    </Col>
                </Row >
            })
        }
    <Modal show={showConfirmDelete} onHide={()=>{setShowConfirmDelete(false)}}>
                        <Modal.Header>
                            <Modal.Title>Info</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Are you sure you wish to delete the cake?</p>
                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>idToDelete && handleCloseConfirmYes(idToDelete)}>Yes</Button>
                        <Button variant="secondary" onClick={handleCloseConfirmNo}>No</Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showSuccessDelete} onHide={()=>{setShowSuccessDelete(false)}}>
                        <Modal.Header>
                            <Modal.Title>Info</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>The cake was succesfuly deleted.</p>
                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setShowSuccessDelete(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
    </Container >
}

export default withReduxStore(CakesList);