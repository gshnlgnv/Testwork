import React, {useEffect} from 'react';
import './Table.css';
import {connect} from 'react-redux';
import {deleteRow, isEdit, updateInputRow, saveChanges} from './actions';
import {bindActionCreators} from "redux";

function Table(props) {

    //TODO : УБРАТЬ УЖАСНЫЙ КОЛХОЗ !!!!!
    // проверить как можно обыграть сбор данных для отправки
    // и проверить саму отправку )

    const collectingDataForUpload =(idNumber) => {
        let objToSend = [];

        props.data.map( item => {
            const [id] = item;
            if (id.value === idNumber) {

                for (let i = 0; i < item.length ; i++) {
                    console.log("item.value", item[i].value);
                    objToSend.push(item[i].value);
                }
                return objToSend;
            }
            return objToSend;
        });
        return objToSend;
    };


    const editButton = (idNumber) => {
       // let objToSend = [];

        if (props.isEditRow) {
            return <button onClick={() => {
                props.isEdit();

            //     props.data.map( item => {
            //         const [id] = item;
            //         if (id.value === idNumber) {
            //
            //             for (let i = 0; i < item.length ; i++) {
            //                 console.log("item.value", item[i].value);
            //                 objToSend.push(item[i].value);
            //             }
            //             return objToSend;
            //         }
            //
            //         props.saveChanges(objToSend[0], objToSend[1], objToSend[2], objToSend[3], objToSend[4]);
            //
            // })

                const a = collectingDataForUpload(idNumber);
                props.saveChanges(a[0], a[1], a[2], a[3], a[4]);

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
    )
}

const mapStateToProps = (state) => ({
    data: state.dataReducer.data,
    isEditRow: state.dataReducer.isEdit,
    idToEdit: state.dataReducer.idToEdit,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({deleteRow, isEdit, updateInputRow, saveChanges}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
