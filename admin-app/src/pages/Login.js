import React from "react";
import Layout from "../components/Layout/Layout";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../components/UI/Input";

function Login(props) {
  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "100px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
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
                placeholder="Password"
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

export default Login;
