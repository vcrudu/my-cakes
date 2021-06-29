import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import withReduxStore from "../utils/withReduxStore";
import Cake from '../api/dataObjects/Cake';
import {
    useParams
} from "react-router-dom";
import {backendLink} from '../consts';

type Params = {
    id: string;
};

function Details(props: any) {
    let { id } = useParams<Params>();
    useEffect(() => {
        const cake = props.cakesList.find((cake: Cake) => cake.id === id);
        props.updateCurrentCake(cake);
        props.updateCurrentScreen('Details');
    }, []);

    return <Container fluid>
        {
            props.currentCake?<Row key={props.currentCake.name} className="justify-content-md-center">
                <Col lg='3'>
                    <img style={{ maxWidth: '20em' }} src={`${backendLink}/api/images/${id}.png`} />
                </Col>
                <Col lg='6'>
                    <h1 style={{ padding: '10px' }}>{props.currentCake.name}</h1>
                    <h6>By {props.currentCake.author}</h6>
                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}>
                            <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                            </svg>
                            <h6>{props.currentCake.effort}</h6>
                        </div>
                        <h6 style={{marginTop: '10px'}}>{props.currentCake.difficulty}</h6>
                    <div style={{ padding: '10px' }}>
                        {props.currentCake.description}
                    </div>
                </Col>
            </Row>:null
        }
    </Container>
}

export default withReduxStore(Details);