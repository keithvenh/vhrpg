import React from 'react';
import Login from './auth/Login';
import Loading from './loading/Loading';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: <Login updateView={this.changeView}/>
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView = (link) => {

    let view = <Login updateView={this.changeView} />;
    switch(link) {
      case 'login':
        view = <Login updateView={this.changeView}/>
        break;
      case 'loading':
        view = <Loading updateView={this.changeView}/>
        break;
      default:
        view = <Login updateView={this.changeView}/>
        break;
    }

    this.setState({view: view})

  }

  render() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

    return (
      <div className="App">
          {this.state.view}
      </div>
    );

  }
}

export default App;
