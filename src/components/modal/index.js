import cn from "classnames";
import { useEffect, useRef } from "react";

import s from './style.module.css'

const Modal = ({ isOpened, title, children, onCloseModal }) => {
    const modalEl = useRef();//hook allows to ref to dom elems

    useEffect(() => {
        document.body.style.overflow = isOpened ? 'hidden' : null;
    }, [isOpened]);

    const onClickCloseModal = () => {
        onCloseModal && onCloseModal(false);
    }
    const onClickRoot = (evt) => {
        if (!modalEl.current.contains(evt.target)) {
            onClickCloseModal();
        }
    }

    return (
        <div
            className={cn(s.root, { [s.open]: isOpened })}
            onClick={onClickRoot}
        >
            <div
                className={s.modal}
                ref={modalEl}>
                <div className={s.head}>
                    {title}
                    <span
                        className={s.btnClose}
                        onClick={onClickCloseModal}
                    />
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;