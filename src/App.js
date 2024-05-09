import './App.css';
import Maps from './Maps';
import {Routes,Route} from 'react-router-dom'
import Upload from './Upload';
import Details from './Details';
<<<<<<< HEAD
=======
import NearMe from './nearme';
import BeeDetails from './BeeDetails'
>>>>>>> 8ea440b0 (Fixed Maps, Css)
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element= {<Maps/>} />
        <Route path='/upload' element= {<Upload/>} />
<<<<<<< HEAD
        <Route path="/details/:beeId" element={<Details />} />
=======
        <Route path='/nearme' element= {<NearMe/>} />
        <Route path="/details/:beeId" element={<Details />} />
        <Route path="/bee/:beeName" element={<BeeDetails />} />
>>>>>>> 8ea440b0 (Fixed Maps, Css)
      </Routes>
    </div>
  );
}

export default App;
