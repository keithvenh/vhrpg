
function Loading(props) {

    setTimeout(() => props.updateView('login'), 3000);

    return (
        <div className='loading'>
            <h1>Loading...</h1>
        </div>
    )
}

export default Loading;