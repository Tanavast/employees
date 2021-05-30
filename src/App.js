import Employees from './components/employees-list/employees-list';
import Birthdays from './components/employees-birthdays/employees-birthdays';
import './App.css';

function App() {
  return (
    <div className="App">
      <Employees />
      <Birthdays />
    </div>
  );
}

export default App;
