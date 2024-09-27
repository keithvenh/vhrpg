import './styles.scss';
import PCBar from '../Characters/PCBar';

export default function Home() {

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  return (
      <section className="Home">
        <h1>Welcome to the Vorzyd Industries Holonet!</h1>
        <p>You have joined the holonet from the Jedha System</p>
        <hr />
        <h2>Information about the Vorzyd Sector</h2>
        <p>As our home, we care deeply about the Vorzyd Sector. Located almoste entirely in Galactic Grid R6, the Vorzyd Sector is home to a large variety of planets, species and industries. Served by the Salin Cooridor and the Perlimean Trade Route, the Vorzyd Sector is accessible to the rest of the galaxy, and benefits from it.</p>
        <hr />
        <h2>Vorzyd Industries</h2>
        <p>Vorzyd Industries is a conglomoration of different companies in a variety of industries. Some key highlights include farming, shipping, mechanics, recycling and defense. We look forward to serving you.</p>
        <hr />
        <h2>Vorzyd Industries Board Members</h2>
        <PCBar />
        <hr />
        <h2>News</h2>
        <p><i className='fas fa-newspaper'></i> Vorzyd Industries launches <a href='/astrogation'>new astrogation charts.</a></p>
        <p><i className='fas fa-newspaper'></i> Vorzyd Industries seeking developers for new organization holonet. Apply today.</p>
        <p><i className='fas fa-newspaper'></i> Vorzyd Industries purchases headquarters on Vorzyd V.</p>
        <hr />
        <h2>Open Projects</h2>
        <ul>
          <li>{checkbox} <a href='/characters'>Galactic Denizen Profiles</a></li>
          <li>{uncheckbox} <a href='/settings'>Employee User Profiles</a></li>
          <li>{uncheckbox} <a href='/factions'>Guilds, Factions and Organzations Database</a></li>
          <li>{checkbox} <a href='/planets'>Vorzyd Sector Star Systems Database</a></li>
          <li>{uncheckbox} <a href='/contacts'>Vorzyd Industries Contact Database</a></li>
          <li>{uncheckbox} <a href='/species'>Galactic Species Profiles</a></li>
          <li>{uncheckbox} <a href='/vehicles'>Vorzyd Industries Starship Profile Database</a></li>
          <li>{uncheckbox} <a href='/organization'>Vorzyd Industry About Us and Financial Statemtns</a></li>
          <li>{uncheckbox} link contacts with characters using firebase reference</li>
          <li>{uncheckbox} figure out how to use sql database for vehicles, gear, etc. --OR-- convert spreadhseets to json</li>
          <li>{uncheckbox} create json seed files in case we need to reset database use</li>
          <li>{uncheckbox} link currentlocation fields with planets using firebase reference</li>
          <li>{uncheckbox} link known associates to characters with firebase reference</li>
        </ul>
        
      </section>
  )
}