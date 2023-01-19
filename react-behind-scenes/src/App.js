import React, { useCallback, useMemo, useState } from 'react';
import Button from './components/UI/Button/Button'
import './App.css';
import DemoOutput from './components/Demo/DemoOutput';
import DemoList from './components/Demo/DemoList';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);
  const [listTitle, setListTitle] = useState('My List');

  console.log('APP RUNNING')

  const toggleParagraphHandler = useCallback(() => {
    if(allowToggle){
      setShowParagraph(prev => !prev);
    }
  },[])

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title')
  },[])

  const allowToggleHandler = () => {
    setAllowToggle(true);
  }

  const listItems = useMemo(()=>[5, 3, 1, 10, 9], [])

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph}/>
      <Button onClick={allowToggleHandler}>Allow Toggle</Button>
      <Button onClick={toggleParagraphHandler}>Show Paragraph</Button>
      <DemoList title={listTitle} items={listItems}/>
      <Button onClick={changeTitleHandler}>Change List Title</Button>

    </div>
  );
}

export default App;
