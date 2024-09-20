import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Login.css'; // For custom styles

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded user credentials
    if (username === 'demo' && password === 'password123') {
      const user = { username: 'demo', name: 'Demo User' };

      // Dispatch the hardcoded user to Redux
      dispatch(setUser(user));

      // Navigate to the dashboard after successful login
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

 
  return (
    <Container >
      <Row className="mt-5 justify-content-center">
        <Col md={8} lg={4} className="p-4 shadow rounded" style={{ backgroundColor: '#fff' }}>
          <h1 className="text-center mb-4" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
            DeckBook
          </h1>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" style={{ padding: '10px 0' }}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;