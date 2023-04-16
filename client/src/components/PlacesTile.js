import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const PlacesTile = (props) => {
  return (
    <div>
      <h1 class="title">Places</h1>
      <Card>
        <div style={{ height: "250px", width: "100%" }}>
          <h1 className="title">TODO</h1>
        </div>
      </Card>
      <Card.Body>
        <Link to={`/placesToVisit/${props.city}`}>
          <Card.Title class="title">View Places to Visit</Card.Title>
        </Link>
      </Card.Body>
    </div>
  );
};

export default PlacesTile;
