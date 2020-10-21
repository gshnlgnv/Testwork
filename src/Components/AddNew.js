import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Modal from 'react-modal';
import {ModalIsOpen, AddNewItem} from './actions';

function AddNew(props) {
    let nameRef = React.createRef();
    let ageRef = React.createRef();
    let telephoneRef = React.createRef();
    let emailRef = React.createRef();

    const checkingInputs =()=> {
        if (nameRef.current.value && ageRef.current.value && telephoneRef.current.value && emailRef.current.value) {
            props.AddNewItem(nameRef.current.value, ageRef.current.value, telephoneRef.current.value, emailRef.current.value);
            props.ModalIsOpen();
        } else {
            alert("Все поля должны быть заполнены!");
        }
    };

    return (
        <div>
            <button onClick={() => props.ModalIsOpen()}>Add new Item</button>
            <Modal isOpen={props.modal}
                   ariaHideApp={false}
                   contentLabel="Selected Option">
                <div>
                    Add some new info
                </div>
                <div>
                    <div>
                        <input placeholder="Enter name" type="text" ref={nameRef}/>
                        <input placeholder="Enter age" type="number" ref={ageRef}/>
                        <input placeholder="Enter telephone no" type="tel" ref={telephoneRef}/>
                        <input placeholder="Enter e-mail" type="email" ref={emailRef}/>
                    </div>
                </div>
                <div>
                    <button onClick={() => {
                        checkingInputs();
                    }}>
                        Add New
                    </button>
                </div>

                <div>
                    <button onClick={() => props.ModalIsOpen()}>Close window</button>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    modal: state.dataReducer.modalIsOpen,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ModalIsOpen, AddNewItem}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNew);