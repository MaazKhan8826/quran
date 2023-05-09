import React, { useContext, useState } from "react";
import { userContext } from "../Context";
import useSWR from 'swr';
import { fetcher } from '../App'

export default function Verses(){
    const [pageNo, setPageNo] = useState(1)
    const { loadChapter, langCode, setPage } = useContext(userContext)
    const { data:verses } = useSWR(`https://api.quran.com/api/v4/verses/by_chapter/${loadChapter}?language=${langCode}&words=true&page=${pageNo}&per_page=10`,fetcher)
    function turnPage(){
        if(pageNo < verses.pagination.total_pages){
            setPageNo(page => page + 1)
        }
    }
    
    return <div>
        <div>{verses && verses.verses.map((verse,key) => {
            return <p key={key}>{verse.words.map(word =>{
                return `${word.translation.text} `
            })}</p>
        })}
        {pageNo>1 ? <button onClick={()=>setPageNo(page => page-1)}>Prev Page</button> : null}
        <button onClick={turnPage}>Next Page</button>
        </div>
        <button onClick={()=>{setPage('chapters')}}>Chapters List</button>
    </div>
}