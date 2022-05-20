import { useState } from 'react';
import { useGame } from '../../context';

export const LoginPage = () => {

    const [text, setText] = useState<string>('');
    const {setUserName, userName} = useGame()
const handleSubmit = (e:any) =>{

    e.preventDefault();
    setUserName(text)
}

  return <form
  onSubmit={handleSubmit}
 >
    <input
    value={text}
    onChange={e=> setText(e.target.value)}
    placeholder="Your name" />
    <button type="submit">
        Submit
    </button>
  </form>;
};