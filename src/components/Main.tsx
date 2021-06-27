import React, {useState} from 'react';
import logo from './logo.svg';
import { BrowserRouter, Switch, Route, useLocation, Link } from 'react-router-dom'
import CakesList from './CakesList';
import { Container, Breadcrumb, Row, Col } from 'react-bootstrap';
import Navigator from './Navigator';
import withReduxStore from '../utils/withReduxStore';
import Details from './Details';
import NewCake from './NewCake';


function Main(props:any) {
  return (
    <div>
      <BrowserRouter>
      <Navigator />
      <Row className="justify-content-center">
        <Col lg='8'>
          <Breadcrumb>
            <Breadcrumb.Item active={props.currentScreen==='CakesList'} href="/">Cakes list</Breadcrumb.Item>
            {
              props.currentCake.id?<Breadcrumb.Item active>{props.currentCake.name}</Breadcrumb.Item>:null
            }
            {
              props.currentScreen==='NewCake'?<Breadcrumb.Item active>New cake</Breadcrumb.Item>:null
            }
          </Breadcrumb>
        </Col>
      </Row>
        <Switch>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/new">
            <NewCake />
          </Route>
          <Route path="/">
            <CakesList />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default withReduxStore(Main);
