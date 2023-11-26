import React from 'react';
import './App.css';
import styled from 'styled-components';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import {ContentComponent} from "./Components/HeaderComponent/ContentComponent";
import ArrayProvider from "./Components/ArrayProvider/ArrayProvider";


const Container = styled.div`
    max-width: 1250px;
    margin: 0 auto;
`;

function App() {
  return (
      <>
      <Container>
          <ArrayProvider/>
      </Container>
      </>
  );
}
export default App;
