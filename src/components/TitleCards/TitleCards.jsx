import  { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);

  const handleWheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODhjMjA5ZmEyYjI5ZjdlZDhiZjU0MmI4MDY1OGFjYiIsIm5iZiI6MTczMDMwNjgzNy4zMjk1NTQzLCJzdWIiOiI2NzIyNjEyNTE4MGIwYTVhYjkwYzI5ZjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bMlN0GDkgHhouMqU6qyewVnr_MRoQDHAl4lzw6QVrh0'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    // Clean up event listener on component unmount
    return () => currentRef.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
         return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title || 'Movie Poster'} />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  );
};

// PropTypes validation
TitleCards.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string
};

export default TitleCards;
