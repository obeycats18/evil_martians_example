import React from "react";

import classNames from "classnames";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ opened, onClose, children }) => {
  return (
    <div className={classNames("modal", { "modal--opened": opened })}>
      <div onClick={onClose} className='modal__close-btn'>
        <span className='close-icon'></span>
      </div>
      {opened && children}
    </div>
  );
};
