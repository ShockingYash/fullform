import { useState } from "react";
import axios from "axios";
export default function Acronyms(){

    const [acronym, setAcronym] = useState("");
    const [fullForm, setFullForm] = useState("");
    const [search, setSearch] = useState("");

    const handleInputChange = (value) => {
        setAcronym(value);
        setFullForm(value);
    }

    const getAcronyms = () => {
        setFullForm("");
        const url = "http://localhost:9000/get";
        axios.get(url)
        .then(res =>{
            setAcronym(res.data[0].acronym);
            setSearch(res.data[0].id);
        })
        .catch(err=>{
            console.log(err);
        });
    }
    const getFullForm = (event) => {
        event.preventDefault();
        const data = {id:search}
        const url = "http://localhost:9000/form?id="+search;
        axios.get(url,data)
        .then(res =>{
            setFullForm(res.data[0].full_form);
        })
        .catch(err=>{
            console.log(err);
        });
    }

    return(
        <div className="container">
            <button onClick={getAcronyms}>Get Acronyms</button>
            <input type = "text" placeholder="Acronym" disabled
            onChange={(e) => handleInputChange(e.target.value)} value={acronym}/>
            <button onClick={getFullForm}>Get full form</button>
            <textarea type = "text" placeholder="Full Form"
            onChange={(e) => handleInputChange(e.target.value)} 
            disabled  value={fullForm}></textarea>
        </div>
    );
}