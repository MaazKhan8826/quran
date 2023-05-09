import React, {useContext} from "react";
import { userContext } from "../Context";

export default function FirstPage(){
    const { setPage, languages, setLangCode } = useContext(userContext)
    
    return <div>
        <h2>Select your preferred language</h2>
        <select onChange={e => (setLangCode(e.target.value))} name="language">
            {languages.languages.map((lang,key) => {
                return <option key={key} value={lang.iso_code}>{lang.name}</option>
            })}
        </select>
        <button onClick={()=>{setPage("chapters")}}>Proceed</button>
    </div>
}