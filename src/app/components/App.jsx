import React from 'react';
import MissionControl from './missionControl/MissionControl';
import Login from './auth/Login';
import Loading from './loading/Loading';
import Characters from './characters/Characters';
import Character from './characters/Character';
import NewCharacter from './characters/NewCharacter';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: <Loading updateView={this.changeView}/>,
      user: null
    }

    this.changeView = this.changeView.bind(this);
  }

  changeView = (link, user=null, char=null) => {

    let view = <Loading updateView={this.changeView} />;
    switch(link) {
      case 'characterManagement':
        view = <Characters updateView={this.changeView} />;
        break;
      case 'character':
        view = <Character updateView={this.changeView} character={char}/>;
        break;
      case 'characterAdd':
        view = <NewCharacter updateView={this.changeView}/>;
        break;
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

    this.setState({view: view, user: user})

  }

  render() {

    return (
      <div className="App">
          {this.state.view}
      </div>
    );

  }
}

export default App;
