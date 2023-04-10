import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import http from '../lib/http';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from "react-router-dom";

const Concerts = () => {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get('/concerts');
    // const { data } = await http.get('/concerts?city=${city}');
      setConcerts(data.data.concerts);
    }
    fetchData();
  }, []);

// const Concert = ({ concert }) => {
//     return (
//       <div>
//         <h2>{concert.name}</h2>
//         <p>{concert._id}</p>
//         <img src={concert.images[0].url} alt={concert.name} />
//       </div>
//     );
// };

// const searchConcert = async (e) => {
//     const searchValue = e.target.value;
//     const { data } = await http.get(`/cities?search=${searchValue}`);
//     // The subset of posts is added to the state that will trigger a re-render of the UI
//     setConcerts(data.data.cities); 
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
//             onChange={searchConcert} // onChange will trigger "search city"
//           />
//         </Form>
//       </Container>
//       <Container style={{ maxWidth: '800px' }}>
//         <ListGroup variant="flush" as="ol">
//           {
//             concerts.map((city) => {
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



  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <h2 className="text-center">Upcoming Concerts</h2>
      <ListGroup variant="flush" as="ol">
        {
          concerts.map((concert) => {
            return (
              <ListGroup.Item key={concert._id}>
                {/* <div className="fw-bold h3">{concert.artist}</div> */}
                <div><span className="fw-bold h5">City:</span> {concert.city}</div>
                {/* <div><span className="fw-bold h5">Events:</span> {concert.events}</div> */}
              </ListGroup.Item>
            );
          })
        }
      </ListGroup>
    </Container>
  );
};

export default Concerts;
