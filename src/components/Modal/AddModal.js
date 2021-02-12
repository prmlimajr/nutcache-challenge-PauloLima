import React, { useState, useEffect, useCallback } from "react";
import Api from '../../services/api';

import "./Modal.css";

export default function AddModal (props) {
  const initForm = (values = {}) => {
    return {
      name: values.name || null,
      birthday: values.birthday || null,
      genderId: values.genderId || null,
      email: values.email || null,
      cpf: values.cpf || null,
      start: values.start || null,
      teamId: values.teamId || null
    }
  }

  const [name, setName] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [genderId, setGenderId] = useState(null);
  const [email, setEmail] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [start, setStart] = useState(null);
  const [teamId, setTeamId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initForm);

  const onClose = e => {
    props.onClose && props.onClose(e);
  };
  
  if (!props.show) {
    return null;
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const success = await Api.post('/employee', { name, birthday, genderId, email, cpf, start, teamId });

      if (success) {
        onClose();
      }
    } catch (err) {
      alert(`Falha na requisição. Verifique os dados.`);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    const target = e.target.id;

    if (target === 'email') {
      setEmail(value);
    }

    if (target === 'name') {
      setName(value);
    }

    if (target === 'birthday') {
      setBirthday(value);
    }

    if (target === 'genderId') {
      setGenderId(value);
    }

    if (target === 'cpf') {
      setCpf(value);
    }

    if (target === 'start') {
      setStart(value);
    }

    if (target === 'teamId') {
      setTeamId(value);
    }

    let form = initForm();

    form[target] = value || null;
    form = {
      ...form,
      [target]: form[target]
    }

    setForm(form);
  }

console.log(props)
console.log(form)
  return (
    <div className="modalBG">
      <div class="modal" id="modal">
        <h2>{props.data ? 'Atualizar Funcionário' : 'Adicionar Funcionário'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="column">
            <label htmlFor="name">Nome:</label>
            <input type="text" id='name' placeholder='Nome' onChange={(e) => handleChange(e)} value={form.name}/>
          </div>

          <div className="column">
            <label htmlFor="birthday">Data de nascimento:</label>
            <input type="date" id='birthday' onChange={(e) => handleChange(e)} />
          </div>

          <div className="column">
            <label htmlFor="genderId">Gênero:</label>
            <div className="row">
              <label htmlFor="male">Masculino</label>
              <input type="radio" name="genderId" id="genderId" value={1} onChange={(e) => handleChange(e)} />
              <label htmlFor="female">Feminino</label>
              <input type="radio" name="genderId" id="genderId" value={2} onChange={(e) => handleChange(e)} />
              <label htmlFor="other">Outro</label>
              <input type="radio" name="genderId" id="genderId" value={3} onChange={(e) => handleChange(e)} />
            </div>
          </div>

          <div className="column">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id='email' placeholder='E-mail' onChange={(e) => handleChange(e)} />
          </div>

          <div className="column">
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id='cpf' placeholder='CPF' onChange={(e) => handleChange(e)}/>
          </div>

          <div className="column">
            <label htmlFor="start">Data de início:</label>
            <input type="date" name="start" id="start" onChange={(e) => handleChange(e)} />
          </div>

          <div className="column">
            <label htmlFor="team">Time</label>
            <select id='teamId' onChange={(e) => handleChange(e)} >
              <option value={null}>--</option>
              <option value={1}>Mobile</option>
              <option value={2}>Frontend</option>
              <option value={3}>Backend</option>
            </select>          
          </div>
        </form>
        
        <div className="row">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>

          <button type='submit' onClick={() => handleSubmit()}>Enviar</button>
        </div>        
      </div>
    </div>
  );
}