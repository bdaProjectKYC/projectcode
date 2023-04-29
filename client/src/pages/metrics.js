import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import http from '../lib/http';

const Metrics = () => {
  const [concerts, setMetrics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await http.get(`/metrics`);
      setMetrics(data);
    }
    fetchData();
  });

  const metrics = () => {
      return (
        {metrics}
      );
  };

  return (
    <Container className="my-5" style={{ maxWidth: '1200px' }}>
      <h2 className="text-center">Metrics</h2>
      <br></br>
      <br></br>
      <Row xs={1} md={5} className="g-5">
        {metrics()}
      </Row>
    </Container>
  );
};

export default Metrics;
