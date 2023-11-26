import React, { useEffect, useState } from 'react';
import { fakerRU }  from '@faker-js/faker';
import useWindowSize from "../Hooks/useWindowSize/useWindowSize";
import {ContentComponent} from "../ContentComponent/ContentComponent";


interface Data {
    id: string;
    date: string;
    importance: string;
    equipment: string;
    message: string;
    responsible: string;
    avatar: string;
}


const ArrayProvider: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [tableData, setTableData] = useState<Data[]>([]);
    const [cardData, setCardData] = useState<Data[]>([]);
    const [firstTable, setFirstTable] = useState(0);
    const [firstCard, setFirstCard] = useState(0);
    let { height = 0 } = useWindowSize();

    const rowHeight = 105;
    const cardsCount = 12;
    const tableRows = Math.floor(height / rowHeight);

    const filterData = (searchText: string) => {
        const filtered = data.filter(item => item.message.includes(searchText));
        setTableData(filtered.slice(firstTable, firstTable + tableRows));
        setCardData(filtered.slice(firstCard, firstCard + cardsCount));
    };

    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}.${month}.${year}, ${hours}:${minutes}`;
    };

    useEffect(() => {
        const importanceLevels = ['высокая', 'низкая', 'критическая'];
        let fakeIndex = 0;

        const fetchData = (index: number) => {
            const newData = Array.from({length: 3}, (_, i) => {
                return {
                    id: (index + i).toString(),
                    date: formatDate(new Date()),
                    importance: importanceLevels[Math.floor(Math.random()*importanceLevels.length)],
                    equipment: fakerRU.commerce.productName(),
                    message: fakerRU.lorem.sentence(),
                    responsible: fakerRU.person.firstName(),
                    avatar: fakerRU.image.avatar(),
                };
            });
            setData(prevData => [...prevData, ...newData]);
            filterData("");
            fakeIndex += 3;
        };

        fetchData(fakeIndex);

        const intervalId = setInterval(() => {
            if (fakeIndex < 120) {
                fetchData(fakeIndex);
            } else {
                clearInterval(intervalId);
            }
        }, 3000);

        return () => clearInterval(intervalId);
    }, [firstTable, tableRows]);

    useEffect(() => {
        setCardData(data.slice(firstCard, firstCard + cardsCount));
    }, [firstCard, cardsCount, data]);



    const onPageChangeTable = (event: { first: number; rows: number; }) => {
        setFirstTable(event.first);
    };

    const onPageChangeCard = (event: { first: number; rows: number; }) => {
        setFirstCard(event.first);
    };

    return (
        <div>
            <ContentComponent
                onSearch={filterData}
                tableData={tableData}
                cardData={cardData}
                rowsTable={tableRows}
                rowsCard={cardsCount}
                totalRecords={data.length}
                onChangeTable={onPageChangeTable}
                onChangeCard={onPageChangeCard}
                firstTable={firstTable}
                firstCard={firstCard}
            />
        </div>
    );
};

export default ArrayProvider;
