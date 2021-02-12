import React, { useState, useEffect, useCallback } from 'react';
import { isEmpty } from '../../utils';
import Nutcache from '../../assets/img/new-nutcache-logo.png';
import Github from '../../assets/img/github.svg';
import LinkedIn from '../../assets/img/linkedin.svg';
import Mail from '../../assets/img/mail.svg';
import Edit from '../../assets/img/edit.svg';
import Trash from '../../assets/img/trash.svg';
import TeamFilterDropdown from '../../components/TeamFilterDropdown';
import Search from '../../components/Search';
import Button from '../../components/Button';
import EmptyList from '../../components/EmptyList';
import AddModal from '../../components/Modal/AddModal';
import DeleteModal from '../../components/Modal/DeleteModal';
import Api from '../../services/api';

import './Home.css';

export default function Home() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  const fetchData = useCallback(async () => {
    
    const fetch = await Api.get(`/employee?search=${search}&teamId=${filter}`);

    setList(fetch.data);
  }, [search, filter, setList]);

  useEffect(() => {
    setLoading(true);
    try {
      fetchData();
    } catch (err) {
      alert(`Falha na requisição: ${err}`);
    } finally {
      setLoading(false);
    }

  }, [fetchData, setLoading]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchData();
  }

  const handleFilter = (e) => {
    const value = e.target.value === '--' ? '' : e.target.value;

    setFilter(value);
    fetchData();
  }

  const handleButtonClick = () => {
    setModalVisible(true);
  }

  const handleEdit = row => {
    setModalData(row);
    setModalVisible(true);
  }

  const handleDelete = row => {
    setModalData(row);
    setDeleteModalVisible(true);
  }

  const renderEmpty = () => {
    return <EmptyList />
  }

  const showModal = () => {
    setModalVisible(!modalVisible);
    fetchData();
  }

  const showDeleteModal = () => {
    setDeleteModalVisible(!deleteModalVisible);
    console.log(deleteModalVisible)
    fetchData();
  }

  const renderTable = data => {
    return (
      <table>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Data de Início</th>
          <th>Time</th>
          <th></th>
        </tr>

        {data.map(row => {
          return (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.start}</td>
              <td>{row.team}</td>
              <td style={{ textAlign: 'center' }}>
                <img src={Edit} alt='Editar' onClick={() => handleEdit(row)} />
                <img src={Trash} alt='Apagar' onClick={() => handleDelete(row)} />
              </td>
            </tr>
          )
        })}
      </table>
    )
  }

  return (
    <div className='background'>
      <div className="content">
        <header>
          <img src={Nutcache} alt="Nucache logo"/>
          <h1>Gerenciamento de Funcionários</h1>
        </header>

        <nav className="menu">
          <div className="filters">
            <Search onChange={handleSearch} value={search} />

            <span>Filtrar por:</span>

            <TeamFilterDropdown onChange={handleFilter}/>
          </div>
            <Button content='Adicionar funcionário' onClick={() => handleButtonClick()} />
        </nav>

        <main>
          {isEmpty(list) ? renderEmpty() : renderTable(list)}
        </main>
      </div>

      <footer>
        <h3>Desenvolvido por:</h3>
        <strong>Paulo Lima</strong>
        <div className="contact">
          <a href="https://github.com/prmlimajr">
            <img src={Github} alt="Github"/>
          </a>

          <a href="https://www.linkedin.com/in/prmlimajr/">
            <img src={LinkedIn} alt="LinkedIn"/>
          </a>

          <a href="mailto:prmlimajr@hotmail.com">
            <img src={Mail} alt="E-mail"/>
          </a>
        </div>
      </footer>

      <AddModal onClose={showModal} show={modalVisible} data={modalData}/>
      <DeleteModal onClose={showDeleteModal} show={deleteModalVisible} data={modalData} />
    </div>
  )
}
