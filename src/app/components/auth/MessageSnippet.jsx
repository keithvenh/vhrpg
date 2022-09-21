
export default function MessageSnippet(props) {

    console.log(props);
    let timestamp = new Date(props.message.timestamp.seconds * 1000 + props.message.timestamp.nanoseconds/1000000)
    timestamp = timestamp.toLocaleString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' })

    return (
        <div className={`messageSnippet ${props.message.read}`}>
            <p className='messageSender'>{props.message.sender.username}</p>
            <p className='messageSubject'>{props.message.subject}</p>
            <p className='messageTimestamp'>{timestamp}</p>
        </div>
    )
}