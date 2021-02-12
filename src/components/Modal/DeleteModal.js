import React from 'react';
import Api from '../../services/api';

import './Modal.css';

export default function DeleteModal(props) {

  const onClose = e => {
    props.onClose && props.onClose(e);
  };
  
  if (!props.show) {
    return null;
  }

  const handleSubmit = async () => {
    try {
      await Api.delete(`/employee/${props.data.id}`);
      onClose();
    } catch (err) {
      alert('Falha na requisição.')
    }
  }

  console.log(props)

  return (
    <div className="modalBG">
      <div class="modal" id="modal">
        <h2>Apagar Funcionário</h2>

        <p>Deseja realmente apagar os dados do funcionário?</p>
        
        <div className="row">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>

          <button type='submit' onClick={() => handleSubmit()}>Apagar</button>
        </div>        
      </div>
    </div>
  )
}
