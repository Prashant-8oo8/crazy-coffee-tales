import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { Container, PostCard } from '../components';
import { FaCoffee } from 'react-icons/fa'; // optional coffee icon for fun

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts()
      .then((res) => {
        if (res) setPosts(res.documents);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center bg-gray-900 min-h-screen flex items-center justify-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
             <div className="flex justify-center mb-4">
            <FaCoffee className="text-4xl text-yellow-500 animate-bounce" />
          </div>
              <h1 className="text-2xl font-bold text-gray-300 hover:text-gray-500 transition-colors">
                Loading....
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gray-900 min-h-screen text-gray-300">
      <Container>

        {/* About Section */}
        <div className="mb-12 px-4 text-center">
          <div className="flex justify-center mb-4">
            <FaCoffee className="text-4xl text-yellow-500 animate-bounce" />
          </div>

          <h2 className="text-4xl font-extrabold mb-2 text-white">Crazy Coffee Tales</h2>
          <p className="text-md italic text-gray-400 mb-4">
            "Brewed thoughts, one story at a time."
          </p>

          <p className="text-lg leading-relaxed text-gray-400 max-w-3xl mx-auto">
            Welcome to <span className="font-semibold text-white">Crazy Coffee Tales</span> — your daily dose of caffeine-fueled creativity. 
            From tech and productivity to reflections on life and learning, we serve stories with a strong blend of insight and inspiration.
          </p>

         
        </div>

        {/* Posts Section */}
        <div className="flex flex-wrap -mx-2">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition transform hover:scale-105 duration-200">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
