import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <Layout sidebar>
      <Container fluid>
        {/* <h1>Welcome to Admin Dashboard</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p> */}
      </Container>
    </Layout>
  );
}

export default Home;
