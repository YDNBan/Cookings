import './App.css'
import Navbar from './components/organisms/Navbar/Navbar'
import Hero from './components/pages/Hero/Hero';
import Results from './components/pages/Results/Results';

const App = () => {
 
  return (
    <div className='App'>
      <Navbar />
      {/*<Hero/> */}
      <Results/>
    </div>
    //For time being make a container with a static list of hotels. 
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
