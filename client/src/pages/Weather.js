import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import http from "../lib/http";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

const Weather = () => {
  const [weather, setWeather] = useState([]);
  const { city } = useParams();

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(`/weather/${city}`);
      setWeather(data.data.weather.forecast);
    }
    fetchData();
  }, []);

  // Define the data for the pie chart
  const data = [
    {
      name: "Max Temp",
      value: Math.round(
        weather.reduce((acc, cur) => acc + cur.maxtemp_c, 0) / weather.length
      ),
    },
    {
      name: "Min Temp",
      value: Math.round(
        weather.reduce((acc, cur) => acc + cur.mintemp_c, 0) / weather.length
      ),
    },
  ];

  return (
    <Container className="my-5">
      <h2 className="text-center">{city} Weather</h2>
      <br></br>
      <div className="d-flex flex-wrap">
        <div className="w-50">
          <h5 className="text-center">Daily Temperatures (C)</h5>
          <BarChart width={400} height={300} data={weather}>
            <XAxis dataKey="date" />
            <YAxis />
            <Bar dataKey="maxtemp_c" fill="#8884d8" />
            <Bar dataKey="mintemp_c" fill="#82ca9d" />
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? "#8884d8" : "#82ca9d"}
              />
            ))}
          </BarChart>
          <div className="d-flex justify-content-center mt-3">
            <div
              className="mr-3"
              style={{
                backgroundColor: "#8884d8",
                width: "20px",
                height: "20px",
              }}
            ></div>
            <div>Max Temperature (C)</div>
          </div>
          <div className="d-flex justify-content-center">
            <div
              className="mr-3"
              style={{
                backgroundColor: "#82ca9d",
                width: "20px",
                height: "20px",
              }}
            ></div>
            <div>Min Temperature (C)</div>
          </div>
        </div>
        <div className="w-50">
          <h5 className="text-center">Average Temperatures (C) for a Week</h5>
          <PieChart width={600} height={300}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="60%"
              cy="50%"
              outerRadius={50}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#8884d8" : "#82ca9d"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <br></br>
      <div className="w-50">
        <Table striped bordered hover style={{ width: "200%" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Condition</th>
              <th>Max Temp (&deg;C)</th>
              <th>Min Temp (&deg;C)</th>
              <th>Max Temp (&deg;F)</th>
              <th>Min Temp (&deg;F)</th>
              <th>Max Wind (KPH)</th>
              <th>Max Wind (MPH)</th>
            </tr>
          </thead>
          <tbody>
            {weather.map((data, index) => (
              <tr key={index}>
                <td>{data.date}</td>
                <td> <img src={data.condition_icon}/> {data.condition}</td>
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
      </div>
    </Container>
  );
};

export default Weather;
