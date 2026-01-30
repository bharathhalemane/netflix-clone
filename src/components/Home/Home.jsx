import './Home.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BannerSection } from './StyledHome';
import { TailSpin } from 'react-loader-spinner';
import { IoIosWarning } from "react-icons/io";

const apiProgress = {
    inProgress: "INPROGRESS",
    success: "SUCCESS",
    failed: "FAILED"
}

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [originalMovies, setOriginalMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [trendingMoviesStatus, setTrendingMoviesStatus] = useState(apiProgress.inProgress)
    const [originalMoviesStatus, setOriginalMoviesStatus] = useState(apiProgress.inProgress)
    const [topRatedMoviesStatus, setTopRatedMoviesStatus] = useState(apiProgress.inProgress)

    const formatData = data => ({
        id: data.id,
        backdropPath: data.backdrop_path,
        overview: data.overview,
        posterPath: data.poster_path,
        title: data.title,
    })

    const jwtToken = Cookies.get("jwt_token");
    const option = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    const fetchTrendingMovieData = async () => {
        setTrendingMoviesStatus(apiProgress.inProgress)
        try {
            const trendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies';
            const trendingResponse = await fetch(trendingUrl, option);
            if (trendingResponse.ok) {
                const trendingData = await trendingResponse.json();
                const formattedTrendingData = trendingData.results.map(movie => formatData(movie));
                setTrendingMovies(formattedTrendingData);
                setTrendingMoviesStatus(apiProgress.success)
            } else {
                setTrendingMoviesStatus(apiProgress.failed)
            }
        } catch (err) {
            setTrendingMoviesStatus(apiProgress.failed)
        }
    }

    const fetchOriginalMovieData = async () => {
        setOriginalMoviesStatus(apiProgress.inProgress)
        try {
            const originalsUrl = 'https://apis.ccbp.in/movies-app/originals';
            const originalsResponse = await fetch(originalsUrl, option);
            if (originalsResponse.ok) {
                const originalsData = await originalsResponse.json();
                const formattedOriginalsData = originalsData.results.map(movie => formatData(movie));
                setOriginalMovies(formattedOriginalsData);
                setOriginalMoviesStatus(apiProgress.success)
            } else {
                setOriginalMoviesStatus(apiProgress.failed)
            }
        } catch (err) {
            setOriginalMoviesStatus(apiProgress.failed)
        }
    }

    const fetchTopRatedMovieData = async () => {
        setTopRatedMoviesStatus(apiProgress.inProgress)
        try {
            const topRatedUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies';
            const topRatedResponse = await fetch(topRatedUrl, option);
            if (topRatedResponse.ok) {
                const topRatedData = await topRatedResponse.json();
                const formattedTopRatedData = topRatedData.results.map(movie => formatData(movie));
                setTopRatedMovies(formattedTopRatedData);
                setTopRatedMoviesStatus(apiProgress.success)
            } else {
                setTopRatedMoviesStatus(apiProgress.failed)
            }
        } catch (err) {
            setTopRatedMoviesStatus(apiProgress.failed)
        }
    }

    useEffect(() => {
        const fetchMovies = async () => {
            fetchTrendingMovieData()
            fetchOriginalMovieData()
            fetchTopRatedMovieData()
        }
        fetchMovies();
    }, []);

    const renderBannerLoaderView = () => (
        <div className='load-spinner banner-section-loading'>
            <TailSpin
                height="40"
                width="40"
                color="#e61515"
                ariaLabel="tail-spin-loading"
                visible={true}
            />
        </div>
    )

    const renderBannerFailureView = () => (
        <div className='banner-section-loading failed-container'>
            <IoIosWarning color='#e61515' width={50} />
            <p>Something went wrong. Please try again</p>
            <button onClick={fetchTopRatedMovieData}>Try Again</button>
        </div>
    )

    const bannerSection = () => {
        var settings = {
            dots: true,
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            cssEase: "linear",
            swipeToSlide: true,
            arrows: false
        };
        return (
            <Slider {...settings}>
                {topRatedMovies.map(movie => (
                    <BannerSection key={movie.id} bgImage={movie.backdropPath}>
                        <div>
                            <h1 className="banner-title">{movie.title}</h1>
                            <p className="banner-overview">{movie.overview}</p>
                            <button className="play-button">Play</button>
                        </div>
                    </BannerSection>
                ))}
            </Slider>
        )
    }

    const renderBannerSection = () => {
        switch (topRatedMoviesStatus) {
            case apiProgress.inProgress:
                return renderBannerLoaderView()
            case apiProgress.success:
                return bannerSection()
            case apiProgress.failed:
                return renderBannerFailureView()
            default:
                return null
        }
    }

    const renderFailureView = () => (
        <div className='section-loading failed-container'>
            <IoIosWarning color='#e61515' className="icon" />
            <p>Something went wrong. Please try again</p>
            <button onClick={fetchTopRatedMovieData}>Try Again</button>
        </div>
    )

    const renderLoaderView = () => (
        <div className='load-spinner section-loading'>
            <TailSpin
                height="40"
                width="40"
                color="#e61515"
                ariaLabel="tail-spin-loading"
                visible={true}
            />
        </div>
    )

    const trendingMoviesList = () => {
        var settings = {
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            arrows: true
        };
        return <div className='movies-list'>            
            <Slider {...settings}>
                {
                    trendingMovies.map(movie => (
                        <Link to={`/movie/${movie.id}`}><img src={movie.backdropPath} alt={movie.title} /></Link>
                    ))
                }
            </Slider>
        </div>
    }

    const renderTrendingMoviesList = () => {
        switch (trendingMoviesStatus) {
            case apiProgress.inProgress:   
                return renderLoaderView()
            case apiProgress.success:
                return trendingMoviesList()
            case apiProgress.failed:
                return renderFailureView()
            default: null
        }
    }   

    const originalsMoviesList = () => {
        var settings = {
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            arrows: true
        };
        return <div className='movies-list'>
            <Slider {...settings}>
                {
                    originalMovies.map(movie => (
                        <Link to={`/movie/${movie.id}`}><img src={movie.backdropPath} alt={movie.title} /></Link>
                    ))
                }
            </Slider>
        </div>
    }

    const renderOriginalMoviesList = () => {
        switch (originalMoviesStatus) {
            case apiProgress.inProgress:   
                return renderLoaderView()
            case apiProgress.success:
                return originalsMoviesList()
            case apiProgress.failed:
                return renderFailureView()
            default: null
        }
    }   

    const topRatedMoviesList = () => {
        var settings = {
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            swipeToSlide: true,
            arrows: false
        };
        return <div className='movies-list'>
            <Slider {...settings}>
                {
                    topRatedMovies.map(movie => (
                        <Link to={`/movie/${movie.id}`}><img src={movie.backdropPath} alt={movie.title} /></Link>
                    ))
                }
            </Slider>
        </div>
    }

    const renderTopRatedMoviesList = () => {
        switch (topRatedMoviesStatus) {
            case apiProgress.inProgress:   
                return renderLoaderView()
            case apiProgress.success:
                return topRatedMoviesList()
            case apiProgress.failed:
                return renderFailureView()
            default: null
        }
    }   

    return <div className="home-page">
        <Navbar activeId="home" />
        <div className='banner-section'>
            {renderBannerSection()}
        </div>
        <div className='movies-lists-container'>
            <h1>Trending Now</h1>
            {renderTrendingMoviesList()}
            <h1>Originals</h1> 
            {renderOriginalMoviesList()}
            <h1>Top Rated</h1>
            {renderTopRatedMoviesList()}
        </div>
        <Footer />
    </div>
}

export default Home;