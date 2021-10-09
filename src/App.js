import './App.scss'

import HomePage from './pages/Home/Index'
import CategoryPage from './pages/Category/Index'
import SearchResultPage from './pages/SearchResult/Index'
import AboutPage from './pages/About/Index'
import ContactPage from './pages/Contact/Index'
import TermConditionPage from './pages/Terms/Index'
import FourOFourPage from './pages/FourOFour/Index'

import LoginPage from './pages/Auth/Login'
import RegisterPage from './pages/Auth/Register'
import ResetPage from './pages/Auth/Reset'

import AccountMaster from './pages/Account/Master/Index'
import PrivateRoute from './components/PrivateRoute/Index'

import ScrollToTop from './components/ScrollToTop/Index'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/category/:slug" component={CategoryPage} />
            <Route exact path="/search" component={SearchResultPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/terms-conditions" component={TermConditionPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/reset" component={ResetPage} />

            <PrivateRoute path="/account" >
              <AccountMaster />
            </PrivateRoute>

            <Route path="*"><FourOFourPage message={'Opps! Page not found'} /></Route>

          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
