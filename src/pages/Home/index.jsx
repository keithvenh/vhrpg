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
        <p><i className='fas fa-newspaper'></i> Vorzyd Industries seeking developers for new organization holonet. <a href='/todos'>Apply today</a>.</p>
        <p><i className='fas fa-newspaper'></i> Vorzyd Industries purchases headquarters on Vorzyd V.</p>
        <hr />
        <h2>Open Projects</h2>
        <p>There is a lot to do for a budding enterprise, see how you can contribute <a href='/todos'>here</a>.</p>
        
      </section>
  )
}