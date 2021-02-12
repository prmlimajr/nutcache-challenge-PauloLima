import React from 'react';
import SearchIcon from '../../assets/img/search.svg';

import './Search.css';

export default function Search(props) {
  return (
    <div className='search'>
      <input className='search-input' type="text" placeholder='Pesquisar' onChange={props.onChange} value={props.value} />
      <div className="search-icon">
        <img src={SearchIcon} alt="Pesquisar"/>
      </div>
    </div>
  )
}
