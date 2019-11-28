import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
    // only the link that exactly matches the path is active
    <li className={classes.NavigationItem}>
        <NavLink 
            to={props.link} 
            exact={props.exact}
            activeClassName={classes.active}>{props.children}
        </NavLink>
    </li>
);

export default navigationItem;