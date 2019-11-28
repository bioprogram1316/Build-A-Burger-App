import React from 'react';

import classes from './Order.module.css';

const order = (props) => { 
    // transform ingredients from object to array
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName, 
            amount: props.ingredients[ingredientName]
        });
    }
// format ingredient output
    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '5px' 
            }} 
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    return (
        <div className={classes.Order} >
            <p><strong>Ingredients:</strong> {ingredientOutput}</p>
            <p><strong>Price: $ {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;