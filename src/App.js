import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ScrollToTop from './components/scrollToTop';
import './css/App.css';
import './css/spinner.css';

import './config/firebase';

import { getUserQuery } from './queries/queries';
import { userInfo } from './config/cache';

import Signin from './components/signin';
import Signup from './components/signup';
import Header from './components/header';
import Footer from './components/footer';
import Search from './components/search';

function App() {

  const { loading, error, data } = useQuery(getUserQuery, {
      fetchPolicy: 'network-only'
    }
  );

  if (!loading && !error){
    userInfo(data.user);
  }


  return (
    <Router>

        <ScrollToTop />
        <Header />
   
        <Switch>  

          <Route exact path = '/signup'>
            <Signup lana={true} />
          </Route>


          <Route exact path = '/forgot'>
            <Signup lana={false} />
          </Route>

          
          <Route exact path = '/search' component={Search} />


          <Route exact path = '/search/:id' component={Search} />


          <Route exact path = '/' component={Signin} />


          <Route path = '*'>
            <div className="four">
              404
            </div>
          </Route>

        </Switch>

        <Footer />

      </Router>
  );
}

export default App;
