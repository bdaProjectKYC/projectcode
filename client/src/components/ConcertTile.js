import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const ConcertTile = (props) => {
  return (
    <div>
      <h1 class="title">Concerts</h1>
      <Card>
        <Carousel interval={2000}>
          {props.concerts.slice(0, 5).map((concert, key) => {
            return (
              <Carousel.Item>
                <img
                  src={concert.images.slice(0, 1).map((image, id) => {
                    return image;
                  })}
                  alt=""
                  style={{ height: "250px", width: "100%" }}
                />
                <Carousel.Caption>
                  <p>{concert.name}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Card>
      <Card.Body>
        <Link to={`/concerts/${props.city}`}>
          <Card.Title class="title">View all Concerts</Card.Title>
        </Link>
      </Card.Body>
    </div>
  );
};

export default ConcertTile;
