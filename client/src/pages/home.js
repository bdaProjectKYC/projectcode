// import { useEffect, useState } from 'react';
// import Container from 'react-bootstrap/Container';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Image from 'react-bootstrap/Image';
// import http from '../lib/http';
// // Here we import the new components for the seach bar
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import { Link } from "react-router-dom";

// const Home = () => {
//   const [posts, setCities] = useState([]); 
//   useEffect(() => {
//     async function fetchData() {
//       const { data } = await http.get('/cities');
//       setCities(data.data.cities);
//     }
//     fetchData();
//   }, []);
//   /* We are creating a new function that calls the API endpoint
//      and passing the search value as a query parameter
//   */
//   const searchCity = async (e) => {
//     const searchValue = e.target.value;
//     const { data } = await http.get(`/cities?search=${searchValue}`);
//     // The subset of posts is added to the state that will trigger a re-render of the UI
//     setCities(data.data.cities); 
//   };
  
//   return (
//     <>
//       <Container className="my-5" style={{ maxWidth: '800px' }}>
//         <h2 className="text-center">Know Your City</h2>
//         Search a city to get details
//         <Form>
//           <FormControl
//             type="search"
//             placeholder="Search"
//             className="me-5"
//             aria-label="Search"
//             onChange={searchCity} // onChange will trigger "search city"
//           />
//         </Form>
//       </Container>
//       <Container style={{ maxWidth: '800px' }}>
//         <ListGroup variant="flush" as="ol">
//           {
//             posts.map((city) => {
//               return (
//                 <ListGroup.Item key={city._id}> 
//                   <div className="fw-bold h3">
//                     <Link to={`/getData/${city.city}`} style={{ textDecoration: 'none' }}>{city.city}</Link>
//                   </div>
//                   {/* <div><span className="fw-bold h3">{city.city}</span></div> */}
//                 </ListGroup.Item>
//               );
//             })
//           }
//         </ListGroup>
//       </Container>
//     </>
//   );
// };

// export default Home;




import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import http from '../lib/http';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setCities] = useState([]); 
  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get('/cities');
      setCities(data.data.cities);
    }
    fetchData();
  }, []);

  const searchCity = async (e) => {
    const searchValue = e.target.value;
    const { data } = await http.get(`/cities?search=${searchValue}`);
    setCities(data.data.cities); 
  };
  
  return (
    <>
      <Container className="my-5" style={{ maxWidth: '800px' }}>
        <h2 className="text-center">Know Your City</h2>
        Search a city to get details
        <Form>
          <FormControl
            type="search"
            placeholder="Search"
            className="me-5"
            aria-label="Search"
            onChange={searchCity}
          />
        </Form>
      </Container>
      <Container style={{ maxWidth: '800px' }}>
        <Row>
          {posts.map((city) => (
            <Col key={city._id} md={4} className="mb-4">
              <Card>
                <Card.Img variant="top" src={city.image_url} />
                <Card.Body>
                  <Card.Title>{city.city}</Card.Title>
                  <Card.Text>{city.description}</Card.Text>
                  <Link to={`/getData/${city.city}`} className="btn btn-primary">View Details</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
