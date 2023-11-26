import React from 'react';
import './App.css';
import styled from 'styled-components';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import {HeaderComponent} from "../src/Components/HeaderComponent/HeaderComponent";


const Container = styled.div`
    max-width: 1250px;
    margin: 0 auto;
`;

function App() {
  return (
      <>
      <Container>
          <HeaderComponent/>
      </Container>
      </>
  );
}

export default App;
