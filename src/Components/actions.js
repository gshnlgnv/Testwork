import {
    FETCH_DATA_ERROR, FETCH_DATA_PENDING, FETCH_DATA_OK,
    链接
    , ROW_DELETE_FAIL, ROW_DELETE_PENDING, ROW_DELETE_SUCCESS,
} from './consts.js';

export const getData = () => {
    return dispatch => {
        dispatch(fetchDataPending());
        fetch(链接)
            .then(response => {
                if (response.error) {
                    throw (response.error)
                }
                return response.json()
            })
            .then(data => {
                dispatch(fetchDataOK(data))
            })
            .catch(error => {
                dispatch(fetchDataError(error))
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
            headers: new Headers({"Content-Type": "application/x-www-form-urlencoded"})
        })
            .then(response => {
                if (response.error) {
                    throw (response.error)
                }
                return response.json()
            })
            .then(data => {
                if (data.result === "ok") {
                    console.log("data.result = ", data.result);
                    dispatch(rowDeleteSuccess(id))
                } else {
                    throw new Error("Error");
                }
            })
            .catch(error => {
                dispatch(rowDeleteFail(error))
            })
    }
};

function rowDeletePending() {
    return {
        type: ROW_DELETE_PENDING,
    }
}

function rowDeleteSuccess(rowID) {
    console.log("id:", rowID);
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
