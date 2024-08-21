import React from 'react';
import Card from 'react-bootstrap/Card';
import './../App.css';

const Footer = () => {
  return (
    <Card className="footer opacity-50">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p> Our team name is GamjaNet. </p>
          <footer className="blockquote-footer">
            But the real team name is O-Gamja.{' '}
            <cite title="Source Title">One person is hiding.</cite>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export default Footer;
