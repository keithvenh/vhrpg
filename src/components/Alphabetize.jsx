function sortData(data) {
  return Object.keys(data).sort().map((key) => [key, data[key]]);
}

function segment(data, sortField) {
  let segments = {}
  data.map(d => {
    const segment = d[sortField]?.charAt(0) || d.name?.charAt(0) || d.displayName?.charAt(0)
    if(segment in segments) {
      segments[segment].push(d)
    }else(segments[segment] = [d])
  })
  return segments;
}

export default function AlphabetizeWithLink({data, sortField, displayField, linkPrefix, linkField}) {

  displayField = displayField || sortField;
  const segmentedData = segment(data, sortField);
  const sortedData = sortData(segmentedData, sortField);

  return (
    <div className='Alphabetize'>
      {sortedData.map((data, index) => {
        return (
          <div key={index} className='segment'>
            <p className='segmentor sw'>{data[0]}</p>
            {data[1].map((d, index) => {
              return (
                <p key={index} className='segment-item'><a href={`${linkPrefix}${d[linkField]}`}>{d[displayField] || d.name || d.displayName}</a></p>
              )
            })}
          </div>
        )
      })}

    </div>
  )
}