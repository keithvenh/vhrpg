export default function CharacterField({label, value}) {

  return (
    <div className='characterField'>
      <p className='label'>{label}</p>
      <div className='value'>{value}</div>
    </div>
  )
}