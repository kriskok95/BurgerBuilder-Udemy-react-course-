import * as actionTypes from '../actions/actionTypes';
import { updateObject } from './utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const burgerStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const burgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const burgerFail = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false,
    });
};

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return burgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return burgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return burgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    };
};

export default reducer;