import './styles.scss'

import {useState, useContext} from 'react';
import {UserContext} from '../../app/contexts/userContext';
import useFetchData from '../../hooks/useFetchData';
import {fetchCharacters} from '../../services/characters/fetchCharacters';
import { updateUser } from '../../services/users';

import Loading from '../../features/Loading';

export default function Settings() {

  const {user} = useContext(UserContext);
  const [settings, setSettings] = useState(user.profile.settings)
  const {data: characters, loading} = useFetchData(fetchCharacters);

  function handleChange(event) {
    const settingName = event.target.name;
    const settingValue = event.target.value;
    setSettings(prevSettings => ({
      ...prevSettings,
      [settingName]: settingValue
    }))
  }

  function saveSettings() {
    updateUser(user.uid, {settings: settings});
    user.profile.settings = {settings};
  }

  if(loading || !user) return <Loading />

  let pcs = characters.filter(char => char.type == 'pc');
  pcs = pcs.sort((a, b) => user.profile.settings[a.id] - user.profile.settings[b.id])
  
  return (
    <section className='Settings'>
      <h1>{user.profile.public.username} Settings</h1>
      <button onClick={saveSettings}>Save Settings</button>
      <div className='settings-container'>
        
        <div className={`setting-option border-${settings.screenBorderColor}`}>
          <h3>Screen Border</h3>
          <label className='red'>
            <input type='radio' id='border-red' name='screenBorderColor' value='red' onChange={handleChange} checked={settings.screenBorderColor == 'red'} />
            Red <i className='fa-regular fa-square'></i>
          </label>
          <label className='orange'>
            <input type='radio' id='border-orange' name='screenBorderColor' value='orange' onChange={handleChange} checked={settings.screenBorderColor == 'orange'} />
            Orange <i className='fa-regular fa-square'></i>
          </label>
          <label className='yellow'>
            <input type='radio' id='border-yellow' name='screenBorderColor' value='yellow' onChange={handleChange} checked={settings.screenBorderColor == 'yellow'} />
            Yellow <i className='fa-regular fa-square'></i>
          </label>
          <label className='green'>
            <input type='radio' id='border-green' name='screenBorderColor' value='green' onChange={handleChange} checked={settings.screenBorderColor == 'green'} />
            Green <i className='fa-regular fa-square'></i>
          </label>
          <label className='teal'>
            <input type='radio' id='border-teal' name='screenBorderColor' value='teal' onChange={handleChange} checked={settings.screenBorderColor == 'teal'} />
            Teal <i className='fa-regular fa-square'></i>
          </label>
          <label className='blue'>
            <input type='radio' id='border-blue' name='screenBorderColor' value='blue' onChange={handleChange} checked={settings.screenBorderColor == 'blue'} />
            Blue <i className='fa-regular fa-square'></i>
          </label>
          <label className='white'>
            <input type='radio' id='border-white' name='screenBorderColor' value='white' onChange={handleChange} checked={settings.screenBorderColor == 'white'} />
            White <i className='fa-regular fa-square'></i>
          </label>
          <label className='grey'>
            <input type='radio' id='border-grey' name='screenBorderColor' value='grey' onChange={handleChange} checked={settings.screenBorderColor == 'grey'} />
            Grey <i className='fa-regular fa-square'></i>
          </label>
        </div>

        <div className={`setting-option link-${settings.linkColor}`}>
          <h3>Link Color</h3>
          <label className='red'>
            <input type='radio' id='link-red' name='linkColor' value='red' onChange={handleChange} checked={settings.linkColor == 'red'} />
            <a href="#">Red</a>
          </label>
          <label className='orange'>
            <input type='radio' id='link-orange' name='linkColor' value='orange' onChange={handleChange} checked={settings.linkColor == 'orange'} />
            <a href="#">Orange</a>
          </label>
          <label className='yellow'>
            <input type='radio' id='link-yellow' name='linkColor' value='yellow' onChange={handleChange} checked={settings.linkColor == 'yellow'} />
            <a href="#">Yellow</a>
          </label>
          <label className='green'>
            <input type='radio' id='link-green' name='linkColor' value='green' onChange={handleChange} checked={settings.linkColor == 'green'} />
            <a href="#">Green</a>
          </label>
          <label className='teal'>
            <input type='radio' id='link-teal' name='linkColor' value='teal' onChange={handleChange} checked={settings.linkColor == 'teal'} />
            <a href="#">Teal</a>
          </label>
          <label className='blue'>
            <input type='radio' id='link-blue' name='linkColor' value='blue' onChange={handleChange} checked={settings.linkColor == 'blue'} />
            <a href="#">Blue</a>
          </label>
          <label className='white'>
            <input type='radio' id='link-white' name='linkColor' value='white' onChange={handleChange} checked={settings.linkColor == 'white'} />
            <a href="#">White</a>
          </label>
          <label className='grey'>
            <input type='radio' id='link-grey' name='linkColor' value='grey' onChange={handleChange} checked={settings.linkColor == 'grey'} />
            <a href="#">Grey</a>
          </label>
        </div>

        <div className={`setting-option link-${settings.linkHoverColor}`}>
          <h3>Link Hover Color</h3>
          <label className='red'>
            <input type='radio' id='link-hover-red' name='linkHoverColor' value='red' onChange={handleChange} checked={settings.linkHoverColor == 'red'} />
            <a href="#">Red</a>
          </label>
          <label className='orange'>
            <input type='radio' id='link-hover-orange' name='linkHoverColor' value='orange' onChange={handleChange} checked={settings.linkHoverColor == 'orange'} />
            <a href="#">Orange</a>
          </label>
          <label className='yellow'>
            <input type='radio' id='link-hover-yellow' name='linkHoverColor' value='yellow' onChange={handleChange} checked={settings.linkHoverColor == 'yellow'} />
            <a href="#">Yellow</a>
          </label>
          <label className='green'>
            <input type='radio' id='link-hover-green' name='linkHoverColor' value='green' onChange={handleChange} checked={settings.linkHoverColor == 'green'} />
            <a href="#">Green</a>
          </label>
          <label className='teal'>
            <input type='radio' id='link-hover-teal' name='linkHoverColor' value='teal' onChange={handleChange} checked={settings.linkHoverColor == 'teal'} />
            <a href="#">Teal</a>
          </label>
          <label className='blue'>
            <input type='radio' id='link-hover-blue' name='linkHoverColor' value='blue' onChange={handleChange} checked={settings.linkHoverColor == 'blue'} />
            <a href="#">Blue</a>
          </label>
          <label className='white'>
            <input type='radio' id='link-hover-white' name='linkHoverColor' value='white' onChange={handleChange} checked={settings.linkHoverColor == 'white'} />
            <a href="#">White</a>
          </label>
          <label className='grey'>
            <input type='radio' id='link-hover-grey' name='linkHoverColor' value='grey' onChange={handleChange} checked={settings.linkHoverColor == 'grey'} />
            <a href="#">Grey</a>
          </label>
        </div>

        <div className={`setting-option font-${settings.font}`}>
          <h3>Primary Font</h3>
          <label className='sourceCodePro'>
            <input type='radio' id='sourceCodePro' name='font' value='sourceCodePro' onChange={handleChange} checked={settings.font == 'sourceCodePro'} />
            Source Code Pro
          </label>
          <label className='shareTechMono'>
            <input type='radio' id='shareTechMono' name='font' value='shareTechMono' onChange={handleChange} checked={settings.font == 'shareTechMono'} />
            Share Tech Mono
          </label>
          <label className='majorMonoDisplay'>
            <input type='radio' id='majorMonoDisplay' name='font' value='majorMonoDisplay' onChange={handleChange} checked={settings.font == 'majorMonoDisplay'} />
            Major Mono Display
          </label>
          <label className='pressStart2P'>
            <input type='radio' id='pressStart2P' name='font' value='pressStart2P' onChange={handleChange} checked={settings.font == 'pressStart2P'} />
            Press Start 2P
          </label>
          <label className='aurebesh sw'>
            <input type='radio' id='aurebesh' name='font' value='aurebesh' onChange={handleChange} checked={settings.font == 'aurebesh'} />
            Aurebesh
          </label>
          <label className='teko'>
            <input type='radio' id='teko' name='font' value='teko' onChange={handleChange} checked={settings.font == 'teko'} />
            Teko
          </label>

        </div>

        <div className="setting-option pc-ranks">
          <h3>PC List Order</h3>
          {pcs.map(char => (
            <label key={char.id}>
              <input type='number' min='1' max={characters.length} name={char.id} value={settings[char.id] || 0} onChange={handleChange}/>
              {char.displayName}
            </label>
          ))}
        </div>
      </div>

    </section>
  )
}