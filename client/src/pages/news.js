import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import http from "../lib/http";
import { Link } from "react-router-dom";
import NewsChart from "../components/NewsChart";

const News = () => {
  const [news, setNews] = useState([]);
  const [newsAnalysis, setNewsAnalysis] = useState([]);
  const { city } = useParams();
  // Fetch news from API
  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(`/news/${city}`);
      setNews(data.data.news);
      setNewsAnalysis(data.analysis.newsAnalysis);
    }
    fetchData();
  }, []);

  const RenderArticles = () => {
    if (news.articles) {
      return news.articles.map((article) => {
        return (
          <Container style={{ padding: 10 }}>
            <Row>
              <Col style={{ flex: 3 }}>
                <Link to={article.webUrl}>
                  <h5>{article.title}</h5>
                </Link>
                <p>{article.snippet}</p>
                <small>
                  {article.pubDate.slice(5, 7)}/{article.pubDate.slice(8, 10)}/
                  {article.pubDate.slice(0, 4)}
                </small>
              </Col>
              <Col style={{ flex: 1 }}>
                <img
                  src={`https://static01.nyt.com/${article.imageUrl}`}
                  style={{ width: "100%" }}
                />
              </Col>
            </Row>
          </Container>
        );
      });
    }
  };

  return (
    <Container className="my-5">
      <h1 className="text-center">News From: {city}</h1>
      <Row>
        <Col style={{ maxWidth: "300px", position: "fixed" }}>
          <div>
            <NewsChart newsAnalysis={newsAnalysis} />
          </div>
        </Col>
        <Col style={{ paddingLeft: "300px" }}>{RenderArticles()}</Col>
      </Row>
    </Container>
  );
};

export default News;
