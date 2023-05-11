import React, { useContext, useState } from "react";
import { userContext } from "../Context";
import useSWR from "swr";
import { fetcher } from "../App";
import "../App.css";

export default function Verses() {
  const [pageNo, setPageNo] = useState(1);
  const { loadChapter, langCode, setPage } = useContext(userContext);
  const { data: verses } = useSWR(
    `https://api.quran.com/api/v4/verses/by_chapter/${loadChapter}?language=${langCode}&words=true&page=${pageNo}&per_page=10`,
    fetcher
  );
  function turnPage() {
    if (pageNo < verses.pagination.total_pages) {
      setPageNo((page) => page + 1);
    }
  }

  return (
    <div className="my-6 pb-3 w-10/12">
      <div className="bg-white rounded-lg mt-4 mb-6 p-4 pb-6">
        {verses &&
          verses.verses.map((verse, key) => {
            return (
              <>
                <p key={key} className="text-xl px-4 py-1">
                  {verse.words.map((word) => {
                    return `${word.translation.text} `;
                  })}
                </p>
                {key !== verses.verses.length - 1 ? (
                  <div className="my-4 bg-black w-full h-[0.03em]" />
                ) : null}
              </>
            );
          })}
      </div>
        <div className="my-5">
            {pageNo > 1 ? (
                <button
                onClick={() => setPageNo((page) => page - 1)}
                className="bg-white px-4 py-1 rounded-md mx-2 font-semibold text-lg"
                >
                Previous Page
                </button>
            ) : null}
            {verses && pageNo !== verses.pagination.total_pages ? (
                <button
                onClick={turnPage}
                className="bg-white px-4 py-1 rounded-md mx-2 font-semibold text-lg"
                >
                Next Page
                </button>
            ) : null}
        </div>
      <button
        className="bg-white px-4 py-1 rounded-md mx-2 font-semibold text-lg"
        onClick={() => {
          setPage("chapters");
        }}
      >
        Chapters List
      </button>
    </div>
  );
}
