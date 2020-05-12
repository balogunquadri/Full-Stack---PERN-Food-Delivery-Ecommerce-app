import React from 'react';
import { Link } from 'react-router-dom';
import classes from './HomeBanner.module.css';

const homeBanner = props => {
  const textClasses = [classes.Banner__text, classes.Home__Banner__text].join(' ');
  let menuLink = '/login';
  if (props.userAuthenticated) {
    menuLink = '/menu';
  } else if (props.catererAuthenticated) {
    menuLink = '/admin/';
  }
  return (
    <main>
      <section className={classes.Banner}>
        <p className={textClasses}>
          “ Your No 1 Online Food <span className="Red">Marketplace</span>
        </p>
        <p className={textClasses}>
          Always with the <span className="Red">Quality</span> you deserve ”
        </p>
        <Link to={menuLink} className={['Btn', classes.Banner__button].join(' ')}>
          Order Your Food
        </Link>
      </section>
    </main>
  );
};

export default homeBanner;
