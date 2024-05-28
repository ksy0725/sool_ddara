// DetailPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom';

const DetailPage = ({ allData }) => {
    let { name } = useParams();

    // 술 이름을 기반으로 해당 술의 정보를 가져옴
    const selectedSool = allData.find(sool => sool.name === name);

    return (
        <div>
            <h2>{selectedSool.name}</h2>
            <img src={selectedSool.image_url} alt={selectedSool.name} />
            <p>Type of Wine: {selectedSool.type_of_wine}</p>
            <p>Ingredients: {selectedSool.ingredients}</p>
            <p>Alcohol Content: {selectedSool.alcohol_content}</p>
            <p>Volume: {selectedSool.volume}</p>
            <p>Description: {selectedSool.description}</p>
            <p>Food pairing: {selectedSool.food_pairing}</p>
            {/* 나머지 정보 표시 */}
        </div>
    );
};

export default DetailPage;
