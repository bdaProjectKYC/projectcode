import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useParams } from 'react-router-dom';
import http from '../lib/http';

const CityConcerts = () => {
  const { city } = useParams();
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(`/concerts/${city}`);
      setConcerts(data.data.concerts.events);
    }
    fetchData();
  }, [city]);

  const renderConcertCards = () => {
    if (!Array.isArray(concerts)) {
      return <p>No concerts available.</p>;
    }

    return concerts.map((data, index) => {
      return (
        <Col key={`${data._id}-${index}`}>
          <Card>
            <Link to={`${data.url}`}>
              <Carousel
                interval={null}
                style={{ height: "140px", width: "100%" }}
              >
                {data.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={image}
                      alt={`Slide ${index}`}
                      style={{ height: "150px", width: "100%" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Link>
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  return (
    <Container className="my-5" style={{ maxWidth: '1200px' }}>
      <h2 className="text-center">{city} Concerts</h2>
      <Row xs={1} md={5} className="g-4">
        {renderConcertCards()}
      </Row>
    </Container>
  );
};

export default CityConcerts;
