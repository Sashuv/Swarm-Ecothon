import './App.css';
import Maps from './Maps';
import {Routes,Route} from 'react-router-dom'
import Upload from './Upload';
import Details from './Details';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element= {<Maps/>} />
        <Route path='/upload' element= {<Upload/>} />
        <Route path="/details/:beeId" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
