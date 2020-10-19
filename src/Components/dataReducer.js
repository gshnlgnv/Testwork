import {
    FETCH_DATA_ERROR, FETCH_DATA_PENDING, FETCH_DATA_OK,
    ROW_DELETE_FAIL, ROW_DELETE_PENDING, ROW_DELETE_SUCCESS,
} from './consts';

const initialState = {
    data: [],
    actionChecking: null,
};

export const dataReducer = (state = initialState, action) => {

    console.log("data =", state.data);

    switch (action.type) {
        case FETCH_DATA_PENDING:
            return {
                ...state,
                pending: true,
            };
        case FETCH_DATA_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case FETCH_DATA_OK:
            return {
                ...state,
                data: action.payload,
            };
        case ROW_DELETE_FAIL:
            return {
                ...state,
                error: action.error,
            };
        case ROW_DELETE_PENDING:
            return {
                ...state,
                pending: true,
            };
        case ROW_DELETE_SUCCESS:
            return {
              ...state,
                data: state.data.map( item => {
                    item.map( row => row.value !== action.payload)
                })
            };
        default:
            return state;
    }
};