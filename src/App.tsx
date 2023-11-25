import React from 'react';
import './App.css';
import styled from 'styled-components';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { TabView, TabPanel } from 'primereact/tabview';
import DataProvider from "./Components/ArrayProvider/ArrayProvider";


const Container = styled.div`
    max-width: 1250px;
  margin: 0 auto;
`


function App() {
  return (
      <>
      <Container>
          <TabView renderActiveOnly={false}>
              <TabPanel header={'String'}>
                  <DataProvider viewType={"table"}/>
              </TabPanel>
              <TabPanel header={'string2'}>
                  <DataProvider viewType={'card'}/>
              </TabPanel>
          </TabView>
      </Container>
      </>
  );
}

export default App;
