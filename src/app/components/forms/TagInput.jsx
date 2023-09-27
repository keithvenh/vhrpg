import React, { useState } from 'react';

function TagInput({ name, options, tags, onTagsChange }) {
  const [inputValue, setInputValue] = useState('');
  const [hasFocus, setHasFocus] = useState(false);

  const filteredOptions = options.filter(option => 
      option.includes(inputValue) && !tags?.includes(option)
  );

  const addTag = newTag => {
    console.log(newTag);
      if (!tags?.includes(newTag)) {
          onTagsChange([...tags, newTag].sort());
      }
      setInputValue('');  // clear the input field
  };

  const removeTag = (tagToRemove) => {
    console.log(tagToRemove);
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

    return (
        <div className='formFieldContainer' style={styles.container}>
          <div className='formField'>
            <input
                name={name}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter' && filteredOptions.includes(inputValue)) {
                        addTag(inputValue);
                    }
                }}
                onFocus={() => setHasFocus(true)}
                onBlur={() => setHasFocus(false)}
                style={styles.input}
                className='input'
            />
            <div style={styles.dropdown}>
                {filteredOptions.sort().map(option => (
                    <div key={option} onClick={() => addTag(option)} style={styles.option}>
                        {option}
                    </div>
                ))}
            </div>
            <div style={styles.tags}>
                {tags?.map(tag => (
                    <div key={tag} style={styles.tag}>
                        {tag}
                        <span onClick={() => removeTag(tag)} style={styles.closeButton}>x</span>
                    </div>
                ))}
            </div>
          </div>
        </div>

    );
}

const styles = {
    container: {
        position: 'relative',
    },
    input: {
        width: '100%',
        padding: '8px 12px',
        fontSize: '16px',
        boxSizing: 'border-box',
        color: 'white'
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        minWidth: '50%',
        textAlign: 'left',
        maxHeight: '140px',
        overflowY: 'auto',
        padding: '6px',
        border: '2px solid rgba(214, 214, 214, 0.5)',
        backgroundColor: 'rgba(214,214, 214 ,0.1)',
        boxSizing: 'border-box',
        zIndex: 1,
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        width: '95%'
    },
    option: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#6c1c19',
      borderRadius: '20px',
      padding: '5px 12px',
      gap: '6px',
      fontSize: '12px',
      zIndex: 10,
      cursor: 'pointer'
    },
    tags: {
        marginTop: '10px',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        cursor: 'pointer'
    },
    tag: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#55624d',
        borderRadius: '20px',
        padding: '5px 12px',
        gap: '6px',
        fontSize: '12px'
    },
    closeButton: {
        cursor: 'pointer',
        marginLeft: '6px',
        fontWeight: 'bold'
    }
}

export default TagInput;
