import React, {useContext} from "react";
import { userContext } from "../Context";
import '../App.css'

export default function FirstPage(){
    const { setPage, languages, setLangCode } = useContext(userContext)
    
    return <div className="grow flex flex-col place-content-center place-items-center">
        <h2 className="text-3xl font-semibold mb-5">Select your preferred language</h2>
        <select className="mb-3 p-1 rounded-md font-semibold text-xl" onChange={e => (setLangCode(e.target.value))} name="language">
            {languages.languages.map((lang,key) => {
                return <option key={key} value={lang.iso_code}>{lang.name}</option>
            })}
        </select>
        <button className="bg-white px-4 py-1 rounded-lg font-semibold text-lg" onClick={()=>{setPage("chapters")}}>Proceed</button>
    </div>
}