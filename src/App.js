
import './App.css';

import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import New from './pages/New/New';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Detail from './pages/Detail/Detail';
import { CheckOutTemplate } from './templates/CheckOutTemplate/CheckOutTemplate';
import CheckOut from './pages/CheckOut/CheckOut';
import { UserTemplate } from './templates/UserTemplate/UserTempalte';
import Loading from './components/Loading/Loading';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import ShowTime from './pages/Admin/ShowTime/ShowTime';
import Films from './pages/Admin/Films/Films';
import Users from './pages/Admin/Users/Users';
import Addnew from './pages/Admin/Films/Addnew/Addnew';
import Edit from './pages/Admin/Films/Edit/Edit';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/Profile/EditProfile/EditProfile';
import EditUsers from './pages/Admin/Users/EditUsers/EditUsers';
import AddNewUsers from './pages/Admin/Users/AddNewUsers/AddnewUsers'
import Search from './pages/Search/Search';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
        <Switch>
          <HomeTemplate path="/home" exact Component={Home} />
          <HomeTemplate path="/contact" exact Component={Contact} />
          <HomeTemplate path="/new" exact Component={New} />
          <HomeTemplate path="/details/:id" exact Component={Detail} />
          <HomeTemplate path="/profile" exact Component={Profile} />
          <HomeTemplate path="/search" exact Component={Search} />
          <HomeTemplate path="/profile/editprofile/:id" exact Component={EditProfile} />

          <CheckOutTemplate path="/checkout/:id" exact Component={CheckOut} />
          <AdminTemplate path="/admin/showtime/:id/:tenphim" exact Component={ShowTime} />
          <AdminTemplate path="/admin/films" exact Component={Films} />
          <AdminTemplate path="/admin/editusers/:id" exact Component={EditUsers} />
          <AdminTemplate path="/admin/films/adnew" exact Component={Addnew} />
          <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
          <AdminTemplate path="/admin/users" exact Component={Users} />
          <AdminTemplate path="/admin/users/addnew" exact Component={AddNewUsers} />
          <UserTemplate path="/login" exact Component={Login} />
          <UserTemplate path="/register" exact Component={Register} />
          <HomeTemplate path="/" exact Component={Home} />
          <Route path="*" component={PageNotFound} />
        </Switch>
    </Router>
  );
}

export default App;
