import React, { useContext, useState } from "react";
import {Link} from 'react-router-dom'
import { Form, Button, Col, Card, Container } from "react-bootstrap";
import { useFormik } from "formik";
import { signUp } from "../../actions/user";
import UserContext from "../../contexts/userContext";
import { SignupSchema } from "../../utils/validator";
import { useTranslation } from "react-i18next";

export default function Registration() {
  const {t} = useTranslation()
  const [error, setError] = useState(false);
  const { setIsAuth, setUser } = useContext(UserContext);

  let schema = SignupSchema;
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: async (values) => {
      try {
        schema.validateSync(values);
        const response = await signUp(values);
        if (response) {
          const { username, token } = response;
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          setIsAuth(true);
          setUser(username);
        }
      } catch (e) {
        setError(true);
        console.log(e.errors);
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
              <h1 className="text-center mb-4">{t("registration")}</h1>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control
                  required
                  isInvalid={error}
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  type="text"
                  placeholder={t("regLogin")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  required
                  name="password"
                  isInvalid={error}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  placeholder={t("regPassword")}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                <Form.Control
                  required
                  name="passwordConfirmation"
                  isInvalid={error}
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirmation}
                  type="password"
                  placeholder={t("regPasswordConfirm")}
                />
              </Form.Group>
              <Button
                className="w-100 mb-3"
                type="submit"
                variant="outline-primary"
              >
                {t("regButton")}
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>{t("hasAccount")} </span>
              <Link to="/login">{t("loginTitle")}</Link>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Container>
  );
}
