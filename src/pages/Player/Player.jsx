import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODhjMjA5ZmEyYjI5ZjdlZDhiZjU0MmI4MDY1OGFjYiIsIm5iZiI6MTczMDMwNjgzNy4zMjk1NTQzLCJzdWIiOiI2NzIyNjEyNTE4MGIwYTVhYjkwYzI5ZjIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bMlN0GDkgHhouMqU6qyewVnr_MRoQDHAl4lzw6QVrh0",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[1]))
      .catch((err) => console.error(err));
  }, [id]); // Add `id` to the dependency array

  return (
    <div className="player">
     <img src={back_arrow} alt="Back" onClick={() => navigate('/')} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="Trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p> {/* Optional chaining */}
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
