import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col, Card, Container } from "react-bootstrap";
import { useFormik } from "formik";
import { login } from "../../actions/user";
import UserContext from "../../contexts/userContext";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const { setIsAuth, setUser } = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const response = await login(values);
      const { status, data } = response;
      if (status === 400) {
        setError(data);
      }
      if (status === 200) {
        const { username, token } = data;
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
              <h1 className="text-center mb-4">{t("loginTitle")}</h1>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>{t("login")}</Form.Label>
                <Form.Control
                  required
                  isInvalid={error}
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  type="text"
                  placeholder={t("loginLogin")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{t("password")}</Form.Label>
                <Form.Control
                  required
                  name="password"
                  isInvalid={error}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  placeholder={t("loginPassword")}
                />
                <div className="invalid-feedback">{error && t(error)}</div>
              </Form.Group>
              <Button
                className="w-100 mb-3"
                type="submit"
                variant="outline-primary"
              >
                {t("loginButton")}
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>{t("noAccount")} </span>
              <Link to="/signup">{t("registration")}</Link>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Container>
  );
}
