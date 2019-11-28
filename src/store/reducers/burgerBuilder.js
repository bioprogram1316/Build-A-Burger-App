import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const addIngredient = (state, action) => {
    const updatedAddIngredient = { [action.ingredientType]: state.ingredients[action.ingredientType] + 1 };        
    const updatedAddIngredients = updateObject(state.ingredients, updatedAddIngredient);
    const updatedAddState = {
        ingredients: updatedAddIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
        building: true
    }
    return updateObject(state, updatedAddState);
};

const removeIngredient = (state, action) => {
    const updatedRemoveIngredient = { [action.ingredientType]: state.ingredients[action.ingredientType] + 1 };
    const updatedRemoveIngredients = updateObject(state.ingredients, updatedRemoveIngredient);
    const updatedRemoveState = {
        ingredients: updatedRemoveIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
        building: true
    }
    return updateObject(state, updatedRemoveState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            //this.updatePurchaseState(updatedIngredients);
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            if (state.ingredients[action.ingredientType] <= 0) {
                return;
            }
            //this.updatePurchaseState(updatedIngredients);
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
};

export default reducer;