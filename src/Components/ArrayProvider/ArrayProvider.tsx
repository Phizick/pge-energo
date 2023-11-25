import React, { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import CardComponent from '../CardComponent/CardComponent';
import {Paginator} from "primereact/paginator";
import TableComponent from "../TableComponent/TableComponent";
import useWindowSize from "../Hooks/useWindowSize/useWindowSize";


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


const DataProvider: React.FC<DataProviderProps> = ({ viewType }) => {
    const [data, setData] = useState<Data[]>([]);
    const [first, setFirst] = useState(0);
    let { height = 0 } = useWindowSize();
    const rowHeight = 100;
    const cardRows = 9;
    const tableRows = Math.floor(height / rowHeight);
    const [rows, setRows] = useState((viewType === 'card') ? cardRows : tableRows);

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
                    //задать высоту строк напрямую - костыльно, но танцевать с рефами для получения данных из библиотечного компонента - городить огороды
                    importance: '50',
                    equipment: faker.commerce.productName(),
                    message: faker.lorem.sentence(),
                    responsible: faker.name.firstName(),
                    avatar: faker.image.avatar(),
                };
            });

            setData(data)
        }

        fetchData();
    }, []);

    useEffect(() => {
        setRows((viewType === 'card') ? cardRows : tableRows);
    }, [viewType, height]);

    const dataToDisplay = data.slice(first, first + rows);

    const onPageChange = (event: { first: number; rows: number; }) => {
        setFirst(event.first);
        setRows(event.rows)
    };

    return (
        <div>
            {viewType === 'card' && <CardComponent data={dataToDisplay} />}
            {viewType === 'table' && <TableComponent data={dataToDisplay} />}
            <Paginator first={first} rows={rows} totalRecords={data.length} onPageChange={onPageChange}/>
        </div>
    );
};

export default DataProvider;