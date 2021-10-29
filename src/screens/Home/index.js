import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DashboardLeft from './DashboardLeft';
import DashboardRight from './DashboardRight';

const Home = () => {
  return (
    <Row noGutters>
      <Col md={3} className="pr-0">
        <DashboardLeft />
      </Col>
      <Col md={9}>
        <DashboardRight />
      </Col>
    </Row>
  );
};

export default Home;
