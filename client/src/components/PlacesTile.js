import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const PlacesTile = (props) => {
  return (
    <div>
      <h1 class="title">Places To Visit</h1>
      <Card>
        <Carousel interval={2000}>
          {props.places.slice(0, 5).map((place, key) => {
            return (
              <Carousel.Item>
                <img
                  src={place.imageUrl}
                  alt=""
                  style={{ height: "250px", width: "100%" }}
                />
                <Card.Text>
                  <h3 className="title">
                    <font color="gray">{place.name}</font>
                  </h3>
                </Card.Text>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Card>
      <Card.Body>
        <Link to={`/placesToVisit/${props.city}`}>
          <Card.Title class="title">View all Places to Visit</Card.Title>
        </Link>
      </Card.Body>
    </div>
  );
};

export default PlacesTile;
