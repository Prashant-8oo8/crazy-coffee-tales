import React, { useEffect, useState } from 'react';
import service from '../appwrite/conf';
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents);
      }
    }).catch((err) => {
      console.error("Error fetching posts:", err);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center bg-gray-900 min-h-screen flex items-center justify-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-gray-300 hover:text-gray-500 transition-colors">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 bg-gray-900 min-h-screen">
      <Container>
        <div className="flex flex-wrap -mx-2">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
