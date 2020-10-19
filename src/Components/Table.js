import React from 'react';
import './Table.css';
import {connect} from 'react-redux';
import {deleteRow, isEdit, updateInputRow} from './actions';
import {bindActionCreators} from "redux";

function Table(props) {
    const inputEditRef = React.createRef();

    const editButton = () => {
        if (props.isEditRow) {
            return (<button onClick={() => {
                props.isEdit()
            }}>save
            </button>)
        } else {
            return (<button onClick={() => {
                props.isEdit()
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
            {props.data.map(item => (
                <tr key={Date.now() + item[0].value}>
                    {item.map(row => (
                        (props.isEditRow && row.field !== "ID")
                            ?
                            <td key={Date.now() + row.value}>
                                <input
                                    defaultValue={row.value}
                                    type="text"
                                    ref={inputEditRef}
                                    onChange={() => {
                                    console.log("i am editing");
                                    updateInputRow(inputEditRef.current.value)
                                    //editingRow()
                                }}/>
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
                        {editButton()}
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
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({deleteRow, isEdit}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
