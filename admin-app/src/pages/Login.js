import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../components/UI/Input";
import { isUserLoggedIn, login } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      userPassword,
    };
    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: "100px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email"
                type="text"
                placeholder="email"
                valu={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                valu={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
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
