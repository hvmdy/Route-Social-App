import React, { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";

import SuggestedFriends from "../../components/SuggestedFriends/SuggestedFriends";
import { getUsersFeed } from "../../Services/feed.service";
import axios from "axios";
import type { postCardI } from "../../types/postCard.types";
import PostSkeleton from "../../components/PostCard/PostSkeleton";
import toast from "react-hot-toast";
import Postcard from "../../components/PostCard/Postcard";
import CreatePost from "../../components/PostCard/CreatePost";

export default function Newsfeed() {
  const [posts, setPosts] = useState<postCardI[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  async function getAllPosts() {
    try {
      const { data } = await getUsersFeed();
      setPosts(data.data.posts);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message, {
          duration: 4000,
          position: "top-right",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <main className="bg-[#F0F2F5] px-3 py-3.5">
        <title>Home Feed | Route Post</title>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">
              <Sidebar />
            </div>
            <div className="col-span-7">
              <CreatePost getAllPosts={getAllPosts} />
              {isLoading ? (
                <PostSkeleton />
              ) : (
                posts.map((post) => {
                  return (
                    <React.Fragment key={post._id}>
                      <Postcard post={post} getAllPosts={getAllPosts} />
                    </React.Fragment>
                  );
                })
              )}
            </div>
            <div className="col-span-3">
              <SuggestedFriends />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
