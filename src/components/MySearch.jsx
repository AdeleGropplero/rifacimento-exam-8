import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MySearch = () => {
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();
  const [coord, setCoord] = useState({});

  const handleForm = (e) => {
    e.preventDefault();
    const cityName = e.target.elements.cityName.value;
    setCityName(cityName);
  };

  const getCoordinates = () => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=4cfaf734407de24d9d0d720549cbb2c7`
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        setCoord(data[0]);
      });
  };

  useEffect(() => {
    if (cityName) {
      getCoordinates();
    }
  }, [cityName]);

  useEffect(() => {
    if (coord.lat && coord.lon) {
      navigate(
        `/details/${coord.lat}/${coord.lon}/${coord.name}/${coord.state}`
      );
    }
  }, [coord]);

  return (
    <>
      <Container fluid>
        <Navbar className="bg-body-tertiary justify-content-between">
          <Form onSubmit={handleForm}>
            <Row>
              <Col xs="auto">
                <Form.Control
                  id="cityName"
                  type="text"
                  placeholder="Search"
                  className=" mr-sm-2"
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Submit</Button>
              </Col>
            </Row>
          </Form>
        </Navbar>
      </Container>
    </>
  );
};

export default MySearch;
