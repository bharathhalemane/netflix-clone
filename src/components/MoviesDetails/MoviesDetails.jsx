import './MoviesDetails.css'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useState, useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { getYear } from "date-fns"
import { BannerSection } from './StyledHome'
import {Link} from "react-router-dom"

const apiProgress = {
    inProgress: "INPROGRESS",
    success: "SUCCESS",
    failed: "FAILED"
}

const MoviesDetails = () => {
    const { id } = useParams()
    const [movieDetails, setMovieDetails] = useState()
    const [apiStatus, setApiStatus] = useState()

    const similarMovieFormat = data => ({
        backdropPath: data.backdrop_path,
        id: data.id,
        overview: data.overview,
        posterPath: data.poster_path,
        title: data.title
    })

    const languageFormat = lan => ({
        id: lan.id,
        englishName: lan.english_name
    })

    const formatMovieData = data => ({
        adult: data.adult,
        backdropPath: data.backdrop_path,
        budget: data.budget,
        genres: data.genres,
        id: data.id,
        overview: data.overview,
        posterPath: data.poster_path,
        releaseDate: data.release_date,
        runtime: data.runtime,
        similarMovies: data.similar_movies.map(movie => similarMovieFormat(movie)),
        spokenLanguages: data.spoken_languages.map(lan => languageFormat(lan)),
        title: data.title,
        voteAverage: data.vote_average,
        voteCount: data.vote_count
    })

    const getMovieDetails = async () => {
        try {
            const jwtToken = Cookies.get("jwt_token")
            const url = `https://apis.ccbp.in/movies-app/movies/${id}`
            const option = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
            const response = await fetch(url, option)
            if (response.ok) {
                const data = await response.json()
                const formattedData = formatMovieData(data.movie_details)
                setMovieDetails(formattedData)
                setApiStatus(apiProgress.success)
            } else {
                setApiStatus(apiProgress.failed)
            }
        } catch (err) {
            setApiStatus(apiProgress.failed)
        }
    }
    useEffect(() => {
        getMovieDetails()
    }, [])

    const renderLoader = () => {
        return (
            <div className='load-spinner'>
                <TailSpin
                    height="40"
                    width="40"
                    color="#e61515"
                    ariaLabel="tail-spin-loading"
                    visible={true}
                />
            </div>
        )
    }

    const renderFailureView = () => (
        <div className='failure-view'>
            <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1769760921/Background-Complete_w03eyv.png" alt="failure" />
            <p>Something went wrong. Please try again</p>
            <button onClick={getMovieDetails}>Try Again</button>
        </div>
    )


    const renderMovieDetail = () => {
        const { backdropPath, title, runtime, releaseDate,  overview, genres, spokenLanguages, voteAverage, voteCount, budget, similarMovies} = movieDetails
        const minutes = runtime
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        const duration = `${hours}h ${mins}m`

        const date = new Date(releaseDate)
        const year = getYear(date)
        console.log(similarMovies)
        return <div>
            <BannerSection bgImage={backdropPath}>
                <h1>{title}</h1>
                <div className='duration-con'>
                    <p>{duration}</p>
                    <p className="certificate">U/A</p>
                    <p>{year}</p>
                </div>
                <p className='description'>{overview}</p>
                <button className="play-button">Play</button>
            </BannerSection>
            <div className='additional-details'>
                <div className='genres'>
                    <h1 className='additional-details-heading'>Genres</h1>
                    <ul>
                        {
                            genres.map(each => (
                                <li key={each.id}>{each.name }</li>
                            ))
                            }
                        </ul>
                </div>
                <div className='audio-available'>
                    <h1 className='additional-details-heading'>Audio Available</h1>
                    <ul>
                        {
                            spokenLanguages.map(each => (
                                <li key={each.id}>{each.englishName }</li>
                            ))
                            }
                        </ul>
                </div>
                <div className='rating'>
                    <h1 className='additional-details-heading'>Rating Count</h1>
                    <p>{voteCount }</p>
                    <h1 className='additional-details-heading'>Rating Average</h1>
                    <p>{voteAverage }</p>
                </div>
                <div className='rating'>
                    <h1 className='additional-details-heading'>Budget</h1>
                    <p>{budget }</p>
                    <h1 className='additional-details-heading'>Release Date</h1>
                    <p>{releaseDate }</p>
                </div>
            </div>
            <div className='similar-movies'>
                <h1>More Like This</h1>
                <ul className='similar-movies-list'>
                    {
                        similarMovies.map(each => (
                            <li key={each.id}><Link to={`/movie/${each.id}` }><img src={each.backdropPath} alt={each.title } /></Link></li>
                        ))
                    }
                </ul>
            </div>
        </div>
    }

    const renderMovieContent = () => {
        switch (apiStatus) {
            case apiProgress.inProgress:
                return renderLoader()
            case apiProgress.success:
                return renderMovieDetail()
            case apiProgress.failed:
                return renderFailureView()
            default:
                return null
        }
    }

    return <div className="movie-detail-page">
        <Navbar />
        {renderMovieContent()}
        <Footer />
    </div>

}

export default MoviesDetails