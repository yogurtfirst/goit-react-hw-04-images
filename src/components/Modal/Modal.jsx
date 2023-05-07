import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.scss';

const Modal = ({ closeModal, largeImage, imageAlt }) => {
    const onESC = useCallback( ({ code, target, currentTarget }) => {
        if (code === 'Escape') {
            closeModal(target, currentTarget);
        }
    }, [closeModal]);

    useEffect(() => {
        window.addEventListener('keydown', onESC);
        return () => window.removeEventListener('keydown', onESC);
    }, [onESC]);

    return (
        <div className={style.overlay} onClick={closeModal}>
            <div className={style.modal}>
                <img src={largeImage} alt={imageAlt} />
            </div>
        </div>
    );
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
};

export default Modal;