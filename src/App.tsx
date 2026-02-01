import './App.css';
import Counter from './components/Counter';
import Login from './components/Login'; 
import Todo from './components/Todo';
import City from './components/City';
function App() {
  return (
    <div>
      <City />
      <h1>Counter App</h1>
      <Counter />
      <h1>Login App</h1>
      <Login />
      <h1>Todo App</h1>
      <Todo />
    </div>
  );
}

export default App;
