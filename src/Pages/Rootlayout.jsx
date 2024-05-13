import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";
function Rootlayout() {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col xs={{ span: 8, offset: 2 }}>
            < Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Rootlayout;