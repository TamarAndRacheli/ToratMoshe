import './App.css';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";       
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";                                         
// css utility        
import 'primeflex/primeflex.css';

import Home from './Components/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LogIn from './Components/LogIn';
import Register from './Components/Register';
import Contact from './Components/Contact';
import Registerr from './Components/Register';
import Handwriting from './Components/Handwriting';
 
function App() {
  return (
   <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/LogIn' element={<LogIn />} />
        <Route path='/Register' element={<Registerr />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Handwriting' element={<Handwriting />} />
        <Route path='*' element={<h1> 404 Page not found</h1>} />
      </Routes>
    </Router>
   </>
  );
}

export default App;
