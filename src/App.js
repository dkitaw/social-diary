import React, { Component } from 'react';
import { Provider } from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import './App.css';
import { AppRouter } from './routes/AppRouter';
import firebase from './firebase/firestore';
import { store } from './store/configureStore';
import { startSetBlogs } from './actions/blogs';
import { loginUser, logoutUser } from './actions/user';

class App extends Component {
  appStore = store();

  state = { isLoaded: false };

  componentDidMount() {
    this.appStore.subscribe(() => console.log(this.appStore.getState()));
    this.appStore.dispatch(startSetBlogs()).then(() => {
      this.setState({ isLoaded: true });
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.appStore.dispatch(loginUser(user));
      else this.appStore.dispatch(logoutUser());
    });
  }

  render() {
    return (
      <Provider store={this.appStore}>
        {this.state.isLoaded ? <AppRouter /> : <p>Loading...</p>}
      </Provider>
    );
  }
}

export default App;
