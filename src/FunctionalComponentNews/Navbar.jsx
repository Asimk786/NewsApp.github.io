import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    let [language, setLanguage] = useState("hi")
    let [search, setSearch] = useState("")
    function changeLanguage() {
        if (language == "hi") {
            setLanguage("en")
            document.getElementById("language").innerHTML = "Hindi"
            props.changeLanguage("en")
        }
        else {
            setLanguage("hi")
            document.getElementById("language").innerHTML = "English"
            props.changeLanguage("hi")

        }
    }
    function getInputData(e) {
        setSearch(e.target.value )
    }
     function  postData(e) {
        e.preventDefault()
        props.changeSearch(search)
        setSearch("")
     }
        return (
            <nav className="navbar navbar-expand-lg background sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand text-light" to="/" onClick={() => props.changeSearch("")} >NewsApp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-light active" aria-current="page" to="/" onClick={() => props.changeSearch("")} >ALL</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/politics" onClick={() => props.changeSearch("")} >Politics</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/crime" onClick={() => props.changeSearch("")} >Crime</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/education" onClick={() => props.changeSearch("")} >Education</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link text-light dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Other
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/technology" onClick={() => props.changeSearch("")} >Technology</Link></li>
                                    <li><Link className="dropdown-item" to="/science" onClick={() => props.changeSearch("")} >Science</Link></li>
                                    <li><Link className="dropdown-item" to="/sport" onClick={() => props.changeSearch("")} >Sport</Link></li>
                                    <li><Link className="dropdown-item" to="/cricket" onClick={() => props.changeSearch("")} >Cricket</Link></li>
                                    <li><Link className="dropdown-item" to="/ipl" onClick={() => props.changeSearch("")} >IPL</Link></li>
                                    <li><Link className="dropdown-item" to="/entertainment" onClick={() => props.changeSearch("")} >Entertainment</Link></li>
                                    <li><Link className="dropdown-item" to="/jokes" onClick={() => props.changeSearch("")} >Jokes</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item ">
                                <div className="form-check form-switch mt-2">
                                    <input className="form-check-input" type="checkbox" onChange={changeLanguage} role="switch" id="languageSelector" />
                                    <label className="form-check-label" htmlFor="languageSelector" id="language" >English</label>
                                </div>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={postData}>
                            <input className="form-control me-2" name='search' value={search} onChange={(e) => this.getInputData(e)} type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        )
}   
