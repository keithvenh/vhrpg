
export default function UserLink(props) {

    return (
        <span className='userLink' onClick={() => {
            props.handler('users', {subview: 'show', user: props.user, requestor: props.requestor})}
        }>{props.user.username}</span>
    )
}