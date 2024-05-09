import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/upload" component={Upload} />
            <Route path="/details" component={Details} />
            <Route path='/info' component={Information}/>
            <Route component={NotFound} />
          </Switch>
        </Router>

    </div>
  );
}

export default App;
