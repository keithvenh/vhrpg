import React from 'react';
import Login from './auth/Login';
import Loading from './loading/Loading';
import emailLogin from '../helpers/auth/login.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: <Login />
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView = (link) => {

    let view = <Login />;
    switch(link) {
      case 'login':
        view = <Login />
        break;
      case 'loading':
        view = <Loading />
        break;
      default:
        view = <Login />
        break;
    }

    this.setState({view: view})

  }

  render() {

    emailLogin();
    
    return (
      <div className="App">
          {this.state.view}
      </div>
    );

  }
}

export default App;
