import React, {Fragment, useState} from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import About from './components/pages/About';

const App = () => {
  const [users,setUsers] = useState([])
  const [loading,setLoading] = useState(false);
  const [alert,setAlert] = useState(null)


  const searchUsers = async text =>{
    setLoading(true)
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
     ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
     ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

     setUsers(res.data.items)
     setLoading(false)
  }


  const clearUser = () =>{
    setUsers([])
    setLoading(false)
  }

  const setAlerts = (msg,type) =>{
    setAlert({msg,type})

    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
    return (
      <Router>
          <div className="App">
          <Navbar />
          <div className='container'>
              <Alert alert={alert} />
              <Switch>
                <Route exact path='/' render={props =>(
                    <Fragment>
                      <Search 
                        searchUsers={searchUsers} 
                        clearUser={clearUser}
                        showClear={users.length > 0 ? true : false}
                        setAlert={setAlerts}
                    />
                    <Users loading={loading} users ={users} />   
                      </Fragment>
                )} />
                <Route exact path='/about' component={About} />
              </Switch>  
          </div>
        </div>
      </Router>
      
    );
  }

export default App;
