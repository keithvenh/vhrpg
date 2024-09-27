export default function TaskList({title, tasks, children}) {

  const uncheckbox = <i className='fa-regular fa-square' />
  return (
    <div className='task-list'>
      <h3 className='task-list-title'>{title}</h3>
      <ul>
        {tasks.map((task, index) => <li key={index} className='task'>{uncheckbox} {task}</li>)}
      </ul>
      {children}
    </div>
  )
}