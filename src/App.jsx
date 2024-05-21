import React, { useEffect } from 'react';
import CustomEditor from './components/custom';
import AppRouter from './routes';


function App(){
  let variables = ['DURATION_IN_DAYS', "TRIP_TYPE"];
  return (
    <>
     {/* <CustomEditor variables={variables}/> */}
     <AppRouter />
    </>
   
  )
}
export default App;
