import HomePage from './Pages'
import {AppProvider} from "./AppContext";
import './App.sass'
function App() {
  return (
    <AppProvider>
      <HomePage/>
    </AppProvider>
  );
}

export default App;
