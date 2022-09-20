

export default function Form(props) {

    let camelTitle = props.title.split(' ').join('');
    return (
        <form className={`form ${camelTitle}`} onSubmit={props.handler}>
            <div className='formTitleContainer'>
                <h2 className='formTitle'>{props.title}</h2>
                <p className='formSubtitle'>{props.title}</p>
            </div>

            {props.children}
        </form>
    )
}