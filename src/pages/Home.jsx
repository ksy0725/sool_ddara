// Home.jsx
import React from 'react';
import './Home.css'

const Home = ({ allData, filteredData, query, activeRegion, setQuery, setActiveRegion, filterData, renderItems }) => {
    return (
        <div>
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

export default Home;
