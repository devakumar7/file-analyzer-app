import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from "./FileUpload";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        

        <Routes>
          <Route exact path="/file-upload" element={<FileUpload />} />
          

        </Routes>

        
      </Router>
    </div>
  );
}

export default App;
