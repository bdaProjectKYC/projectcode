import React from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

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
      <Card.Body>
        <Link to={`/news/${props.city}`}>
          <Card.Title class="title">View all News Articles</Card.Title>
        </Link>
      </Card.Body>
    </div>
  );
};

export default NewsTile;
