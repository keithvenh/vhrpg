import React from 'react';

import MissionControl from './missionControl/MissionControl';
import Login from './auth/Login';
import Loading from './loading/Loading';
import Chat from './chat/Chat';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: <Loading updateView={this.changeView}/>,
      viewName: 'loading',
      user: null
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView = (link, user=null) => {

    let view = <Loading updateView={this.changeView} />;
    switch(link) {
      case 'mission control':
        view = <MissionControl updateView={this.changeView} user={user} />;
        break;
      case 'loading':
        view = <Loading updateView={this.changeView}/>;
        break;
      case 'login':
        view = <Login updateView={this.changeView}/>;
        break;
      default:
        view = <Loading updateView={this.changeView}/>;
        break;
    }

    this.setState({view: view, user: user, viewName: link})

  }

  render() {

    return (
      <div className="App">
          {this.state.view}
          <Chat user={this.state.user} currentView={this.state.viewName} />
      </div>
    );

  }
}

export default App;
