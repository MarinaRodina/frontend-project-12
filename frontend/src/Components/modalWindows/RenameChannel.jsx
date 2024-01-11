import React, { useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import * as yup from 'yup';
import useSocket from '../../Hooks/useSocket.jsx';
import { actions as modalsActions } from '../../Slices/modalsSlice.js';

const RenameChannel = () => {
    const socketChat = useSocket();
    const dispatch = useDispatch();
    const onHide = () => dispatch(modalsActions.closeModal());
    const modalInfo = useSelector((state) => state.modalsReducer.setModalInfo);
    const channelId = modalInfo.targetId;
    const channels = useSelector((state) => state.channelsReducer.channels);
    const channelName = channels.map((i) => i.name);

    const setNameSchema = yup.object().shape({
        channelName: yup.string().trim()
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .required('Обязательное поле')
            .notOneOf(channelName, 'Должно быть уникальным'),
    });

    const channelToRename = channels.find((i) => i.id === channelId);
    const {
        values, errors, handleChange, handleSubmit, setSubmitting, isSubmitting,
    } = useFormik({
        initialValues: {
            channelName: channelToRename ? channelToRename.name : '',
        },
        validationSchema: setNameSchema,
        validateOnChange: false,
        errorToken: false,
        onSubmit: () => {
            setSubmitting(true);
            socketChat.renameChannel(channelId, values)
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

    const classError = cn('mb-2 form-control', {
        'is-invalid': errors.channelName,
    });
    const inputRef = useRef(null);

    const showModal = () => {
        inputRef.current.focus();
    };

    return (
        <Modal show centered onShow={showModal}>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>Переименовать канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                        <Modal.Footer>
                            <Form.Control
                                ref={inputRef}
                                name="channelName"
                                id="channelName"
                                className={classError}
                                value={values.channelName}
                                onChange={handleChange}
                            />
                            <Form.Label className="visually-hidden" htmlFor="channelName">Имя канала</Form.Label>
                            <div className="invalid-feedback">{errors.channelName}</div>
                        </Modal.Footer>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-end m-3">
                        <Button
                            variant="secondary"
                            type="button"
                            className="me-2 btn-secondary"
                            onClick={() => onHide()}
                        >
                            Отменить
                        </Button>
                        <Button
                            className="btn-primary"
                            type="submit"
                            variant="primary"
                            disabled={isSubmitting}
                        >
                            Отправить
                        </Button>
                    </FormGroup>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RenameChannel;
