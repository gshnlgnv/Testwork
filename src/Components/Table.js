import React from 'react';
import './Table.css';
import {connect} from 'react-redux';
import {deleteRow, isEdit, saveChanges, sortDataName, sortDataID, updateInputRow} from './actions';
import {bindActionCreators} from "redux";
import AddNew from '../Components/AddNew';

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
            return <button
                className="button save"
                onClick={() => {
                const arrDataUpdateToServer = collectingDataForUpload(idNumber);
                props.saveChanges(arrDataUpdateToServer[0], arrDataUpdateToServer[1], arrDataUpdateToServer[2], arrDataUpdateToServer[3], arrDataUpdateToServer[4]);
                props.isEdit();
            }}>
                Сохранить
            </button>
        } else {
            return <button
                className="button edit"
                onClick={() => props.isEdit(idNumber)}
            >
                И
            </button>
        }
    };

    return (
        <div>
            <AddNew/>
            <table>
                <thead>
                <tr>
                    <th onClick={() => props.sortDataID()}>ID</th>
                    <th onClick={() => props.sortDataName()}>Имя</th>
                    <th>Возраст</th>
                    <th>Телефон</th>
                    <th>Почта</th>
                    <th>Удалить</th>
                    <th>Изменить</th>
                </tr>
                </thead>
                <tbody>
                {props.data.map(row => (
                    <tr key={row[0].value}>
                        {row.map(col => {
                                if (props.isEditRow && col.field !== "ID") {
                                    let inputEditRef = React.createRef();

                                    //todo: map "save" button only for chosen ID

                                    if (row[0].value === props.idToEdit) {
                                        return <td key={col.value}>
                                            <input
                                                autoFocus
                                                defaultValue={col.value}
                                                type="text"
                                                ref={inputEditRef}
                                                onChange={() => {
                                                    props.updateInputRow(props.idToEdit, col.field, inputEditRef.current.value);
                                                }}
                                            />
                                        </td>
                                    }
                                }
                                return (
                                    <td key={col.value}>{col.value}</td>

                                )

                            }
                        )}
                        <td>
                            <button
                                className="button delete"
                                onClick={() => props.deleteRow(row[0].value)}
                            >
                                У
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
    sorting: state.dataReducer.sorting,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            deleteRow,
            isEdit,
            saveChanges,
            sortDataName,
            sortDataID,
            updateInputRow
        },
        dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
