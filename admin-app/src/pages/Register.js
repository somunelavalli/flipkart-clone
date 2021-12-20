import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { register } from "../redux/actions";

function Register(props) {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  if (auth.authenticate) {
    return <Navigate to="/" replace />;
  }
  const userRegister = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, userName, userPassword };
    dispatch(register(user));
  };
  if (auth.authenticate) {
    return <Navigate to="/" replace />;
  }
  if (user.loading) {
    return <p>Loading....!</p>;
  }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: "100px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userRegister}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="First Name"
                    valu={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Last Name"
                    valu={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>

              <Input
                label="Email"
                type="text"
                placeholder="email"
                valu={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Username"
                type="text"
                placeholder="Username"
                valu={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="password"
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

export default Register;
