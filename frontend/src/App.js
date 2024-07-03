import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from '../src/components/Navigation';
import NotesList from '../src/components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from '../src/components/CreateUser';

function App() {
  return (
      <BrowserRouter>
        <Navigation/>
        
        <div className="container p-4">
          <Routes>
            <Route path="/" element={<NotesList/>}/>
            <Route path="/edit/:id" element={<CreateNote/>}/>
            <Route path="/create" element={<CreateNote/>}/>
            <Route path="/user" element={<CreateUser/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
