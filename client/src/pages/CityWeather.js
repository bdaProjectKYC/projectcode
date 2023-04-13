import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import http from '../lib/http';

const CityWeather = ({ city }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(`/weather/${city}`);
      setWeather(data.data.forecast);
    }
    fetchData();
  }, [city]);

  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <h2 className="text-center">{city} Weather</h2>
      <ListGroup variant="flush" as="ol">
        {weather.map((forecast) => {
          return (
            <ListGroup.Item key={forecast.date}>
              <div className="fw-bold h4">{forecast.date}</div>
              <div>Condition: {forecast.condition}</div>
              <div>Max temperature (Celsius): {forecast.maxtemp_c}</div>
              <div>Min temperature (Celsius): {forecast.mintemp_c}</div>
              <div>Max temperature (Fahrenheit): {forecast.maxtemp_f}</div>
              <div>Min temperature (Fahrenheit): {forecast.mintemp_f}</div>
              <div>Max wind speed (kilometers per hour): {forecast.maxwind_kph}</div>
              <div>Max wind speed (miles per hour): {forecast.maxwind_mph}</div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Container>
  );
};

export default CityWeather;
