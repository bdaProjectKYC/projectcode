import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const WeatherTile = (props) => {
  return (
    <div>
      <h1 class="title">Weather</h1>
      <Card>
        <div style={{ height: "250px", width: "100%" }}>
          <h1 className="title">TODO</h1>
        </div>
      </Card>
      <Card.Body>
        <Link to={`/weather/${props.city}`}>
          <Card.Title class="title">View Weather Data</Card.Title>
        </Link>
      </Card.Body>
    </div>
  );
};

export default WeatherTile;
