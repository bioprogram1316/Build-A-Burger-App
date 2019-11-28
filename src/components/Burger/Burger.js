import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    // transforms object of key/value pairs into an array of burger ingredients 
    // where the value of the object is important to decide how many ingredients are needed
    // and the key is important for which type of ingredient is needed
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        }) // flattens the resulting array, either empty or contains the jsx elements
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient  type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient  type="bread-bottom" />
        </div>
    );
};

export default burger;