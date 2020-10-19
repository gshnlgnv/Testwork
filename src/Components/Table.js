import React from 'react';
import './Table.css';
import {connect} from 'react-redux';
import { deleteRow } from './actions';
import {bindActionCreators} from "redux";

function Table(props) {

    console.log("item = ", props.data);

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
                        <td key={Date.now() + row.value}>{row.value}</td>
                    ))}

                    <td>
                        <button onClick={ () => {
                            console.log(item[0].value);
                            props.deleteRow(item[0].value);
                        }  }>delete</button>
                    </td>
                    <td><button>edit</button></td>
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
    return bindActionCreators( {deleteRow}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
