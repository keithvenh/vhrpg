import './styles.scss';

export default function Home() {

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  return (
      <section className="Home">
        <h1>Welcome to the Vorzyd Industries Holonet!</h1>
        <p>You have joined the holonet from the Jedha System</p>
        <h3>Helpful Links:</h3>
        <p>
          <a href='/characters'>Galactic Denizens</a> |
          <a href='/planets'>Star Systems</a> |
          <a href='/factions'>Guilds, Factions and Organizations</a> |
          <a href='/astrogation'>Vorzyd Industries Astrogation Charts</a> |
          <a href='/contacts'>Vorzyd Industires Contact Holobook</a> |
          <a href='/species'>Galactic Species</a> |
          <a href='/settings'>Holonet Settings</a> |
          <a href='/vehicles'>Starship Database</a> |
          <a href='/organization'>About Us</a>
        </p>
        <hr />
        <h2>Information about the Vorzyd Sector</h2>
        <p>As our home, we care deeply about the Vorzyd Sector. Located almoste entirely in Galactic Grid R6, the Vorzyd Sector is home to a large variety of planets, species and industries. Served by the Salin Cooridor and the Perlimean Trade Route, the Vorzyd Sector is accessible to the rest of the galaxy, and benefits from it.</p>
        <hr />
        <h2>Vorzyd Industries</h2>
        <p>Vorzyd Industries is a conglomoration of different companies in a variety of industries. Some key highlights include farming, shipping, mechanics, recycling and defense. We look forward to serving you.</p>
        <hr />
        <h2>Vorzyd Industries Board Members</h2>
        <p>Pax Kal-Yuir | Ajairu Kojiti | Krachtig | Aleni Ben-Urdu | Dagnar Kell | Valtuk Akti | Nelumbo Kuztos | Silas Sozo</p>
        <hr />
        <h2>News</h2>
        <p><i className='fas fa-newspaper'></i> Vorzyd Industries launches <a href='/astrogation'>new astrogation charts.</a></p>
        <p><i className='fas fa-newspaper'></i> Vorzyd Industries seeking developers for new organization holonet. Apply today.</p>
        <p><i className='fas fa-newspaper'></i> Vorzyd Industries purchases headquarters on Vorzyd V.</p>
        <hr />
        <h2>Open Projects</h2>
        <ul>
          <li>{uncheckbox} <a href='/characters'>Galactic Denizen Profiles</a></li>
          <li>{uncheckbox} <a href='/settings'>Employee User Profiles</a></li>
          <li>{uncheckbox} <a href='/factions'>Guilds, Factions and Organzations Database</a></li>
          <li>{uncheckbox} <a href='/planets'>Vorzyd Sector Star Systems Database</a></li>
          <li>{uncheckbox} <a href='/contacts'>Vorzyd Industries Contact Database</a></li>
          <li>{uncheckbox} <a href='/species'>Galactic Species Profiles</a></li>
          <li>{uncheckbox} <a href='/vehicles'>Vorzyd Industries Starship Profile Database</a></li>
          <li>{uncheckbox} <a href='/organization'>Vorzyd Industry About Us and Financial Statemtns</a></li>
        </ul>
        
      </section>
  )
}