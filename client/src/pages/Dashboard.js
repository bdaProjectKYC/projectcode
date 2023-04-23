import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../lib/http";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ConcertTile from "../components/ConcertTile";
import NewsTile from "../components/NewsTile";
import PlacesTile from "../components/PlacesTile";
import WeatherTile from "../components/WeatherTile";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

const Dashboard = () => {
  const { city } = useParams();

  // Initialize state variables
  const [concerts, setConcerts] = useState([]);
  const [places, setPlaces] = useState([]);
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    async function fetchConcertsData() {
      const { data } = await http.get(`/concerts/${city}`);
      setConcerts(data.data.concerts.events);
    }
    async function fetchPlacesData() {
      const { data } = await http.get(`/placesToVisit/${city}`);
      setPlaces(data.data.places.places);
    }
    async function fetchNewsData() {
      const { data } = await http.get(`/news/${city}`);
      setNews(data.data.news.articles);
    }
    async function fetchWeatherData() {
      const { data } = await http.get(`/weather/${city}`);
      setWeather(data.data.weather.forecast);
    }
    fetchConcertsData();
    fetchPlacesData();
    fetchNewsData();
    fetchWeatherData();
  }, []);

  return (
    <>
      <div>
        <h1 class="title">{city}</h1>
      </div>
      <Container>
        <Row>
          <Col>
            <div>
              <Card>
                <ConcertTile concerts={concerts} city={city} />
              </Card>
            </div>
          </Col>
          <Col>
            <div>
              <Card>
                <NewsTile news={news} city={city} />
              </Card>
            </div>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <div>
              <Card>
                <PlacesTile places={places} city={city} />
              </Card>
            </div>
          </Col>
          <Col>
            <div>
              <Card>
                <WeatherTile weather={weather} city={city} />
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
