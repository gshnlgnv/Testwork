import {
    FETCH_DATA_ERROR, FETCH_DATA_PENDING, FETCH_DATA_OK,
    链接,
    ROW_DELETE_FAIL, ROW_DELETE_PENDING, ROW_DELETE_SUCCESS,
    IS_EDIT_ROW, EDIT_ROW_MESSAGE,
    SAVE_CHANGES_PENDING, SAVE_CHANGES_SUCCESS, SAVE_CHANGES_ERROR,
    SORT_DATA_NAME, SORT_DATA_ID,
    MODAL_IS_OPEN,
    ADD_NEW_ITEM_FAIL, ADD_NEW_ITEM_PENDING, ADD_NEW_ITEM_SUCCESS
} from './consts.js';

export const getData = () => {
    return dispatch => {
        dispatch(fetchDataPending());
        fetch(链接)
            .then(response => {
                if (response.error) {
                    throw (response.error);
                }
                return response.json();
            })
            .then(data => {
                dispatch(fetchDataOK(data));
            })
            .catch(error => {
                dispatch(fetchDataError(error));
            })
    }
};

function fetchDataPending() {
    return {
        type: FETCH_DATA_PENDING,
    }
}

function fetchDataOK(data) {
    return {
        type: FETCH_DATA_OK,
        payload: data,
    }
}

function fetchDataError(error) {
    return {
        type: FETCH_DATA_ERROR,
        payload: error,
    }
}

export const deleteRow = (id) => {
    return dispatch => {
        dispatch(rowDeletePending());
        fetch(链接, {
            method: "POST",
            body: new URLSearchParams({
                method: "delete",
                id,
            }).toString(),
            headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"}),
        })
            .then(response => {
                if (response.error) {
                    throw (response.error);
                }
                return response.json();
            })
            .then(data => {
                if (data.result === "ok") {
                    dispatch(rowDeleteSuccess(id));
                } else {
                    throw new Error("Error");
                }
            })
            .catch(error => {
                dispatch(rowDeleteFail(error));
            })
    }
};

function rowDeletePending() {
    return {
        type: ROW_DELETE_PENDING,
    }
}

function rowDeleteSuccess(rowID) {
    return {
        type: ROW_DELETE_SUCCESS,
        payload: rowID,
    }
}

function rowDeleteFail(error) {
    return {
        type: ROW_DELETE_FAIL,
        payload: error,
    }
}

export const isEdit = (id) => {
    return {
        type: IS_EDIT_ROW,
        payload: id,
    }
};

export const saveChanges = (id, name, age, phone, email) => {
    return dispatch => {
        dispatch(saveChangesPending());
        fetch(链接, {
            method: "POST",
            body: new URLSearchParams({
                method: "update",
                id,
                name,
                age,
                phone,
                email
            }).toString(),
            headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"})
        })
            .then(response => {
                if (response.error) {
                    throw (response.error);
                }
                return response.json()
            })
            .then(data => {
                if (data.result === "ok") {
                    dispatch(saveChangesSuccess(id, name, age, phone, email)) // ??
                } else {
                    throw new Error("Error");
                }
            })
            .catch(error => {
                dispatch(saveChangesFail(error));
            })
    }
};

function saveChangesPending() {
    return {
        type: SAVE_CHANGES_PENDING,
    }
}

function saveChangesSuccess(newInputMessage, id, column) {  // ??
    return {
        type: SAVE_CHANGES_SUCCESS,
        newMessage: newInputMessage,
        id: id,
        column: column,
    }
}

function saveChangesFail(error) {
    return {
        type: SAVE_CHANGES_ERROR,
        payload: error,
    }
}

export const updateInputRow = (id, column, newInputMessage) => {
    return {
        type: EDIT_ROW_MESSAGE,
        newMessage: newInputMessage,
        id: id,
        column: column,
    }
};

export const sortDataName = () => {
    return {
        type: SORT_DATA_NAME,
    }
};

export const sortDataID = () => {
    return {
        type: SORT_DATA_ID,
    }
};

export const ModalIsOpen = () => {
    return {
        type: MODAL_IS_OPEN,
    }
};

export const AddNewItem = (name, age, phone, email) => {
    return dispatch => {
        dispatch(AddNewItemPending());
        fetch(链接, {
            method: "POST",
            body: new URLSearchParams({
                method: "add",
                name,
                age,
                phone,
                email
            }).toString(),
            headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"})
        })
            .then(response => {
                if (response.error) {
                    throw (response.error);
                }
                return response.json()
            })
            .then(data => {
                if (data.result === "ok") {
                    dispatch(AddNewItemSuccess(name, age, phone, email))
                } else {
                    throw new Error("Error");
                }
            })
            .catch(error => {
                dispatch(AddNewItemFail(error));
            })
    }
};

function AddNewItemPending() {
    return {
        type: ADD_NEW_ITEM_PENDING,
    }
}

function AddNewItemSuccess(nameRef, ageRef, telephoneRef, emailRef) {
    return {
        type: ADD_NEW_ITEM_SUCCESS,
        name: nameRef,
        age: ageRef,
        telephone: telephoneRef,
        email: emailRef,
    }
}

function AddNewItemFail(error) {
    return {
        type: ADD_NEW_ITEM_FAIL,
        payload: error,
    }
}
