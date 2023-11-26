import {createGlobalStyle} from "styled-components";
import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { RenderComponentProps } from '../../Constants/Interfaces/Interfaces';

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

const TableComponent: React.FC<RenderComponentProps> = ({ data }) => {
    const [read, setRead] = useState<Record<string, boolean>>({});
    const [activeRowId, setActiveRowId] = useState<string | null>(null);


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

    function getRowClass(rowData: { id: string }) {
        return { 'read-row': read[rowData.id], 'unread-row': !read[rowData.id] };
    }

    const handleRowClick = (e: any) => {
        setRead({ ...read, [e.data.id]: true });
    };

    const dateStyle: React.CSSProperties = {
        whiteSpace: 'nowrap',
        width: 'max-content'
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
                            <Column field="date" header="дата" bodyStyle={dateStyle}></Column>
                            <Column field="importance" header="важность"></Column>
                            <Column field="equipment" header="оборудование"></Column>
                            <Column field="message" header="сообщение"></Column>
                            <Column field="responsible" header="ответственный"></Column>
                        </DataTable>
        </>
    );
}

export default TableComponent