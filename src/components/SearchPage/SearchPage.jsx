import './SearchPage.css'
import {Link} from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";
import { useState, useEffect } from "react"
import Cookies from 'js-cookie'

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState("")
    const [searchedMovies, setSearchedMovies] = useState([])

    const formatData = data => ({
        id: data.id,
        backdropPath: data.backdrop_path,
        overview: data.overview,
        posterPath: data.poster_path,
        title: data.title,
    })

    const getSearchedMovie = async () => {
        const jwtToken = Cookies.get("jwt_token")
        const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
        const option = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`
            }            
        }
        const response = await fetch(url, option)
        const data = await response.json()
        const formatedData = data.results.map(movie => formatData(movie));
        setSearchedMovies(formatedData);
    }

    useEffect(() => {
        getSearchedMovie()
    }, [searchInput])
    
    const navbar = () => {
        return <nav className="navbar">
            <div className='links-container'>
                <div className="navbar-logo">
                    <img
                        src="https://res.cloudinary.com/dfomcgwro/image/upload/v1769703370/Group_7399_h5htip.png"
                        alt="Netflix Logo"
                    />
                </div>
                <div className="navbar-links">
                    <Link to="/"><button className="" type="button">Home</button></Link>
                    <Link to="/popular"><button className="" type="button">Popular</button></Link>
                </div>
            </div>
            <div className='avatar-container'>
                <form className="search-container">
                    <input type="search" placeholder='Search Movies' onChange={ e => setSearchInput(e.target.value) } />
                    <button className="search-button" type="submit"><IoMdSearch  color="white" size={20} /></button>
                </form>
                <div className="navbar-avatar"> 
                    <Link to="/profile"><img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1769708073/Group_anj9qw.png" alt="User Avatar" width={30}/></Link>
                </div>
            </div>
        </nav>
    }
    return <div className="search-page">
        {navbar()}
        <div className="searched-movies-list">
            {
                searchedMovies.length > 0 ? searchedMovies.map(movie => (
                    <Link to={`/movie/${movie.id}`} ><img src={movie.backdropPath} alt={ movie.title} /></Link>
                )) : <div className='no-search-found'>
                        <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1769719647/Group_7394_jybdnq.png" alt="no result" />
                        <p>Your search for {searchInput} did not find any matches.</p>
                </div>
            }
        </div>
    </div>

}

export default SearchPage