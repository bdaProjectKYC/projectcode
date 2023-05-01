import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

const NewsTile = (props) => {
  return (
    <div>
      <h1 class="title">News</h1>
      <Card>
        <Carousel interval={2000}>
          {props.news.slice(0, 5).map((article, key) => {
            return (
              <Carousel.Item>
                <img
                  src={`https://static01.nyt.com/${article.imageUrl}`}
                  alt=""
                  style={{ height: "250px", width: "100%" }}
                />
                <Carousel.Caption>
                  <p>{article.title}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Card>
      <Card.Body className="d-flex justify-content-center">
        <Button href={`/concerts/${props.city}`} className="title">
          View all News Article
        </Button>
      </Card.Body>
    </div>
  );
};

export default NewsTile;
