import React from "react";
import Layout from "../components/Layout/Layout";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../components/UI/Input";

function Register(props) {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "100px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    valu=""
                    onChange={() => {}}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    valu=""
                    onChange={() => {}}
                  />
                </Col>
              </Row>

              <Input
                label="Email"
                type="text"
                placeholder="email"
                valu=""
                onChange={() => {}}
              />
              <Input
                label="Password"
                type="password"
                placeholder="password"
                valu=""
                onChange={() => {}}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default Register;
