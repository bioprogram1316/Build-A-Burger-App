import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }

export class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
       // ingredients: null,
       // totalPrice: 4,
        //purchasable: false,
        purchasing: false//,
        // loading: false,
        // error: false
    }

    componentDidMount () {
        this.props.onInitIngredients();
    }

    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients)
            // change object into an array of the number of each ingredient
            .map(igKey => {
                return ingredients[igKey];
            })
            // sum the number of individual ingredients
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        // set purchasable to true if you have more than one ingredient present
        // this.setState({purchaseable: sum>0});
        return sum > 0; 
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        // //alert('You continue!');
        
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     // encodeURIComponent encodes elements so that they can be used in the URL
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout'
            // {
            // pathname: '/checkout',
            // search: '?' + queryString
            // }
        );
    }

    render () {
        const disableInfo = {
            ...this.props.ingrs
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        
        if (this.props.ingrs) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingrs} />
                    <BuildControls 
                            ingredientAdded={this.props.onAddIngredient}
                            ingredientRemoved={this.props.onRemoveIngredient}
                            disabled={disableInfo} 
                            purchasable={this.updatePurchaseState(this.props.ingrs)}
                            ordered={this.purchaseHandler}
                            isAuth={this.props.isAuthenticated}
                            price={this.props.price}
                            />
                </Aux>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ingrs}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingrs: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingType) => dispatch(actions.addIngredient(ingType)),
        onRemoveIngredient: (ingType) => dispatch(actions.removeIngredient(ingType)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));