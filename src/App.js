import './App.css';
import Maps from './Maps';
import {Routes,Route} from 'react-router-dom'
import Upload from './Upload';
import Details from './Details';
import NearMe from './nearme';
import BeeDetails from './BeeDetails'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element= {<Maps/>} />
        <Route path='/upload' element= {<Upload/>} />
        <Route path='/nearme' element= {<NearMe/>} />
        <Route path="/details/:beeId" element={<Details />} />
        <Route path="/bee/:beeName" element={<BeeDetails />} />
      </Routes>
    </div>
  );
}

export default App;
