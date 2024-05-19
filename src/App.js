// App.jsx
import React, { useEffect, useState } from 'react';
import { Link, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Signin from './pages/Signin';
import Login from './pages/Login';

const App = () => {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [query, setQuery] = useState('');
    const [activeRegion, setActiveRegion] = useState('전체');

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
            <div key={sool.name} className="bg-white p-4 rounded-lg shadow-md">
                <div className="fixed-aspect-ratio mb-4">
                    <img src={sool.image_url || 'https://placehold.co/400x600'} alt={sool.name} />
                </div>
                <h2 className="text-xl font-bold mb-2">{sool.name}</h2>
                <p className="text-gray-700 mb-2">{`${sool.alcohol_content} / ${sool.type_of_wine}`}</p>
                <p className="text-gray-600">
                    {sool.description.length > 40 ? `${sool.description.substring(0, 40)}...` : sool.description}
                </p>
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
            <div>
                <Link to="/Home">Home</Link> 
                <Link to="/Login">Login</Link>
                <Link to="/Signin">Signin</Link>
            </div>
            <Routes>
                <Route path='/Home' element={<Home
                    allData={allData}
                    filteredData={filteredData}
                    query={query}
                    activeRegion={activeRegion}
                    setQuery={setQuery}
                    setActiveRegion={setActiveRegion}
                    filterData={filterData}
                    renderItems={renderItems} // renderItems 함수를 전달합니다.
                />}/>                
                <Route path='/Signin' element={<Signin/>}/>
                <Route path='/Login' element={<Login/>}/>
            </Routes>
        </div>
    );
};

export default App;
