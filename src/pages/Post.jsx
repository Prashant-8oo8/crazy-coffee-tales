import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function ConfirmModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 id="confirm-dialog" className="text-lg text-black font-semibold mb-4">
          {message}
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            autoFocus
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }
    setLoading(true);
    service
      .getPost(slug)
      .then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  const deletePost = useCallback(async () => {
    setConfirmOpen(false);
    setDeleting(true);
    try {
      const status = await service.deletePost(post.$id);
      if (status) {
        if (post?.featuredImage) {
          await service.deleteFile(post.featuredImage);
        }
        navigate("/");
      } else {
        alert("Failed to delete post. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setDeleting(false);
    }
  }, [post, navigate]);

  if (loading) {
    return (
      <div className="py-8 text-center">
        <Container>
          <p className="text-lg font-medium text-gray-600 animate-pulse">
            Loading post...
          </p>
        </Container>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-8 text-center">
        <Container>
          <p className="text-lg font-medium text-red-500 mb-4">Post not found.</p>
          <Link
            to="/"
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            Go back home
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onConfirm={deletePost}
        onCancel={() => setConfirmOpen(false)}
        message="Are you sure you want to delete this post?"
      />

      <div className="py-8">
        <Container>
          <div className="w-full flex justify-center mb-6 relative border rounded-xl p-2 bg-white shadow-lg">
            {post.featuredImage ? (
              <img
                src={service.getFilePreview(post.featuredImage)}
                alt={post.title || "Post image"}
                className="rounded-xl max-h-96 object-contain transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="rounded-xl bg-gray-200 w-full h-48 flex items-center justify-center text-gray-500 text-lg italic select-none">
                No featured image
              </div>
            )}

            {isAuthor && (
              <div className="absolute right-6 top-6 flex space-x-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500"
                    aria-label="Edit post"
                    className="transition hover:scale-105 focus:scale-105"
                    disabled={deleting}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  onClick={() => setConfirmOpen(true)}
                  aria-label="Delete post"
                  disabled={deleting}
                  className={`transition hover:scale-105 focus:scale-105 ${
                    deleting ? "opacity-50 cursor-not-allowed" : ""
                  }`} 
                >
                  {deleting ? "Deleting..." : "Delete"}
                  
                </Button>
              </div>
            )}
          </div>

          <div className="w-full mb-6">
            <h1 className="text-3xl font-extrabold text-white">{post.title}</h1>
          </div>

          <div className="browser-css text-white leading-relaxed text-base">
            {parse(post.content)}
          </div>
        </Container>
      </div>
    </>
  );
}
