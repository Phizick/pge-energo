import React, { useEffect, useState } from 'react';
import { fakerRU }  from '@faker-js/faker';
import CardComponent from '../CardComponent/CardComponent';
import {Paginator} from "primereact/paginator";
import TableComponent from "../TableComponent/TableComponent";
import useWindowSize from "../Hooks/useWindowSize/useWindowSize";
import {createContext} from "vm";

interface Data {
    id: string;
    date: string;
    importance: string;
    equipment: string;
    message: string;
    responsible: string;
    avatar: string;
}

interface DataProviderProps {
    viewType: 'card' | 'table';
}

export const DataContext = createContext((searchText: string) => {});


const DataProvider: React.FC<DataProviderProps> = ({ viewType }) => {
    const [data, setData] = useState<Data[]>([]);
    const [first, setFirst] = useState(0);
    let { height = 0 } = useWindowSize();
    //задать высоту строк напрямую - костыльно, но танцевать с рефами для получения данных из библиотечного компонента в данном случае посчитал излишним
    const rowHeight = 95;
    const cardsCount = 12;
    const tableRows = Math.floor(height / rowHeight);
    const [rows, setRows] = useState((viewType === 'card') ? cardsCount : tableRows);

    const [filteredData, setFilteredData] = useState<Data[]>([]);

    const filterData = (searchText: string) => {
        const filtered = data.filter(item => item.message.includes(searchText));
        setFilteredData(filtered);
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
            setFilteredData(data);
        }

        fetchData();
    }, []);


    useEffect(() => {
        setRows((viewType === 'card') ? cardsCount : tableRows);
    }, [viewType, height]);

    const dataToDisplay = filteredData.slice(first, first + rows);

    const onPageChange = (event: { first: number; rows: number; }) => {
        setFirst(event.first);
        setRows(event.rows)
    };

    return (
        <DataContext.Provider value={{ filterData }}>
            <div>
                {viewType === 'card' && <CardComponent data={dataToDisplay}/>}
                {viewType === 'table' && <TableComponent data={dataToDisplay}/>}
                <Paginator first={first} rows={rows} totalRecords={data.length} onPageChange={onPageChange}/>
            </div>
        </DataContext.Provider>
    );
};

export default DataProvider;