import './Popular.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import {Link} from "react-router-dom"

const Popular = () => {
    const [popularMovies, setPopularMovies] = useState([])

    const formatData = data => ({
        id: data.id,
        backdropPath: data.backdrop_path,
        overview: data.overview,
        posterPath: data.poster_path,
        title: data.title,
    })

    useEffect(() => {
        const getPopularMoviesData = async () => {
            const jwtToken = Cookies.get("jwt_token")
            const url = "https://apis.ccbp.in/movies-app/popular-movies"
            const option = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
            const response = await fetch(url, option)
            const data = await response.json()
            const formatedData = data.results.map(movie => formatData(movie))
            setPopularMovies(formatedData)
        }
        getPopularMoviesData()
    }, [])
    return <div className='popular-page'>
        <Navbar activeId="popular" />
        <div className="popular-movies-list">
            {
                popularMovies.map(movie => (
                    <Link to={`/movie/${movie.id}`} ><img src={movie.backdropPath} alt={ movie.title} /></Link>
                ))
            }
        </div>
        <Footer />
    </div>
}

export default Popular