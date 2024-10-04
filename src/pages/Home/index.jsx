import './styles.scss';
import PCBar from '../Characters/PCBar';

export default function Home() {

  const uncheckbox = <i className='fas fa-square'></i>
  const checkbox = <i className='fas fa-square-check'></i>

  return (
      <section className="Home">
        <h1>Welcome to The Commonality Holonet!</h1>
        <p>You have joined the holonet from the Jedha System</p>
        <hr />
        <h2>Profiles of Key Denizens</h2>
        <PCBar />
        <hr />
        <h2>Information about the The Commonality</h2>
        <p>The Commonality is a loose confederacy of five sectors. At it’s core is Columex, located in the Vorzyd Sector and situated on two major hyperspace routes - the Salin Cooridor and the Perlemian Trade Route. As a pseudo-capital, it’s reaches include systems like Felucia in the Thanium Sector, Belderone in the Belderone Sector, Ossus in the Auril Sector, and Nam Chorios in the Meridian Sector. The Centrality is open for business, and though the Empire has a strong presence their, the lost battle at Yavin has their eyes primarily focused on stamping out the Rebel Alliance. The Centrality has it’s sights set on expanding its influence to even more sectors, including the Antemeridian Sector, the Maldrood Sector in the Mid Rim where the infamous space station known as The Wheel is a major hub, the Jospro Sector where Sy Myrth sits on the intersection of the Salin Cooridor and the significant Triellus Trade Route. Though The Commonality trades regularly with Lianna, they would like to incorporate the Tion Cluster, which is made up of the Tion Hegemony, the Allied Tion Sector and the Cronese Mandate. However, this is highly unlikely due to Tion’s strong independence.</p>
        <hr />
        <h2>Factions in The Commonality</h2>
        <p>The Commonality’s prosperity and opportunities have not gone unnoticed by other major players in the galaxy. Prosperity doesn’t come from nothing, and the Galactic Mining Guild and the Commerce Guild are both part of the rise in The Commonality’s prosperity. Columex being located on two major hyperspace lanes have allowed a strong branch of the Bounty Hunter’s Guild to arise. The Galactic Empire’s eternal reach is strong in The Commonality, and with it come sanctions and with those sanctions come groups looking to skirt those sanctions, and the Hutt Cartel, Black Sun and Car’Das Smuggling Ring are happy to oblige. All of this activity creates opportunity, specifically opportunity for piracy, and the Brethren of the Voidbound take every opportunity they can to raid and pillage. There is also rumors and whisper of two other groups active in The Commonality. It is rumored that there is a Rebel Alliance cell operating somewhere among its reaches. And rumors have begun to circulate of a new company being formed that will seek to make friends and enemies among all other operators, taking any job available, no matter whose toes it steps on. If anyone wishes to make their way in this confederacy, they will certainly have to deal with members of the factions, whether in cooperation or in competition.
        </p>
        <hr />
        <h2>News</h2>
        <p><i className='fas fa-newspaper'></i> The Commonality launches <a href='/astrogation'>new astrogation charts.</a></p>
        <p><i className='fas fa-newspaper'></i> The Commonality seeking developers for new holonet. <a href='/todos'>Apply today</a>.</p>
        <hr />
        <h2>Open Projects</h2>
        <p>There is a lot to do for a budding enterprise, see how you can contribute <a href='/todos'>here</a>.</p>
        <hr />
        <h2>Helpful Links</h2>
        <p><a href='/talents'>Talents</a> | <a href="/careers">Careers</a> | <a href='/specializations'>Specializations</a> | <a href='/force-powers'>Force Powers</a> | <a href='/skills'>Skills</a></p>
        
      </section>
  )
}