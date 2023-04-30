import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const WeatherTile = (props) => {
  return (
    <div >
      <h1 class="title">Weather</h1>
      <Card>
        <div style={{ height: "250px", width: "100%" }}>
          {props.weather.slice(-1).map((data, index) => {
            // return (<Card>Condition: {data.condition}</Card>
            // <Card>Max Temperature:{data.maxtemp_f}</Card>)
            return (
              <div>
                <Card style={{ backgroundColor: '#ffcc33' }}>
                  <h2 className="title">
                    <font color="gray">Today's Weather</font>
                  </h2>
                </Card>
                <ListGroup className="title">
                  <ListGroup.Item style={{ backgroundColor: "#e7f4f9" }}>
                    <span className="text-muted" style={{ fontSize: "18px" }}>Condition: </span>
                    <img src={data.condition_icon}/> {data.condition} 
                  </ListGroup.Item>
                  <ListGroup.Item style={{ backgroundColor: "#e7f4f9" }}>
                    <span className="text-muted" style={{ fontSize: "18px" }}>Max Temperature: </span>
                    {data.maxtemp_f}&deg;F  /  {data.maxtemp_c}&deg;C
                  </ListGroup.Item>
                  <ListGroup.Item style={{ backgroundColor: "#e7f4f9" }}>
                    <span className="text-muted" style={{ fontSize: "18px" }}>Min Temperature: </span>
                     {data.mintemp_f}&deg;F  /  {data.mintemp_c}&deg;C
                  </ListGroup.Item>
                  <ListGroup.Item style={{ backgroundColor: "#e7f4f9" }}>
                    <span className="text-muted" style={{ fontSize: "18px" }}>Max Windspeed: </span>
                    {data.maxwind_mph} MPH  /  {data.maxwind_kph} KPH
                  </ListGroup.Item>
                </ListGroup>
              </div>
            );
          })}
        </div>
      </Card>
      <Card.Body>
        <Link to={`/weather/${props.city}`}>
          <Card.Title class="title">View Weekly Weather Data</Card.Title>
        </Link>
      </Card.Body>
    </div>
  );
};

export default WeatherTile;
