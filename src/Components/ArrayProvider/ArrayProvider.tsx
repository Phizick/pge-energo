import React, { useEffect, useState } from 'react';
import { fakerRU }  from '@faker-js/faker';
import useWindowSize from "../Hooks/useWindowSize/useWindowSize";
import {ContentComponent} from "../HeaderComponent/ContentComponent";


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
    const [first, setFirst] = useState(0);
    let { height = 0 } = useWindowSize();

    const rowHeight = 95;
    const cardsCount = 12;
    const tableRows = Math.floor(height / rowHeight);

    const filterData = (searchText: string) => {
        const filtered = data.filter(item => item.message.includes(searchText));
        setTableData(filtered.slice(first, first + tableRows));
        setCardData(filtered.slice(first, first + cardsCount));
    };

    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}.${month}.${year}, ${hours}:${minutes}`
    };

    useEffect(() => {
        const fetchData = () => {
            const data = Array.from({length: 50}, (_, i) => {
                return {
                    id: i.toString(),
                    date: formatDate(new Date()),
                    importance: '50',
                    equipment: fakerRU.commerce.productName(),
                    message: fakerRU.lorem.sentence(),
                    responsible: fakerRU.person.firstName(),
                    avatar: fakerRU.image.avatar(),
                };
            });

            setData(data);
            setTableData(data.slice(first, first + tableRows));
            setCardData(data.slice(first, first + cardsCount));
        }

        fetchData();
    }, [first, tableRows]);

    console.log(tableData)

    const onPageChange = (event: { first: number; rows: number; }) => {
        setFirst(event.first);
        filterData("");
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
                onChange={onPageChange}
                first={first}
            />
        </div>
    );
};

export default ArrayProvider;