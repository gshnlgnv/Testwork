import React from 'react';
import './Table.css';
import {connect} from 'react-redux';
import {deleteRow, isEdit, updateInputRow} from './actions';
import {bindActionCreators} from "redux";

let inputEditRef = React.createRef();

function Table(props) {
    const editButton = (idNumber) => {
        if (props.isEditRow) {
            return (<button onClick={() => {
                props.isEdit()
            }}>save
            </button>)
        } else {
            return (<button onClick={() => {
                props.isEdit(idNumber);
            }}>edit
            </button>)
        }
    };

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
            {props.data.map(row => (
                <tr key={row[0].value}>
                    {row.map(col => {
                            if (props.isEditRow && col.field !== "ID") {
                                let inputEditRef = React.createRef();
                                if (row[0].value === props.idToEdit) {
                                    return <td key={col.value}>
                                        <input
                                            defaultValue={col.value}
                                            type="text"
                                            ref={inputEditRef}
                                            onChange={() => props.updateInputRow(props.idToEdit, col.field, inputEditRef.current.value)}
                                        />
                                    </td>
                                }
                            }
                            return <td key={col.value}>{col.value}</td>
                        }
                    )}
                    <td>
                        <button onClick={() => {
                            props.deleteRow(row[0].value);
                        }}>
                            delete
                        </button>
                    </td>
                    <td>
                        {editButton(row[0].value)}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

const mapStateToProps = (state) => ({
    data: state.dataReducer.data,
    isEditRow: state.dataReducer.isEdit,
    idToEdit: state.dataReducer.idToEdit,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({deleteRow, isEdit, updateInputRow}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
