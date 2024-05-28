import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from "react-router-dom";
import Modal from 'react-modal';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Error from './pages/Error';
import './App.css';
import './css/Modal.css';

// React-Modal의 앱 엘리먼트를 설정합니다.
Modal.setAppElement('#root');

const App = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('전체');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSool, setSelectedSool] = useState(null); // 선택된 sool 데이터를 저장할 상태

  const openModal = (sool) => {
    setSelectedSool(sool); // 모달을 열 때 선택된 sool 데이터를 상태에 저장
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedSool(null); // 모달을 닫을 때 선택된 sool 데이터를 초기화
  };

  useEffect(() => {
    fetch('/sool.json')
      .then(response => response.json())
      .then(data => {
        setAllData(data);
        setFilteredData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderItems = (data) => {
    return data.map(sool => (
      <div key={sool.name} className="bg-white p-4 rounded-lg shadow-md"
        onClick={() => openModal(sool)} // 클릭할 때 해당 sool 데이터를 모달에 전달
      >
        <div className="fixed-aspect-ratio mb-4">
          <img src={sool.image_url || 'https://placehold.co/400x600'} alt={sool.name} />
        </div>
        <h2 className="text-xl font-bold mb-2">{sool.name}</h2>
        <p className="text-gray-700 mb-2">{`${sool.alcohol_content} / ${sool.type_of_wine}`}</p>
        <p className="text-gray-600">
          {sool.description.length > 40 ? `${sool.description.substring(0, 40)}...` : sool.description}
        </p>
          <p className="text-gray-600"> 추천 음식 : {`${selectedSool.food_pairing}`}</p>
      </div>
    ));
  };

  const filterData = () => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = allData.filter(sool => {
      const matchesSearch = sool.name.toLowerCase().includes(lowerCaseQuery);
      const matchesRegion = activeRegion === '전체' || sool.brewery_name === activeRegion;
      return matchesSearch && matchesRegion;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [query, activeRegion, allData]);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-4">맛 따라, 술 따라</h1>
      <div className="menu">
        <Link to="/">Home</Link> 
        <Link to="/Login">Login</Link>
        <Link to="/Signin">Signin</Link>
        <Link to="/Mypage">Mypage</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home
          allData={allData}
          filteredData={filteredData}
          query={query}
          activeRegion={activeRegion}
          setQuery={setQuery}
          setActiveRegion={setActiveRegion}
          filterData={filterData}
          renderItems={renderItems}
        />}/>
        <Route path='/MyPage' element={<MyPage/>}/>
        <Route path='/Signin' element={<Signin/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      <Modal
        className='modal-content'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Modal'
      >
        {selectedSool && (
          <div>
            <img src={selectedSool.image_url || 'https://placehold.co/400x600'} alt={selectedSool.name} />
            <h2 className="text-xl font-bold mb-2">{selectedSool.name}</h2>
            <p className="text-gray-700 mb-2">{`${selectedSool.alcohol_content} / ${selectedSool.type_of_wine}`}</p>
            <p className="text-gray-600">
              {selectedSool.description.length > 40 ? `${selectedSool.description}` : selectedSool.description}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
