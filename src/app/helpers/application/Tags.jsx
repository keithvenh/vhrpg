export default function Tags({tagList, classList}) {

  return (
    <div className='tags'>
      {tagList.map(tag => {
        return (
          <div key={tag} className={`tag ${classList}`}>
            {tag}
          </div>
        )
      })}
    </div>
  )
}