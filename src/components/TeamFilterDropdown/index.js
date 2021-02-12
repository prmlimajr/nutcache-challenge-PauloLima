import React from 'react';

import './TeamFilterDropdown.css';

export default function TeamFilterDropdown(props) {

  return (
    <select onChange={props.onChange} className='selectPicker'>
      <option value={null}>--</option>
      <option value={1}>Mobile</option>
      <option value={2}>Frontend</option>
      <option value={3}>Backend</option>
    </select>
  )
}
