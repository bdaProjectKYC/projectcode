import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

const WeatherTile = (props) => {
  return (
    <div>
      <h1 class="title">Weather</h1>
      <Card>
        <div style={{ height: "250px", width: "100%" }}>
          {props.weather.slice(-1).map((data, index) => {
            // return (<Card>Condition: {data.condition}</Card>
            // <Card>Max Temperature:{data.maxtemp_f}</Card>)
            return (
              <div>
                <Card>
                  <h3 className="title">
                    <font color="gray">Weather Today</font>
                  </h3>
                </Card>
                <ListGroup className="title">
                  <ListGroup.Item>
                    <span className="text-muted">Condition: </span>
                    {data.condition}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="text-muted">Max Temperature(F): </span>
                    {data.maxtemp_f}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <span className="text-muted">Min Temperature: </span>
                    {data.mintemp_f}
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
