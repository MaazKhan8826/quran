import React, { useContext, useState } from "react";
import { userContext } from "../Context";
import { fetcher } from "../App";
import useSWR from "swr";
import "../App.css";

export default function Chapters() {
  const { setPage, langCode, setLoadChapter } = useContext(userContext);
  const { data: chapterList } = useSWR(
    `https://api.quran.com/api/v4/chapters?language=${langCode}`,
    fetcher
  );
  const [listStart, setListStart] = useState(0);

  return (
    <div className="w-1/2 my-7">
      <div className="bg-white mb-4 py-3 px-2 rounded-lg">
        <h2 className="text-3xl font-bold mb-3 text-teal-900">
          Select A Chapter
        </h2>
        {chapterList &&
          chapterList.chapters.map((chapter, key) => {
            if(key >= listStart && key<listStart+5){
              return (
                <h3
                  key={key}
                  onClick={() => {
                    setPage("verses");
                    setLoadChapter(chapter.id);
                  }}
                  className="hover:cursor-pointer bg-teal-700 mx-9 py-2 my-3 text-gray-100 text-xl font-semibold rounded-lg"
                >
                  {chapter.name_simple}
                </h3>
              );
            }
          })}
        <div>
          {listStart===0 ? null : <button 
            onClick={() => {
              setListStart((start) => start - 5);
            }} 
            className="bg-teal-700 py-1 px-4 rounded-md mx-4 my-2 text-white font-semibold"
          >
            Previous Chapters
          </button>}
          <button
            onClick={() => {
              setListStart((start) => start + 5);
            }}
            className="bg-teal-700 py-1 px-4 rounded-md mx-4 my-2 text-white font-semibold"
          >
            Next Chapters
          </button>
        </div>
      </div>
      <button
        onClick={() => setPage("language")}
        className="bg-white py-2 px-4 rounded-lg text-lg font-semibold mb-2 mt-1"
      >
        Choose Language
      </button>
    </div>
  );
}
