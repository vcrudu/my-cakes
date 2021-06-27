import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CakesDataAccess from '../api/CakesDataAccess';
import Cake from '../api/dataObjects/Cake';
import withReduxStore from "../utils/withReduxStore";
import { useHistory } from "react-router-dom";

function CakesList(props: any) {
    useEffect(() => {
        CakesDataAccess.getCakesList().then(cakesList => {
            props.updateCakesList(cakesList)
            props.updateCurrentCake(null);
            props.updateCurrentScreen('CakesList');
        });
    }, [])

    let history = useHistory();

    function handleClick(id:string) {
      history.push(`/details/${id}`);
    }

    return <Container fluid>
        {
            props.cakesList.map((cake:any) => {
                return <Row key={cake.name} className="justify-content-md-center" style={{marginBottom: '30px'}} >
                    <Col lg='2'>
                        <img style={{ maxWidth: '10em' }} src={`/api/images/${cake.id}.png`} />
                    </Col>
                    <Col lg='6'>
                        <h2>{cake.name}</h2>
                        <div style={{paddingTop: '10px'}}>
                            {cake.description}
                        </div>
                        <Button  style={{ padding: '5px' }} onClick={()=>{
                            handleClick(cake.id);
                        }} variant="link">More details</Button>
                    </Col>
                </Row>
            })
        }
    </Container>
}

export default withReduxStore(CakesList);