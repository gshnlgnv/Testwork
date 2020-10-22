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
        return <h5>Данных нет</h5>
    };

    const showRowsQuantity = () => {
        return <div className="rows_quantity_info">
            <h5>Количество строк в таблице: {props.data.length}</h5>
        </div>
    };

    return (
        <div className="wrapper">
            <div className="inner_wrapper">
                <div className="header">
                    <div>
                        <h3>Тестовая задача</h3>
                    </div>
                    <div>
                        <button
                            className="button"
                            onClick={() => props.getData()}>
                            Загрузить данные
                        </button>
                    </div>
                </div>
                <div>
                    {showTable()}
                </div>
                <div>
                    {showRowsQuantity()}
                </div>
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
