import './App.css';
import { useState } from 'react';
import FirstPage from './Components/FirstPage';
import {userContext} from './Context'
import Chapters from './Components/Chapters';
import useSWR from 'swr'
import Verses from './Components/Verses';

export const fetcher = (...args) => fetch(...args).then(response => response.json())

function App() {
  const [page,setPage] = useState("language")
  const [langCode, setLangCode] = useState('')
  const [loadChapter, setLoadChapter] = useState(0)
  const {data: languages} = useSWR('https://api.quran.com/api/v4/resources/languages',fetcher)

  return (
    <userContext.Provider value={{ setPage, languages, langCode, setLangCode, setLoadChapter, loadChapter }} >
      <div className="App flex flex-col place-items-center min-h-screen h-fit bg-teal-700 font-sans">
        <h1 className='text-white text-4xl mt-4 font-bold'>The Holy Quran</h1>
        {page === "language" ? languages && <FirstPage /> : null}   
        {page === "chapters" ? <Chapters /> : null}
        {page === "verses" ? <Verses /> : null}   
      </div>
    </userContext.Provider>
  );
}

export default App;
