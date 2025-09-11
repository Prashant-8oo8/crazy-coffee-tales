import React, { useState, useEffect } from 'react';
import { Container, PostCard } from "../components";
import service from '../appwrite/conf';

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts once when component mounts
    service.getPosts([]).then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    }).catch((error) => {
      console.error("Failed to fetch posts:", error);
    });
  }, []); // empty deps = run once

  return (
    <div className='w-full py-8 bg-gray-900 min-h-screen'>
      <Container>
        <div className='flex flex-wrap -mx-2'>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 w-full">No posts found.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
