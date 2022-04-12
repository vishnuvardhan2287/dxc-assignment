import React, {useState} from 'react';
import PropTypes from 'prop-types'

const Search = ({showClear,clearUser,setAlert,searchUsers}) =>{
  const [text,setText] = useState('')

  const onChange = e =>{
      setText(e.target.value)
  }

  const onSubmit = e =>{
      e.preventDefault();
      if(text === ''){
          setAlert('Please Enter Something','light')
      } else {
        searchUsers(text)
        setText('')
      }     
  }
    return (
      <>
        <form onSubmit={onSubmit} className='form'>
            <input 
                type='text' 
                name='text' 
                value={text} 
                onChange={onChange}
                placeholder='Search Users...' />
            <input 
                type='submit' 
                value='Search' 
                className= 'btn btn-dark btn-block' />
        </form>
        {showClear && <button className='btn btn-light btn-block' onClick={clearUser}>Clear</button>}
      </>
    )
  }

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}

export default Search;