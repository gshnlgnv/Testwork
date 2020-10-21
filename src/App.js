import React from 'react';
import './App.css';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getData} from "./Components/actions.js";
import Table from "./Components/Table.js";


function App(props) {
    const showTable = () => {
        if (props.data.length > 0) {
            return <Table/>
        }
        return "No data"
    };

    const showRowsQuantity = () => {
        return <div>
            Rows quantity is {props.data.length}
        </div>
    };

    return (
        <div>
            <div>
                <button onClick={() => props.getData()}>
                    get data
                </button>
            </div>
            <div>
                {showTable()}
            </div>
            <div>
                {showRowsQuantity()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    data: state.dataReducer.data,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getData}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
