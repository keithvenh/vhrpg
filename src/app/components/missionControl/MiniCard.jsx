
export default function MiniCard(props) {
    return (
        <div className={`miniCard ${props.type}Card`} onClick={() => props.appView(props.view, {subview: props.subview, ...props.options})}>
            {}
            <p>
                <i className={`fas fa-${ props.type === 'new' ? 'circle-plus' : props.type === 'find' ? 'magnifying-glass' : 'hidden'}`}></i>
                {props.label} 
            </p>
        </div>
    )
}