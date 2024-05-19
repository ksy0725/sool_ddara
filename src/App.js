import React, { useEffect, useState } from 'react';
import './App.css';

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
            <h1 className="text-4xl font-bold text-center mb-4">술 따라, 맛 따라</h1>
            <div className="text-center mb-8">
                <input
                    id="search-input"
                    type="text"
                    placeholder="전통주 검색하기"
                    className="border p-2 rounded"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    id="search-button"
                    className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
                    onClick={filterData}
                >
                    검색
                </button>
            </div>
            <div className="text-center mb-8">
                <div className="inline-flex space-x-4" id="region-tabs">
                    {['전체', '서울', '경기', '강원', '충청', '경상', '전라', '제주'].map(region => (
                        <button
                            key={region}
                            className={`region-tab py-2 px-4 rounded ${activeRegion === region ? 'bg-gray-300' : ''}`}
                            data-region={region}
                            onClick={() => setActiveRegion(region)}
                        >
                            {region}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="sool-container">
                {renderItems(filteredData)}
            </div>
        </div>
    );
};

export default App;
