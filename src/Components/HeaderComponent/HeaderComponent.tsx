import React, { useState, useCallback } from 'react';
import { Button } from 'primereact/button';
import styled from 'styled-components';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { TabView, TabPanel } from 'primereact/tabview';
import DataProvider from "../ArrayProvider/ArrayProvider";
import { InputText } from "primereact/inputtext";


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


export const HeaderComponent = () => {
    const [ searchText, setSearchText ] = useState('');

    const onSearchSubmit = useCallback(() => {
        console.log(searchText);
    }, [searchText]);

    const onSearchChange = useCallback((event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchText(event.target.value);
    }, []);

    const onEnterPress = useCallback((event: { key: string; }) => {
        if (event.key === 'Enter') { onSearchSubmit(); }
    }, [onSearchSubmit]);

    return (
        <HeaderContainer>
            <TabView renderActiveOnly={false}>
                <TabPanel header={'String'}>
                    <DataProvider viewType={"table"}/>
                </TabPanel>
                <TabPanel header={'string2'}>
                    <DataProvider viewType={'card'}/>
                </TabPanel>cxgvsd
            </TabView>
            <SearchContainer>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search" />
                </span>
                <Button label='Поиск' onClick={onSearchSubmit}></Button>
            </SearchContainer>
        </HeaderContainer>
    )
}