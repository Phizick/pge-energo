import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import {NEUTRAL_DARKSNOW, NEUTRAL_LIGHT, NEUTRAL_SNOWWHITE} from "./Constants/Colors/Colors";

import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';

//table
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//card

import { Card } from 'primereact/card';

import avatar from '../src/Images/Avatars/avatar.png'

import { Paginator } from 'primereact/paginator';
import {CardComponent} from "./Components/CardComponent/CardComponent";
import { useRead } from './Components/Hooks/useRead/useRead'
import { useActive } from "./Components/Hooks/useActive/useActive";

export const tableArr = [
    {
        id: '1',
        date: '',
        importance: '100',
        equipment: 'test',
        message: 'test',
        responsible: 'test',
        avatar: avatar
    },
    {
        id: '2',
        date: '',
        importance: '200',
        equipment: 'test',
        message: 'test',
        responsible: 'test',
        avatar: avatar
    },{
        id: '3',
        date: '',
        importance: '200',
        equipment: 'test',
        message: 'test',
        responsible: 'test',
        avatar: avatar
    },
    {
        id: '4',
        date: '',
        importance: '200',
        equipment: 'test',
        message: 'test',
        responsible: 'test',
        avatar: avatar
    },
    {
        id: '5',
        date: '',
        importance: '200',
        equipment: 'test',
        message: 'test',
        responsible: 'test',
        avatar: avatar
    }
];

const Container = styled.div`
    max-width: 1250px;
  margin: 0 auto;
`
const GlobalStyle = createGlobalStyle`
  .read-row {
    background-color: ${NEUTRAL_SNOWWHITE};
    cursor: pointer;
    transition: opacity .3s;    
    &:hover {
      opacity: .8;
    }
    
  }
  .unread-row {
    background-color: ${NEUTRAL_DARKSNOW};
    cursor: pointer;
    transition: opacity .3s;
    &:hover {
      opacity: .8;
    }
  }
`;

function App() {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
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
      <Container>
        <Paginator first={first} rows={rows} totalRecords={120} onPageChange={onPageChange} />
          <DataTable value={tableArr}
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
          <CardComponent/>

      </Container>
      </>
  );
}

export default App;
