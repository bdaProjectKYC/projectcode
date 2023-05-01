import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
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
      <Card.Body className="d-flex justify-content-center">
        <Button href={`/placesToVisit/${props.city}`} className="title">
          View all Places to Visit
        </Button>
      </Card.Body>
    </div>
  );
};

export default PlacesTile;
