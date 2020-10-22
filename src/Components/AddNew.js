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
            <button
                className="button"
                onClick={() => props.ModalIsOpen()}
            >
                Добавить
            </button>
            <Modal
                isOpen={props.modal}
                ariaHideApp={false}
                contentLabel="Selected Option"
            >
                <div>
                    <div>
                        <div>
                            <h3>Добавить новый элемент</h3>
                        </div>

                    </div>
                    <div className="inputs_layout">
                        <div>
                            <input placeholder="Введите имя" type="text" ref={nameRef}/>
                        </div>
                        <div>
                            <input placeholder="Введите возраст" type="number" ref={ageRef}/>
                        </div>
                        <div>
                            <input placeholder="Введите номер телефона" type="tel" ref={telephoneRef}/>
                        </div>
                        <div>
                            <input placeholder="Введите e-mail" type="email" ref={emailRef}/>
                        </div>
                    </div>
                    <div>
                        <button
                            className="button"
                            onClick={() => {
                                checkingInputs();
                            }}>
                            Добавить
                        </button>
                        <div>
                            <button
                                className="button delete"
                                onClick={() => props.ModalIsOpen()}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
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
