import logo from './logo.svg';
import './App.css';
import Pdfuploder from './components/Pdfuploder';
import AllRoutes from './components/AllRoutes';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <h1>Pdf Uploder</h1> */}
     <AllRoutes/>
    </div>
  );
}

export default App;
