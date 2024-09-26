import React, { useState } from 'react';

import Tags from '../../helpers/application/Tags';

function TagInput({ name, label, options, tags, onTagsChange }) {
  const [search, setSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredOptions = options.filter(option => 
      option.includes(search) && !tags?.includes(option)
  );

  const addTag = newTag => {
      if (!tags?.includes(newTag)) {
          onTagsChange([...tags, newTag].sort());
      }
      setSearch('');  // clear the input field
  };

  const removeTag = (tagToRemove) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

    return (
        <div className='formFieldContainer'>
          <div className='formField'>

            <p className={`label ${isFocused && 'hasFocus'}`} id={`${name}Label`}>{label}</p>

            <div className='tags'>

                {tags?.map(tag => (

                    <div key={tag} className='tag selected'>
                        {tag}
                        <i className='fas fa-xmark tagIcon' onClick={() => removeTag(tag)}></i>
                    </div>

                ))}

            </div>

            <div className='tagInputSelector'>

              <div className='searchContainer'>

                <i className='fas fa-magnifying-glass'></i>
                <input className='tagSearch'
                  name={name}
                  value={search}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && filteredOptions.includes()) {
                        addTag();
                    }
                  }}
                />

              </div>

              <div className='tagOptionsContainer'>

                  <div className='tags options'>

                    {filteredOptions.sort().map(tag => (
                        <div key={tag} onClick={() => addTag(tag)} className='tag option'>
                            {tag}
                        </div>
                    ))}

                  </div>
              </div>

            </div>

          </div>
        </div>

    );
}

export default TagInput;
