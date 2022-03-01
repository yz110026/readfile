
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import DisplayData from './DisplayData';

function App() {
const [fileName, setFileName] = useState('');
const [fileContent, setFileContent] = useState([]);
  return (
    <div className="App">
      <Header title='readfile'/>
      <Nav 
        setFileName = {setFileName}
        setFileContent = {setFileContent}
      />
      <DisplayData 
        fileName = {fileName}
        fileContent = {fileContent}
      />
      <Footer />     
    </div>
  );
}

export default App;
