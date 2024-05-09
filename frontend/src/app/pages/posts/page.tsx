"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

interface Post {
  _id: string;
  title: string; 
  imageUrl: string;
  user: string;
  state: string;
  district: string;
  createdAt: string;
  likes: number;
}

const Component: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get<{ data: Post[] }>(
        "http://localhost:8000/api/v1/posts/getposts"
      );
      if (Array.isArray(response.data.data)) {
        const sortedPosts = response.data.data.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setPosts(sortedPosts);
      } else {
        console.error("Posts data is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      if (likedPosts.includes(postId)) {
        console.log("You have already liked this post.");
        return;
      }

      const response = await axios.post(
        `http://localhost:8000/api/v1/posts/like/${postId}`
      );
      if (response.status === 200) {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? { ...post, likes: post.likes + 1 } : post
        );
        setPosts(updatedPosts);

        setLikedPosts([...likedPosts, postId]);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="bg-white text-black px-4 py-6 md:px-6 lg:py-12">
      <div className="   grid gap-6 md:gap-8">
        <div className=" w-full space-y-2">
          <h2 className="text-lg font-bold">Create a new post</h2>
          <Link href="/pages/posting-post">
              <Button className="bg-black text-white text-sm" variant="outline">
                New Post
              </Button>
          </Link>
        </div>
        <div className=" grid justify-center align-center ">
        {posts.map((post) => (
          <div className="space-y-9" key={post._id}>
            <h2 className="text-lg font-bold">{post.title}</h2> 
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold">{post.user}</h3>
                  <h4 className="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                    {post.state}, {post.district}
                  </h4>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <p className="text-base leading-loose md:text-lg">{post.text}</p>
            {post.imageUrl && (
              <img
                alt="Post image"
                className="aspect-post overflow-hidden rounded-lg object-cover"
                height={300}
                src={post.imageUrl}
                width={500}
              />
            )}
            <div className="flex items-center space-x-2">
              <Button onClick={() => handleLike(post._id)}>Like</Button>
              <span>{post.likes} Likes</span>
            </div>
            <hr className="border-gray-200 dark:border-gray-800" />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Component;
