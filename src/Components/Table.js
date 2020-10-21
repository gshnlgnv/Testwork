import React from 'react';
import './Table.css';
import {connect} from 'react-redux';
import {deleteRow, isEdit, updateInputRow, saveChanges, sortDataName, sortDataID} from './actions';
import {bindActionCreators} from "redux";

function Table(props) {
    const collectingDataForUpload = (idNumber) => {
        let arrToServer = [];

        props.data.map(item => {
            const [id] = item;
            if (id.value === idNumber) {
                for (let i = 0; i < item.length; i++) {
                    arrToServer.push(item[i].value);
                }
            }
        });
        return arrToServer;
    };

    const editButton = (idNumber) => {
        if (props.isEditRow) {
            return <button onClick={() => {
                const arrDataUpdateToServer = collectingDataForUpload(idNumber);
                props.isEdit();
                props.saveChanges(arrDataUpdateToServer[0], arrDataUpdateToServer[1], arrDataUpdateToServer[2], arrDataUpdateToServer[3], arrDataUpdateToServer[4]);
            }}>
                save
            </button>
        } else {
            return <button onClick={() => {
                props.isEdit(idNumber);
            }}>edit
            </button>
        }
    };

    return (
        <div>

            <table>
                <thead>
                <tr>
                    <th onClick={() => props.sortDataID()}>ID</th>
                    <th onClick={() => props.sortDataName()}>Name</th>
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
                                                autoFocus
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
        </div>

    )
}

const mapStateToProps = (state) => ({
    data: state.dataReducer.data,
    isEditRow: state.dataReducer.isEdit,
    idToEdit: state.dataReducer.idToEdit,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            deleteRow,
            isEdit,
            updateInputRow,
            saveChanges,
            sortDataName,
            sortDataID
        },
        dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
