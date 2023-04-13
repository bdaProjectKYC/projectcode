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

const Concerts = (props) => {
  const [concerts, setConcerts] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const location = useLocation();

  console.log('>>>> props', props);
  console.log('>>>> location', location);

  const [searchParams, setsearchParams] = useSearchParams();
  const [city, setCity] = useState(searchParams.get('city'));

  console.log('>>>> city', city);
  // new changes for query
  const handleChange = event => {
    const newQuery = event.target.value;
    setCity(newQuery);
    // setsearchParams({
    //   city: newQuery,
    //   page: 0
    // })
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get('/concerts');
      setConcerts(data.data.concerts);
    }
    fetchData();

    const str = location.search.split("=");
    setCity(decodeURIComponent(str[1]));
  }, []);

  // const searchConcerts = async (e) => {
  //   const searchValue = e.target.value;
  //   setSearchCity(searchValue);
  //   const { data } = await http.get(`/concerts?city=${searchValue}`);
  //   setConcerts(data.data.concerts);
  // };

  const renderConcertCard = (concert) => {
    return concert.events.map((event, index) => (
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
            {/* <Card.Text>{event.id}</Card.Text> */}
          </Card.Body>
        </Card>
      </Col>
    ))
  }



  return (
    <>
      <Container className="my-5" style={{ maxWidth: '800px' }}>
        <h2 className="text-center">Upcoming Concerts</h2>
        <Form>
          {/* <input // new changes
            value={city}
            placeholder="Search..."
            className="me-5"
            aria-label="Search"
            onChange={handleChange}
          /> */}
          <FormControl
            value={city}
            placeholder="Search..."
            className="me-5"
            aria-label="Search"
            onChange={handleChange}
          />
        </Form>
      </Container>
      <Container>
        <Row xs={1} md={5} className="g-4">
          {city ? concerts.map(concert => {
            return concert.city.toLowerCase().includes(city.toLowerCase()) && renderConcertCard(concert)
          }) : concerts.map(concert => {
            return renderConcertCard(concert)
          })}
        </Row>
      </Container>
    </>
  );
};

export default Concerts;