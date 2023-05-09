import React, {useContext} from "react";
import { userContext } from "../Context";
import { fetcher } from "../App";
import useSWR from 'swr'

export default function Chapters(){
    const { setPage, langCode, setLoadChapter } = useContext(userContext)
    const { data: chapterList } = useSWR(`https://api.quran.com/api/v4/chapters?language=${langCode}`,fetcher)

    return <div>
        <h1>Select A Chapter</h1>
        {chapterList && chapterList.chapters.map((chapter,key) => {
            return <h3 key={key} onClick={() => {setPage('verses'); setLoadChapter(chapter.id)}}>{chapter.name_simple}</h3>
        })}
    </div>
}
