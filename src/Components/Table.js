import React from 'react';
import './Table.css';
import {connect} from 'react-redux';
import {deleteRow} from './actions';
import {bindActionCreators} from "redux";

function Table(props) {

    const isEdit = true;

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Delete</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {props.data.map(item => (
                    <tr key={Date.now() + item[0].value}>
                        {item.map(row => (

                            (isEdit && row.field !== "ID")
                                ?
                                <td key={Date.now() + row.value}>
                                    <input value={row.value} onChange={ () => {
                                        console.log("i am editing");
                                        editingRow()
                                    } }/>
                                </td>
                                :
                                <td key={Date.now() + row.value}>{row.value}</td>


                        ))}
                        <td>
                            <button onClick={() => {
                                props.deleteRow(item[0].value);
                            }}>
                                delete
                            </button>
                        </td>
                        <td>
                            <button onClick={() => {
                                console.log(item[0].value);
                            }}>edit
                            </button>
                        </td>
                    </tr>
            ))}
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => ({
    data: state.dataReducer.data,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({deleteRow}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
