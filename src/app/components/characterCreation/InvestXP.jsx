
export default function InvestXP(props) {

    return (
        <div>
            <h2>Invest XP</h2><div>

<input type='submit' id='submit' className='button formButton submitButton' value='Previous' onClick={()  => props.characterCreationView(props.getNextView('investXp').priorView)}/>
<span>
    <input type='submit' id='submit' className='button formButton submitButton' value='Next' onClick={()  => props.characterCreationView(props.getNextView('investXp').nextView)}/>
</span>
</div>
        </div>
    )
}