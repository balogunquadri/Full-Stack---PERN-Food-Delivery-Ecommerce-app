import React from 'react';
import classes from './Footer.module.css';

const footer = props => (
  <footer className={classes.Footer}>
    <p>
      &copy; 2020 Copyright. <span className="Red">Foodie</span>.
    </p>
  </footer>
);

export default footer;
