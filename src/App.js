
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Signup } from './components/signupComponent';
import { Login } from './components/loginComponent';
import { Dashboard } from './components/dashboardComponent';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div >
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>

    </div>
  );
}

export default App;

