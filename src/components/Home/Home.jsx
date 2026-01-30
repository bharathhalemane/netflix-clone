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

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [originalMovies, setOriginalMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const formatData = data => ({
        id: data.id,
        backdropPath: data.backdrop_path,
        overview: data.overview,
        posterPath: data.poster_path,
        title: data.title,
    })

    useEffect(() => {
        const jwtToken = Cookies.get("jwt_token");
        const fetchMovies = async () => {
            const trendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies';
            const option = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
            const trendingResponse = await fetch(trendingUrl, option);            
            const trendingData = await trendingResponse.json();
            const formattedTrendingData = trendingData.results.map(movie => formatData(movie));
            setTrendingMovies(formattedTrendingData);

            const originalsUrl = 'https://apis.ccbp.in/movies-app/originals';
            const originalsResponse = await fetch(originalsUrl, option);            
            const originalsData = await originalsResponse.json();
            const formattedOriginalsData = originalsData.results.map(movie => formatData(movie));
            setOriginalMovies(formattedOriginalsData);

            const topRatedUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies';
            const topRatedResponse = await fetch(topRatedUrl, option);
            const topRatedData = await topRatedResponse.json();
            const formattedTopRatedData = topRatedData.results.map(movie => formatData(movie));
            setTopRatedMovies(formattedTopRatedData);

        }
        fetchMovies();
    }, []);

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
            <h1>Trending Now</h1>
            <Slider {...settings}>
                {
                    trendingMovies.map(movie => (
                        <Link to={`/movie/${movie.id}`}><img src={movie.backdropPath} alt={ movie.title} /></Link>
                    ))
                }
            </Slider>
        </div>
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
            <h1>Originals</h1>
            <Slider {...settings}>
                {
                    originalMovies.map(movie => (
                        <Link to={`/movie/${movie.id}`}><img src={movie.backdropPath} alt={ movie.title} /></Link>
                    ))
                }
            </Slider>
        </div>
    }

    const topRatedData = () => {
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
            <h1>Top Rated</h1>
            <Slider {...settings}>
                {
                    topRatedMovies.map(movie => (
                        <Link to={`/movie/${movie.id}`}><img src={movie.backdropPath} alt={ movie.title} /></Link>
                    ))
                }
            </Slider>
        </div>
    }

    return <div className="home-page">
        <Navbar activeId="home" />
        <div className='banner-section'>
            {bannerSection()}
        </div>
        <div className='movies-lists-container'>
            {trendingMoviesList()}
            {originalsMoviesList()}
            {topRatedData()}
        </div>
        <Footer/>
    </div>
}

export default Home;