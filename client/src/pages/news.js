import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import http from '../lib/http';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { useSearchParams, Link, useLocation } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';

const News = () => {
const [news, setNews] = useState([]);
const { city } = useParams();
  // Fetch news from API
  useEffect(() => {
    async function fetchData() {
      const {data} = await http.get(`/news/${city}`);
      setNews(data.data.news);
    }
    fetchData();
  }, []);

  const RenderArticles = () =>{
    if(news.articles){ 
        return news.articles.map((article)=>{
            return <Container style={{padding:10}}> 
            
                <Row>
                    <Col style={{flex:3}}>
                    <Link to={article.webUrl}>
                        <h5>{article.title}</h5>
                    </Link>
                    <p>{article.snippet}</p>
                    <small>{article.pubDate.slice(5,7)}/{article.pubDate.slice(8,10)}/{article.pubDate.slice(0,4)}</small>
                    </Col>
                    <Col style={{flex:1}}>
                        <img src={`https://static01.nyt.com/${article.imageUrl}`} 
                        style={{ width: "100%"}}/>

                    </Col>
                </Row>
            </Container>
            
            
        })
  }
}

  return (
    <Container className="my-5" style={{ maxWidth: '800px' }}>
      <h1 className="text-center">News From: {city}</h1>
      {RenderArticles()}
    </Container>
  );
};

export default News;