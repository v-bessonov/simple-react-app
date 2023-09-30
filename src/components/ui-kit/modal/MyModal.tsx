import React, {FC} from 'react';
import cl from './MyModal.module.css';

interface ModalProps {
    visible: boolean,
    setVisible: (visible : boolean) => void;
    children?: React.ReactNode
}

const MyModal: FC<ModalProps> = ({children, visible, setVisible}) => {
    const rootClasses = [cl.myModal];
    if (visible) {
        rootClasses.push(cl.active)
    }

    const closeModal = (e: React.MouseEvent<HTMLDivElement>): void => {
        e.preventDefault();
        setVisible(false);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={closeModal}>
            <div className={cl.myModalContent} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                {children}
            </div>

        </div>
    );
};

export default MyModal;