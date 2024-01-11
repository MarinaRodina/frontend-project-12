import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FormGroup from 'react-bootstrap/FormGroup';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import useSocket from '../../Hooks/useSocket.jsx';
import { actions as modalsActions } from '../../Slices/modalsSlice.js';

const RemoveChannel = () => {
    const socketChat = useSocket();
    const dispatch = useDispatch();
    const onHide = () => dispatch(modalsActions.closeModal());
    const modalInfo = useSelector((state) => state.modalsReducer.setModalInfo);
    const channelId = modalInfo.targetId;

    const {
        handleSubmit, setSubmitting, isSubmitting,
    } = useFormik({
        initialValues: {
            removingChannelId: null,
        },
        onSubmit: () => {
            setSubmitting(true);
            socketChat.removeChannel(channelId)
                .then(() => {
                    onHide();
                })
                .catch((error) => {
                    console.log('ERROR', error);
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    const inputRef = useRef(null);

    return (
        <Modal show centered>
            <Modal.Header closeButton onClick={onHide}>
                <Modal.Title className="modal-title h4">Удалить канал</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <p className="lead">Уверены?</p>
                </Modal.Body>
                <FormGroup className="d-flex justify-content-end m-3">
                    <Button
                        className="me-2 btn-secondary"
                        variant="secondary"
                        onClick={() => onHide()}
                    >
                        Отменить
                    </Button>
                    <Button
                        className="btn-primary"
                        type="submit"
                        variant="danger"
                        ref={inputRef}
                        disabled={isSubmitting}
                    >
                        Удалить
                    </Button>
                </FormGroup>
            </Form>
        </Modal>
    );
};

export default RemoveChannel;
