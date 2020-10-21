import {
    FETCH_DATA_ERROR, FETCH_DATA_PENDING, FETCH_DATA_OK,
    ROW_DELETE_FAIL, ROW_DELETE_PENDING, ROW_DELETE_SUCCESS,
    IS_EDIT_ROW, EDIT_ROW_MESSAGE,
    SORT_DATA_NAME, SORT_DATA_ID,
    ASC, DESC,
} from './consts';

const initialState = {
    data: [],
    actionChecking: null,
    isEdit: false,
    idToEdit: null,
    sorting: null,
};

const sortingNameFunc = (sorting, a, b) => {
    if (sorting === ASC) {
        if (a[1].value < b[1].value) return -1;
        if (a[1].value > b[1].value) return 1;
        return 0
    } else if (sorting === DESC) {
        if (a[1].value > b[1].value) return -1;
        if (a[1].value < b[1].value) return 1;
        return 0;
    }
};

const sortingIDFunc = (sorting, a, b) => {
    if (sorting === ASC) {
        if (a[0].value < b[0].value) return -1;
        if (a[0].value > b[0].value) return 1;
        return 0
    } else if (sorting === DESC) {
        if (a[0].value > b[0].value) return -1;
        if (a[0].value < b[0].value) return 1;
        return 0;
    }
};

export const dataReducer = (state = initialState, action) => {
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
                data: state.data.filter(item => {
                    const [id] = item;
                    return id.value !== action.payload
                }),
            };
        case IS_EDIT_ROW:
            return {
                ...state,
                isEdit: (state.isEdit) ? false : true,
                idToEdit: action.payload,
            };
        case EDIT_ROW_MESSAGE:
            return {
                ...state,
                data: state.data.map(item => {
                    const [id] = item;
                    if (id.value === action.id) {
                        item.map(obj => {
                            if (obj.field === action.column) {
                                return obj.value = action.newMessage;
                            }
                        })
                    }
                    return item;
                }),
            };
        case SORT_DATA_NAME:
            return {
                ...state,
                data: state.data.concat().sort(sortingNameFunc.bind(this, state.sorting)),
                sorting: state.sorting === ASC ? DESC : ASC,
            };
        case SORT_DATA_ID:
            return {
                ...state,
                data: state.data.concat().sort(sortingIDFunc.bind(this, state.sorting)),
                sorting: state.sorting === ASC ? DESC : ASC,
            };
        default:
            return state;
    }
};
