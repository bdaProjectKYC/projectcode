import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import http from '../lib/http';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useSearchParams, Link, useLocation } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

const weather = (props) => {
  const [weather, setweather] = useState([]);
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
      const { data } = await http.get('/weather');
      setweather(data.data.weather);
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


  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <h2 className="text-center">{city} Weather</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Condition</th>
            <th>Max Temp (C)</th>
            <th>Min Temp (C)</th>
            <th>Max Temp (F)</th>
            <th>Min Temp (F)</th>
            <th>Max Wind (KPH)</th>
            <th>Max Wind (MPH)</th>
          </tr>
        </thead>
        <tbody>
          {weather.map((data, index) => (
            <tr key={index}>
              <td>{data.date}</td>
              <td>{data.condition}</td>
              <td>{data.maxtemp_c}</td>
              <td>{data.mintemp_c}</td>
              <td>{data.maxtemp_f}</td>
              <td>{data.mintemp_f}</td>
              <td>{data.maxwind_kph}</td>
              <td>{data.maxwind_mph}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default weather;
