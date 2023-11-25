import {createGlobalStyle} from "styled-components";
import React, {useEffect, useRef, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";



interface Data {
    id: string;
    date: string;
    importance: string;
    equipment: string;
    message: string;
    responsible: string;
    avatar: string;
}

interface CardComponentProps {
    data: Data[];
}


const GlobalStyle = createGlobalStyle`
  .read-row {    
    background-color: var(--blue-50);
    cursor: pointer;
    transition: opacity .3s;    
    &:hover {
      opacity: .8;
    }
    
  }
  .unread-row {
    background-color: var(--blue-100);
    cursor: pointer;
    transition: opacity .3s;
    &:hover {
      opacity: .8;
    }
  }
`;

const TableComponent: React.FC<CardComponentProps> = ({ data }) => {
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [read, setRead] = useState<Record<string, boolean>>({});
    const [activeRowId, setActiveRowId] = useState<string | null>(null);
    const rowRef = useRef<HTMLTableRowElement>(null);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {

            if (e.code === "Space" && activeRowId) {
                setRead(prev => ({ ...prev, [activeRowId]: true }));
                e.preventDefault();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeRowId]);
    function dateTemplate(rowData: { id: string }) {
        const date = new Date();
        const dateStr = date.toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
        return (
            <div>
                {dateStr}
            </div>
        );
    }
    function getRowClass(rowData: { id: string }) {
        return { 'read-row': read[rowData.id], 'unread-row': !read[rowData.id] };
    }

    const handleRowClick = (e: any) => {
        setRead({ ...read, [e.data.id]: true });
    };

    const onPageChange = (event: any) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    return (
        <>
            <GlobalStyle />
                        <DataTable value={data}
                                   tableStyle={{ minWidth: '50rem' }}
                                   onRowClick={handleRowClick}
                                   rowClassName={getRowClass}
                                   onRowMouseEnter={(e) => setActiveRowId(e.data.id)}
                                   onRowMouseLeave={() => setActiveRowId(null)}
                        >
                            <Column field="date" header="дата" body={dateTemplate}></Column>
                            <Column field="importance" header="важность"></Column>
                            <Column field="equipment" header="оборудование"></Column>
                            <Column field="message" header="сообщение"></Column>
                            <Column field="responsible" header="ответственный"></Column>
                        </DataTable>
        </>
    );
}


export default TableComponent