import './App.css';
import DropFileInput from './component/drop-file-input/DropFileInput';
import logo from '../src/assets/logo.png'


function App() {

  return (
     <>
        <div className="box">

          <div className='header'>
              <img src={logo} className="log" />
              <p>Company Name file upload request </p>  
          </div>

          <DropFileInput className="input"/><br/>

        </div>
        <br/><br/>    
     </>

  );
}

export default App;
