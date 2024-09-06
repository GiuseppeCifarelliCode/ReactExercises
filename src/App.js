import {useState, useEffect} from 'react';
import './App.css';

function Counter() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Incrementa</button>
      <button onClick={() => setCounter(counter - 1)}>Decrementa</button>
    </div>
  )
}

function ItemList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if(inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  }

  const handleRemoveItem = (index) => {
    setItems(items.filter((el, i) => i !== index));
  }

  return (
    <div>
      <input
        value = {inputValue}
        onChange = {(e) => setInputValue(e.target.value)}
        placeholder='Aggiungi un elemento'
      />
      <button onClick={handleAddItem}>Aggiungi</button>
      <ul>
        {items.map((item,index) => (
          <li key={index}>
            {item} <button onClick={() => handleRemoveItem(index)}>Rimuovi</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Capire come gestire gli input
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Benvenuto, ${username}!`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome utente:
            <input value={username} onChange={(e) => setUsername(e.target.value)}></input>
          </label>
        </div>
        <div>
          <label>Password:
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

// Capire l'utilizzo di useEffect
function Watch() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;
    if(isActive) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else if(!isActive && seconds !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive, seconds]);

  return (
    <div>
      <h1>{seconds}s</h1>
      <button onClick={()=> setIsActive(true)}>Avvia</button>
      <button onClick={() => setIsActive(false)}>Ferma</button>
      <button onClick={() => { setIsActive(false); setSeconds(0)}}>Ripristina</button>
    </div>
  )
}

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <p>{isOn ? 'Acceso' : 'Spento'}</p>
      <button onClick={() => setIsOn(!isOn)}>{isOn ? 'Spegni' : 'Accendi'}</button>
    </div>
  )
}

function App() {
  return <div>
  <Counter></Counter>
  <ItemList></ItemList>
  <LoginForm></LoginForm>
  <Watch></Watch>
  <ToggleSwitch></ToggleSwitch>
  </div>
}

export default App;
