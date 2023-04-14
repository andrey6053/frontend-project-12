import React, { useContext, useState } from "react";
import {Link} from "react-router-dom"
import { Form, Button, Col, Card, Container } from "react-bootstrap";
import { useFormik } from "formik";
import { login } from "../../actions/user";
import UserContext from "../../contexts/userContext";
import { LoginSchema } from "../../utils/validator";

export default function Login() {
  const [error, setError] = useState(false);
  const { setIsAuth, setUser } = useContext(UserContext);

  let schema = LoginSchema;
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const valid = await schema.isValid(values);
      if (!valid) return setError(true);
      const response = await login(values);
      if (response) {
        const { username, token } = response;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setIsAuth(true);
        setUser(username);
      }
    },
  });

  return (
    <Container
      fluid
      className="h-100 d-flex justify-content-center align-items-center"
    >
      <Col xxl={6} md={8} xs={12}>
        <Card className="card shadow-sm">
          <Card.Body className="p-5 row">
            <Form className="w-100" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">Войти</h1>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                  required
                  isInvalid={error}
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  type="text"
                  placeholder="Введите логин"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  required
                  name="password"
                  isInvalid={error}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  placeholder="Введите пароль"
                />
              </Form.Group>
              <Button
                className="w-100 mb-3"
                type="submit"
                variant="outline-primary"
              >
                Войти
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>Нет аккаунта? </span>
              <Link to="/signup">Регистрация</Link>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Container>
  );
}
