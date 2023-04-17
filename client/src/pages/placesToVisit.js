
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import http from '../lib/http';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useSearchParams, Link, useLocation } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

const PlacesToVisit = () => {
const [places, setPlaces] = useState([]);
const { city } = useParams();
 
  useEffect(() => {
    async function fetchData() {
      const {data} = await http.get(`/placesToVisit/${city}`);
      setPlaces(data.data.places);
      
    }
    fetchData();
  }, [city]);


  const renderPlacesToVisit = () => {
    if (!Array.isArray(places.places)) {
      return <p>No places to visit available.</p>;
    }
    if(places.places){ 
      return places.places.map((place) => {
        return (
          <Col key={`${place._id}`}>
          <Card>
          <Card.Img variant="top" src={place.imageUrl} style={{ height: "200px", objectFit: "cover" }} />
          <Card.Body>
              <Card.Title>{place.name}</Card.Title>
              
              <ListGroup>
                <ListGroup.Item>
                  <span className="text-muted">Phone: </span>
                  {place.phone}
                </ListGroup.Item>
                <ListGroup.Item>
                <span className="text-muted">Address: </span>
                {place.address.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index !== place.address.length - 1 && <br />}
                    </span>
                  ))}
                </ListGroup.Item>
              </ListGroup>
              <p></p>
                <Link to={`${place.URL}`} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Visit Website</Link>
            
                 <p></p>
                <Card.Text>Rating: 
                <span style={{ marginLeft: "5px", fontWeight: "bold", color: "#ff9800" }}>
                  {place.rating}
                </span>
              </Card.Text>
             
             <Card.Text>Review Count :{place.reviewCount}</Card.Text>
             </Card.Body>
             </Card>
          </Col>
        );
      });
    }
  };

  return (
    // Render places to visit
    <Container className="my-5" style={{ maxWidth: '1200px' }}>
    <h2 className="text-center">Places To Visit in {city} </h2>
    <Row xs={1} md={5} className="g-4">
      {renderPlacesToVisit()}
    </Row>
  </Container>
   
  );
};

export default PlacesToVisit;



  