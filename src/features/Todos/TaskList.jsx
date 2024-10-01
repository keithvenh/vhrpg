export default function TaskList({title, tasks, complete, children}) {

  const uncheckbox = <i className='fa-regular fa-square' />
  const checkbox = <i className='fas fa-square-check'></i>
  return (
    <div className='task-list'>
      <h3 className='task-list-title'>{title}</h3>
      <ul>
        {tasks.map((task, index) => <li key={index} className='task'>{uncheckbox} {task}</li>)}
        {complete && complete.length > 0 ? <hr style={{"border": "1px dashed #777"}} /> : ''}
        {complete && complete.length > 0 ? complete.map((task, index) => <li key={index} className='task'>{checkbox} {task}</li>) : ''}
      </ul>
      {children}
    </div>
  )
}