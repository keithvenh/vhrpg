export default function FormSection({label, children}) {

  return (
    <div className='formSection'>
      <p className='sw formSectionLabel'>
        {label}
      </p>
      {children}
    </div>
  )
}