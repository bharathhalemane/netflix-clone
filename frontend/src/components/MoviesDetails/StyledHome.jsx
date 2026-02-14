import styled from 'styled-components';

export const BannerSection = styled.div`
    height: 50vh;    
    width: 100vw;
    box-sizing: border-box;
    background-size: cover;
    background-position: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    color: white;
    padding: 0 12vw;   
    margin: 0;
    padding-top: 150px;    
    background-blend-mode: multiply;
    background-image: linear-gradient(#00000099 80%, #000000), url(${props => props.$bgImage});

    .banner-title{
        font-size: 3rem;
        margin-bottom: 10px;
    }
    .banner-overview{
        font-size: 1rem;
        width: 50%;
        margin-bottom: 20px;
    }
    .play-button{
        background-color: #ffffff;
        border: none;
        color: black;
        padding: 10px 20px;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 5px;
        width: fit-content;
    }
`