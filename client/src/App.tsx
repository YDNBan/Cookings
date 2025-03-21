import './App.css'
import Navbar from './components/organisms/Navbar/Navbar'
import Hero from './components/pages/Hero/Hero';

const App = () => {
 
  return (
    <div className='App'>
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;

/*
function App(){
  return (
    <div className="App">
      <div className="content" >
        <h1>My API Tester!</h1>
      </div>
    </div>
  );
}


export default App
*/
