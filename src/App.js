import './App.css';
import  {useState} from 'react';

import Quiz from './components/Quiz';
function App() {

  const [data,setData]=useState(null)
  const [show,setShow] =useState(true)

  function getData(val)
  {
    setData(val.target.value)
  }
return (
<>
{
  show ?
  <>
    <input type="text" onChange={getData} />
      <button type="button" onClick={()=>setShow(false)}>
          Click Me!
      </button>
  </>
  :  
  <Quiz username={data} />

}

</>
  );
}

export default App;
