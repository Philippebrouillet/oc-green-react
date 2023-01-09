import React from "react";
import "../styles/Modal.css";

const Modal = ({ modalcart, updateModalCart, setModal }) => {
  function closeModal() {
    setModal(false);
    updateModalCart([]);
  }

  return (
    <div className="background">
      <div className="modalContainer">
        <h2>Modal</h2>

        {modalcart.map(({ name, cover, text }, index) => (
          <div key={`${name}-${index}`}>
            <img className="modal-img" src={cover} alt={`${name} cover`} />
            <br />
            <br />
            {text}
          </div>
        ))}
        <br />
        <button className="boutonR" onClick={() => closeModal()}>
          close{" "}
        </button>
      </div>
    </div>
  );
};

export default Modal;
