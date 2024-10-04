import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import SidebarComponent from "../component/SidebarComponent";

const MovieDetail = () => {
  const { slug } = useParams();
  const [movies, setMovies] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`https://ophim1.com/phim/${slug}`);
        if (response.data && response.data.movie) {
          setMovies([response.data.movie]);
          if (Array.isArray(response.data.episodes)) {
            setEpisodes(response.data.episodes);
            setSelectedEpisode(response.data.episodes[0]); // Chọn tập đầu tiên
          } else {
            setEpisodes([]);
          }
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetail();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="flex flex-col lg:flex-row justify-center w-11/12 mx-auto ">
        <div className='flex-shrink-0 mt-28'>
          <SidebarComponent />
        </div>
        {/* Phần hiển thị video và thông tin phim */}
        <div className="flex-grow max-w-7xl mx-0 w-10/12 mt-28 pl-4 lg:pl-10">
          {selectedEpisode && (
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start">
                <div className="lg:w-full flex-shrink-0 mb-6 lg:mb-0">
                  {movies.map((movie) => (
                    <div key={movie._id}>
                      <h1 className="text-4xl font-bold mb-4">{movie.name}</h1>
                    </div>
                  ))}
                  <iframe
                    className="rounded-lg shadow-lg w-full h-[300px] md:h-[500px] lg:h-[600px] xl:h-[900px] transition-all duration-200"
                    src={selectedEpisode.server_data[0]?.link_embed}
                    title="Movie Player"
                    frameBorder="0"
                    allowFullScreen
                  />

                  <div className="lg:w-full lg:ml-8 space-y-6 mt-5">
                    {movies.map((movie) => (
                      <div key={movie._id}>
                        <p className="text-gray-300 text-lg leading-relaxed">{movie.content}</p>

                        <div className="space-y-2 mb-4">
                          <p><strong>Thời gian:</strong> {movie.time}</p>
                          <p><strong>Tập hiện tại:</strong> {movie.episode_current}</p>
                          <p><strong>Tổng số tập:</strong> {movie.episode_total}</p>
                          <p><strong>Diễn viên:</strong> {movie.actor.map(actor => actor.name).join(', ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

        
                  <div className="mt-6">
                    <div className="flex flex-wrap space-x-2">
                      {episodes.map((episode, index) => (
                        <button
                          key={index}
                          className={`px-4 py-2 rounded-lg text-center bg-gray-700 hover:bg-red-600 transition duration-200 ${selectedEpisode === episode ? 'bg-red-600' : ''}`}
                          onClick={() => setSelectedEpisode(episode)}
                        >
                          {`Tập ${index + 1}`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetail;
