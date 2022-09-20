import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../db/application/db';
import Auth from './auth/Auth';
import MissionControl from './missionControl/MissionControl';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Loading from './loading/Loading';
import Characters from './characters/Characters';
import Character from './characters/Character';
import NewCharacter from './characters/NewCharacter';
import Navigation from './navigation/Navigation';
import Users from './users/Users';
import DeleteUser from './auth/Delete';
import EditUser from './auth/Edit';
import Campaigns from './campaigns/Campaigns';
import NewCampaign from './campaigns/NewCampaign';
import getProfile from '../helpers/users/getProfile';
import CharacterCreation from './characterCreation/CharacterCreation';

export default function App() {
  const context = useContext(UserContext);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [view, setView] = useState(<MissionControl appView={appView}/>);
  const [link, setLink] = useState('missionControl');
  const auth = getAuth();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    setUser(user);
    await updateProfile(user);
    if (initializing) setInitializing(false);
    if(!user) {
      appView('auth')
    }
  }

  async function updateProfile(user) {
    if(user) {
      const profile = await getProfile(user);
      setProfile(profile.data());
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function appView(link, options = {subview: ''}) {

    const views = {
      auth: <Auth appView={appView} />,
      loading: <Loading />,
      missionControl: <MissionControl appView={appView}/>,
      campaigns: <Campaigns appView={appView} options={options}/>,
      users: <Users options={options} />
    }

    if(link === 'users') {
      
      // !==========! WE  NEED TO FIGURE OUT WHY CONTEXT IS NOT WORKING IN THIS FUNCTION !==========! //
      if(options && options.user.uid === options.requestor.uid) {
          // Return myAccount if current user requestor are the same
          return appView('auth')
        } 

    }
    setView(views[link]);
    setLink(link);
  }


  if (initializing) {
    return (
      <div className='App'>
        <Loading />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{user, setUser, profile, setProfile}}>

      <div className='App'>
        <div className='navigationContainer'><Navigation changeView={appView} appView={appView} link={link}/></div>
        <div className='viewScreen'>{view}</div>
        <div className='chatContainer'></div>
      </div>

    </UserContext.Provider>
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
