import {
    FETCH_DATA_ERROR, FETCH_DATA_PENDING, FETCH_DATA_OK,
    ROW_DELETE_FAIL, ROW_DELETE_PENDING, ROW_DELETE_SUCCESS,
    IS_EDIT_ROW, EDIT_ROW_MESSAGE,
    SORT_DATA_NAME, SORT_DATA_ID,
    ASC, DESC,
    MODAL_IS_OPEN,
    ADD_NEW_ITEM, ADD_NEW_ITEM_SUCCESS,
    SAVE_CHANGES_SUCCESS,
} from './consts';

const initialState = {
    data: [],
    actionChecking: null,
    isEdit: false,
    idToEdit: null,
    sorting: null,
    modalIsOpen: false,
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
        case SAVE_CHANGES_SUCCESS:

            console.log(action.id);
            console.log(action.column);
            console.log(action.newMessage);

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
        case MODAL_IS_OPEN:
            return {
                ...state,
                modalIsOpen: state.modalIsOpen ? false : true,
            };
        case ADD_NEW_ITEM_SUCCESS:
            const newPerson = [[
                {field: "ID", value: Date.now(), type: "integer"},
                {field: "Name", value: action.name, type: "string"},
                {field: "Age", value: +action.age, type: "integer"},
                {field: "Phone", value: action.telephone, type: "string"},
                {field: "E-mail", value: action.email, type: "string"},
                ]];
            return {
               ...state,
                data: state.data.concat(newPerson),
            };
        default:
            return state;
    }
};
