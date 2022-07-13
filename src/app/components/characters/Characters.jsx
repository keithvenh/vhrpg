import React from 'react';
import { query, onSnapshot } from 'firebase/firestore';
import { characters } from '../../../db/application/db';
import CharacterLink from './CharacterLink';

class Characters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [],
            view: '',
            page: '',

        }
        this.getCharacters = this.getCharacters.bind(this);
    }

    async getCharacters(characters) {

        const q = query(characters);
      
        const unsub = onSnapshot(q,(querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const data = querySnapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
            }));
      
            this.setState({characters: data});
          });
        } )
        return unsub;
      
    }

    componentDidMount() {
        this.getCharacters(characters);
    }

    render() {

        return (
            <div className='characters'>
                <h1>Characters<span className='character-add' onClick={() => this.props.updateView('characterAdd','','')}>+</span></h1>
                {this.state.characters.map((char) => (<CharacterLink key={char.id} character={char} updateView={this.props.updateView} />))}
            </div>
        )

    }
}

export default Characters;