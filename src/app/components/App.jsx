import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../db/application/db';
import MissionControl from './missionControl/MissionControl';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Loading from './loading/Loading';
import Characters from './characters/Characters';
import Character from './characters/Character';
import NewCharacter from './characters/NewCharacter';
import Navigation from './navigation/Navigation';
import User from './user/User';
import DeleteUser from './auth/Delete';
import EditUser from './auth/Edit';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [view, setView] = useState(<Login changeView={changeView} />);
  const auth = getAuth();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    setUser(user);
    updateProfile(user);
    if (initializing) setInitializing(false);
  }

  async function updateProfile(user) {
    if(user) {
      const profile = await getDoc(doc(db, 'users', user.uid))
      setProfile(profile.data());
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function changeView(page) {
    let view;
    switch(page) {
      case 'login':
        view = <Login changeView={this.changeView} user={user} />;
        break;
      case 'signup':
        view = <Signup changeView={this.changeView} user={user} />;
        break;
      case 'editUser':
        view = <EditUser changeView={this.changeView} user={user} />
        break;
      case 'delete':
        view = <DeleteUser changeView={this.changeView} user={user} />;
        break;
      case 'characterManagement':
        view = <Characters updateView={this.changeView} />;
        break;
      case 'character':
        view = <Character updateView={this.changeView}/>;
        break;
      case 'loading':
        view = <Loading updateView={this.changeView}/>;
        break;
      case 'missionControl':
        view = <MissionControl updateView={this.changeView} user={user} />;
        break;
      case 'newCharacter':
        view = <NewCharacter updateView={this.changeView}/>;
        break;
      case 'user':
        view = <User changeView={this.changeView} user={user}/>;
        break;
      default:
        view = <Loading updateView={this.changeView}/>;
        break;
    }
    setView(view);
  }

  if (initializing) {
    return (
      <div className='App'>
        <Loading />
      </div>
    );
  }

  if (!user) {
    return (
      <div className='App'>
        <div className='navigationContainer'><Navigation user={user} changeView={changeView} /></div>
        <div className='viewScreen'>{view}</div>
        <div className='chatContainer'></div>
      </div>
    );
  }

  return (
    <div className='App'>
      <div className='navigationContainer'><Navigation user={user} changeView={changeView} /></div>
      <div className='viewScreen'>{view}</div>
      <div className='chatContainer'></div>
    </div>
  );

}
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       view: <Loading updateView={this.changeView}/>,
//       user: null
//     }

//     this.changeView = this.changeView.bind(this);
//   }

//   changeView = (link, user=null, char=null) => {

  //   let view = <Loading updateView={this.changeView} />;
  //   switch(link) {
  //     case 'characterManagement':
  //       view = <Characters updateView={this.changeView} />;
  //       break;
  //     case 'character':
  //       view = <Character updateView={this.changeView} character={char}/>;
  //       break;
  //     case 'loading':
  //       view = <Loading updateView={this.changeView}/>;
  //       break;
  //     case 'login':
  //       view = <Login updateView={this.changeView}/>;
  //       break;
  //     case 'missionControl':
  //       view = <MissionControl updateView={this.changeView} user={user} />;
  //       break;
  //     case 'newCharacter':
  //       view = <NewCharacter updateView={this.changeView}/>;
  //       break;
  //     case 'user':
  //       view = <User updateView={this.changeView} />;
  //       break;
  //     default:
  //       view = <Loading updateView={this.changeView}/>;
  //       break;
  //   }

  //   this.setState({view: view, user: user})

  // }

//   render() {

//     return (
//       <div className="App">

//           <div className='navigationContainer'>

//             <Navigation updateView={this.changeView} />

//           </div>

//           <div className='viewScreen'>

//             {this.state.view}

//           </div>

//           <div className='chatContainer'>

//           </div>

//       </div>
//     );

//   }
// }

// export default App;
