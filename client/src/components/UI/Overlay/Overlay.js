import React from 'react';
import classes from './Overlay.module.css';

const overlay = props => {
  const classList = [classes.Overlay];
  if (!props.show) classList.push('Hide');
  return <div className={classList.join(' ')} />;
};

export default overlay;
