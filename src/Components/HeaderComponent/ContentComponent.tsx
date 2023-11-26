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
    onChange: (event: { first: number, rows: number }) => void;
    first: number;
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


export const ContentComponent: React.FC<ContentComponentProps> = ({ onSearch, cardData, tableData,rowsTable, rowsCard, totalRecords, onChange, first }) => {
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



    return (
        <HeaderContainer>
            <TabView renderActiveOnly={false}>
                <TabPanel header={'String'}>
                    <TableComponent data={tableData}/>
                    <Paginator first={first} rows={rowsTable} totalRecords={totalRecords} onPageChange={onChange}/>
                </TabPanel>
                <TabPanel header={'string2'}>
                    <CardComponent data={cardData}/>
                    <Paginator first={first} rows={rowsCard} totalRecords={totalRecords} onPageChange={onChange}/>
                </TabPanel>
            </TabView>
            <SearchContainer>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={searchText} onChange={onSearchChange} placeholder="Search" onKeyDown={onEnterPress} />
                </span>
                <Button label='Поиск' onClick={onSearchSubmit}></Button>
            </SearchContainer>
        </HeaderContainer>
    )
}