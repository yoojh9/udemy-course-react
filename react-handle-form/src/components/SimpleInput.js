import {useRef, useState} from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    if(enteredName.trim() === '') {
      setEnteredNameIsValid(false)
      return;
    }

    setEnteredNameIsValid(true)
    console.log(enteredName);
    console.log(nameInputRef.current.value);
    // nameInputRef.current.value = ''; => NOT IDEAL. DON'T MANIPULATE THE DOM
    setEnteredName('')
  }

  const nameInputClasses = enteredNameIsValid ? 'form-control' : 'form-control invalid'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} value={enteredName} type='text' id='name' onChange={nameInputChangeHandler}/>
        {!enteredNameIsValid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
