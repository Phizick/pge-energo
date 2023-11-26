import React, { useState, useCallback } from 'react';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { TabView, TabPanel } from 'primereact/tabview';
import TableComponent from "../TableComponent/TableComponent";
import CardComponent from "../CardComponent/CardComponent";
import { InputText } from "primereact/inputtext";
import {Paginator} from "primereact/paginator";

interface DataContent {
    id: string;
    date: string;
    importance: string;
    equipment: string;
    message: string;
    responsible: string;
    avatar: string;
}


type ContentComponentProps = {
    onSearch: (searchValue: string) => void;
    tableData: DataContent[];
    cardData: DataContent[];
    rowsTable: number;
    rowsCard: number;
    totalRecords: number;
    onChangeTable: (event: { first: number, rows: number }) => void;
    onChangeCard: (event: { first: number, rows: number }) => void;
    firstTable: number;
    firstCard: number;
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative; 
  margin-top: 50px;
`;

const SearchContainer = styled.div`
  position: absolute; 
  right: 0;          
  padding-left: 20px;
  box-sizing: border-box;
  gap: 15px;
  display: flex;
`;


export const ContentComponent: React.FC<ContentComponentProps> = ({ onSearch, cardData, tableData,rowsTable, rowsCard, totalRecords, onChangeCard, firstTable, firstCard, onChangeTable }) => {
    const [searchText, setSearchText] = useState('');

    const onSearchSubmit = useCallback(() => {
        console.log(searchText);
        onSearch(searchText);
    }, [searchText, onSearch]);

    const onSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    }, []);

    const onEnterPress = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            onSearchSubmit();
        }
    }, [onSearchSubmit]);

    const resetSearch = useCallback(() => {
        setSearchText('');
        onSearch('');
    }, [onSearch]);



    return (
        <HeaderContainer>
            <TabView renderActiveOnly={false}>
                <TabPanel header={'Таблица'} >
                    <TableComponent data={tableData}/>
                    <Paginator first={firstTable} rows={rowsTable} totalRecords={totalRecords} onPageChange={onChangeTable}/>
                </TabPanel>
                <TabPanel header={'Карточки'}>
                    <CardComponent data={cardData}/>
                    <Paginator first={firstCard} rows={rowsCard} totalRecords={totalRecords} onPageChange={onChangeCard}/>
                </TabPanel>
            </TabView>
            <SearchContainer>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={searchText} onChange={onSearchChange} placeholder="Поиск..." onKeyDown={onEnterPress} />
                </span>
                <Button label='Поиск' onClick={onSearchSubmit}></Button>
                <Button label='Сбросить поиск' onClick={resetSearch}></Button>
            </SearchContainer>
        </HeaderContainer>
    )
}