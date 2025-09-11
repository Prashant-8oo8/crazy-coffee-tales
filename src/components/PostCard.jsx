import React from 'react';
import appwriteService from "../appwrite/conf";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : "/placeholder.jpg";

  return (
    <Link to={`/post/${$id}`} className="block transition-transform duration-200 hover:scale-[1.02]">
      <div className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 shadow hover:shadow-md hover:shadow-black/30 transition-shadow duration-300">
        {/* Image */}
        <div className="w-full mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-lg w-full h-48 object-cover"
          />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-100 truncate">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
