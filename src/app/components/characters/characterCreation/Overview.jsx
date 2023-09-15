import FormSelect from '../../forms/FormSelect';
import Form from '../../forms/Form';
import FormInput from '../../forms/FormInput';

export default function Overview({character, handleCharacterForm}) {

    console.log(character);
    console.log(handleCharacterForm);
    const characterTypeOptions = [
        {value: 'pc', display: 'PlayerCharacter'},
        {value: 'nemesis', display: 'Nemesis'},
        {value: 'rival', display: 'Rival'},
        {value: 'minion', display: 'Minion'}
    ]

    return (
        <>
            <div className='pageHeader'>
                <h2 className='pageTitle'>Overview</h2>
                <h2 className='pageSubtitle'>Overview</h2>
            </div>

            <FormSelect
                options={characterTypeOptions} 
                name='characterType'
                label='Character Type'
                value={character.characterType}
                handler={handleCharacterForm}
                autoFocus={true}
            />

            <FormInput
                name='name'
                label='Character Name'
                value={character.name}
                handler={handleCharacterForm}
            />

            <FormInput
                name='imageURL'
                label='Image URL'
                value={character.imageURL}
                handler={handleCharacterForm}
            />
        </>
    )
}