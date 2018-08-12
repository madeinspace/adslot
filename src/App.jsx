import React from 'react';
import { hot } from 'react-hot-loader';
import { Container, Row, Col } from 'reactstrap';
import Bookings from './components/bookings';
import './scss/main.scss';

const App = () => (
  <Container className="app">
    <Row>
      <Col>
        <h1>Adslot.</h1>
        <Bookings />
      </Col>
    </Row>
  </Container>
);

export default hot(module)(App);
