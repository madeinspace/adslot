import React from 'react';
import { hot } from 'react-hot-loader';
import { Container, Row, Col } from 'reactstrap';
import Hello from './components/hello-world';
import './scss/main.scss';

const App = () => (
  <Container className="app">
    <Row>
      <Col>
        <Hello title="world" />
      </Col>
    </Row>
  </Container>
);

export default hot(module)(App);
