import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import http from '../lib/http';
import { useParams } from 'react-router-dom';


console.log("inside front city");
const Weather = () => {
  console.log("wait0");
  const [weather, setWeather] = useState([]);
  const { city } = useParams();
  console.log("wait1");
  useEffect(() => {
    async function fetchData() {
      console.log("wait2");
      console.log(city);
      const { data } = await http.get(`/weather/${city}`);
      setWeather(data.data.weather.forecast);
      console.log("wait3");
    }
    fetchData();
  }, []);

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

export default Weather;
