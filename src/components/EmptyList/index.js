import React from 'react';
import Alert from '../../assets/img/alert-triangle.svg';

import './EmptyList.css';

export default function EmptyList() {
  return (
    <div className='empty'>
      <img src={Alert} alt="Alerta"/>
      <h2>Não há nenhum funcionário cadastrado.</h2>
    </div>
  )
}
