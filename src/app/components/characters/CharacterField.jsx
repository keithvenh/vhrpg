export default function CharacterField({label, value}) {

  return (
    <div className='characterField'>
      <p className='label'>{label}</p>
      <p className='value'>{value}</p>
    </div>
  )
}