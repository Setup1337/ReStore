import {Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contact/ContactPage';
import HomePage from '../../features/home/HomePage';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';



function App() {
  const [darkMode, setDarkMode] = useState(false);  
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
      palette: {
          mode: paletteType,
          background: {
              default: paletteType === 'light' ? '#eaeaea' : '#121212'
          }
      }
  }) 
    
  function handleThemeChange(){
      setDarkMode(!darkMode);
  }  
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>  
      <CssBaseline/>  
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
          <Switch>
              <Route exact path ='/' component={HomePage}></Route>
              <Route path ='/about' component={AboutPage}></Route>
              <Route path ='/contact' component={ContactPage}></Route>
              <Route exact path ='/catalog' component={Catalog}></Route>
              <Route path ='/catalog/:id' component={ProductDetails}></Route>
              <Route path ='/server-error' component={ServerError}></Route>
              <Route component={NotFound}></Route>
          </Switch>
          
      </Container>
    </ThemeProvider>
  );
}

export default App;
