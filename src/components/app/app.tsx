import React, { useState, useCallback } from 'react';
import './app.css';

import { compiler } from '../../emulator/compiler';

const App = () => {

  const [packetInput, packetinputChnage] = useState('');
  const [packetVerifyError, packetVerifyErrorchange] = useState('');

  const textAreaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputVal = event.currentTarget.value;
    packetinputChnage(inputVal);
    // reset error on each change
    packetVerifyErrorchange('');
    try {
      const parsedText = compiler(inputVal);
      console.log(parsedText);
    } catch (error) {
      packetVerifyErrorchange(error.message)
    }
  }, [packetinputChnage, packetVerifyErrorchange]);

  return (
    <div>
      <textarea
        rows={30}
        cols={50}
        value={packetInput}
        onChange={textAreaChange}
        placeholder="Enter packet format"
      />
     {
       packetVerifyError 
       ? (
        <div className="error">
          {packetVerifyError}
        </div>
       ) : (
        <div className="success">
          "All good ..."
        </div>
       )
       
     }
    </div>
  );
}

export default App;
