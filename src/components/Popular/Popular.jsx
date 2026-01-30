import './Popular.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link } from "react-router-dom"
import { TailSpin } from 'react-loader-spinner'

const apiProgress = {
    inProgress: "INPROGRESS",
    success: "SUCCESS",
    failed : "FAILED"
}

const Popular = () => {
    const [popularMovies, setPopularMovies] = useState([])
    const [apiStatus, setApiStatus] = useState(apiProgress.inProgress)

    const formatData = data => ({
        id: data.id,
        backdropPath: data.backdrop_path,
        overview: data.overview,
        posterPath: data.poster_path,
        title: data.title,
    })

    const getPopularMoviesData = async () => {
        setApiStatus(apiProgress.inProgress)

        try {
            const jwtToken = Cookies.get("jwt_token")
            const url = "https://apis.ccbp.in/movies-app/popular-movies"
            const option = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }

            const response = await fetch(url, option)
            const data = await response.json()

            if (response.ok) {
                const formattedData = data.results.map(formatData)
                setPopularMovies(formattedData)
                setApiStatus(apiProgress.success)
            } else {
                setApiStatus(apiProgress.failed)
            }
        } catch (error) {
            setApiStatus(apiProgress.failed)
        }
    }

    useEffect(() => {        
        getPopularMoviesData()
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
            <button onClick={getPopularMoviesData}>Try Again</button>
        </div>
    )

    const renderSuccessView = () => (
        <div className="popular-movies-list">
            {
                popularMovies.map(movie => (
                    <Link key={ movie.id} to={`/movie/${movie.id}`} ><img src={movie.backdropPath} alt={ movie.title} /></Link>
                ))
            }
        </div>
    )

    const renderContent = () => {
        switch(apiStatus){
            case apiProgress.inProgress:
                return renderLoader()
            case apiProgress.success:
                return renderSuccessView()
            case apiProgress.failed:
                return renderFailureView()
            default: 
                return null
        }
    }


    return <div className='popular-page'>
        <Navbar activeId="popular" />
        {renderContent()}
        <Footer />
    </div>
}

export default Popular