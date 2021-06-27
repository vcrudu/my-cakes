import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import withReduxStore from "../utils/withReduxStore";
import Cake from '../api/dataObjects/Cake';
import {
    useParams
} from "react-router-dom";

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
                    <img style={{ maxWidth: '20em' }} src={`/api/images/${id}.png`} />
                </Col>
                <Col lg='6'>
                    <h1 style={{ padding: '10px' }}>{props.currentCake.name}</h1>
                    <div style={{ padding: '10px' }}>
                        {props.currentCake.description}
                    </div>
                </Col>
            </Row>:null
        }
    </Container>
}

export default withReduxStore(Details);