import React, { useContext } from "react";
import { Navbar as Nav, Container, Button } from "react-bootstrap";
import UserContext from "../../contexts/userContext";

export default function Navbar() {
  const { isAuth, setIsAuth, setUser } = useContext(UserContext);
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuth(false);
    setUser("");
  }
  return (
    <Nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container className="d-flex justify-content-between">
        <Nav.Brand href="/">Chat App</Nav.Brand>
        {isAuth && (
          <Button variant="primary" onClick={() => logout()}>
            Выйти
          </Button>
        )}
      </Container>
    </Nav>
  );
}
