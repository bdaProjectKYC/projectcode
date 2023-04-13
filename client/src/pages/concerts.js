import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import http from '../lib/http';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useSearchParams, Link, useLocation } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

const Concerts = () => {
  // Initialize state variables
  const [concerts, setConcerts] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [city, setCity] = useState("");
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch concerts from API
  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get('/concerts');
      setConcerts(data.data.concerts);
    }
    fetchData();
  }, []);

  // Update state variables when search bar input changes
  const handleChange = (event) => {
    const newCity = event.target.value;
    setCity(newCity);
    setSearchParams({ city: newCity });
  };

  // Parse search params from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCity(params.get('city') || "");
  }, [location]);

  // Render concert cards
  const renderConcertCards = () => {
    return concerts.map((concert) => {
      return concert.events.map((event, index) => {
        if (!city || concert.city.toLowerCase().includes(city.toLowerCase())) {
          return (
            <Col key={`${concert._id}-${index}`}>
              <Card>
                <Link to={`${event.url}`}>
                  <Carousel
                    interval={null}
                    style={{ height: "250px", width: "100%" }}
                  >
                    {event.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          src={image}
                          alt={`Slide ${index}`}
                          style={{ height: "250px", width: "100%" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Link>
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {concert.city}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          );
        }
      });
    });
  };

  return (
    <>
      <Container className="my-5" style={{ maxWidth: "800px" }}>
        <h2 className="text-center">Upcoming Concerts</h2>
        <Form>
          <FormControl
            value={city}
            placeholder="Search by city..."
            className="me-5"
            aria-label="Search"
            onChange={handleChange}
          />
        </Form>
      </Container>
      <Container>
        <Row xs={1} md={5} className="g-4">
          {renderConcertCards()}
        </Row>
      </Container>
    </>
  );
};

export default Concerts;
