import {
  Bookmark,
  ChevronDown,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Share2,
  Trash,
} from "lucide-react";
import type { postCardI, TopComment } from "../../types/postCard.types";
import { Link } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { getPostComments } from "../../Services/comments.service";
import PostComment from "./PostComment";
import axios from "axios";
import toast from "react-hot-toast";
import { AlertDialog, Button, Dropdown, Label } from "@heroui/react";
import { UserContext, type UserContextType } from "../Context/userContext";
import EditPost from "./EditPost";
import { deletePost } from "../../Services/Post.service";

export default function Postcard({
  post,
  getAllPosts,
}: {
  post: postCardI;
  getAllPosts: () => void;
}) {
  const [allComments, setAllComments] = useState<TopComment[] | []>([]);
  const [visibleComments, setVisibleComments] = useState(2);
  const [showEditPost, setShowEditPost] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const { userDetails }: UserContextType = useContext(UserContext);

  async function getComments(postId: string) {
    try {
      const { data } = await getPostComments(postId);
      setAllComments(data.data.comments);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message, {
          duration: 4000,
          position: "top-right",
        });
      }
    }
  }

  useEffect(() => {
    getComments(post._id);
  }, [post.id]);

  function handleMoreComments() {
    setVisibleComments(visibleComments + 2);
  }

  async function deleteMyPost(postId: string) {
    try {
      const { data } = await deletePost(postId);
      toast.success(data.message);
      getAllPosts();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message, {
          duration: 4000,
          position: "top-right",
        });
      }
    }
  }

  return (
    <article className="mx-auto my-3 w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Post creator, timestamp, and privacy */}
      <header className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <img
            className="size-11 shrink-0 rounded-full object-cover ring-2 ring-white"
            src={post.user.photo}
            alt={post.user.name}
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="truncate text-sm font-semibold text-gray-900">
                {post.user.name}
              </span>
              <span className="truncate text-xs text-gray-500">
                {post.user.username}
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
              <span>
                {new Date(post.createdAt).toLocaleString("en-us", {
                  timeStyle: "short",
                  dateStyle: "full",
                })}
              </span>
              <span aria-hidden="true">·</span>
              {/* <PrivacyIcon  size={13} /> */}
              <span>{post.privacy}</span>
            </div>
          </div>
        </div>
        {userDetails?._id === post.user._id ? (
          <>
            <Dropdown>
              <Button aria-label="Menu" variant="ghost">
                <MoreHorizontal size={21} />
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  onAction={(key) => console.log(`Selected: ${key}`)}
                >
                  <Dropdown.Item id="save-post" textValue="Save post">
                    <Bookmark size={16} />
                    <Label>Save post</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => setShowEditPost(true)}
                    id="edit-post"
                    textValue="Edit post"
                  >
                    <Pencil size={16} />
                    <Label>Edit post</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="delete-post"
                    textValue="Delete post"
                    variant="danger"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash size={16} className="text-danger" />
                    <Label>Delete post</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </>
        ) : (
          <>
            <Dropdown>
              <Button aria-label="Menu" variant="ghost">
                <MoreHorizontal size={21} />
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  onAction={(key) => console.log(`Selected: ${key}`)}
                >
                  <Dropdown.Item id="save-post" textValue="Save post">
                    <Bookmark size={16} />
                    <Label>Save post</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </>
        )}
      </header>
      <AlertDialog isOpen={showDeleteDialog}>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>Delete this post?</AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This post will be permanently removed from your profile and
                  feed.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button
                  onClick={() => setShowDeleteDialog(false)}
                  slot="close"
                  variant="tertiary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => deleteMyPost(post._id)}
                  slot="close"
                  variant="danger"
                >
                  Delete Post
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
      {showEditPost ? (
        <EditPost
          postId={post._id}
          setShowEditPost={setShowEditPost}
          getAllPosts={getAllPosts}
        />
      ) : (
        <>
          {/* Post body */}
          <div className="px-4 pb-3 pt-3 text-sm leading-6 text-gray-800 sm:px-5">
            <p>{post.body}</p>
          </div>

          {/* Post image */}

          {post.image && (
            <>
              <img
                className="block max-h-[520px] w-full bg-gray-100 object-cover"
                src={post.image}
                alt={post.body}
              />
            </>
          )}
        </>
      )}

      {/* Reaction and comment counts */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-gray-500 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="flex size-[18px] items-center justify-center rounded-full bg-rose-500 text-white">
            <Heart aria-hidden="true" fill="currentColor" size={11} />
          </span>
          <span>{post.likesCount} likes</span>
        </div>
        <div className="flex gap-3 items-center">
          <span>{post.commentsCount} comments</span>
          <span>{post.sharesCount} shares</span>
          <Link
            to={`/postDetails/${post._id}`}
            className="text-blue-600 font-bold hover:bg-blue-50 p-1 rounded-md"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Like, comment, and share actions */}
      <div className="mx-4 flex items-center border-y border-gray-200 sm:mx-5">
        <button
          className={`flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-medium transition hover:bg-gray-50  text-gray-600`}
          type="button"
        >
          <Heart fill={"currentColor"} size={18} />
          Like
        </button>
        <button
          className="flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          onClick={() => document.getElementById("post-comment")?.focus()}
          type="button"
        >
          <MessageCircle size={18} />
          Comment
        </button>
        <button
          className="flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          type="button"
        >
          <Share2 size={18} />
          Share
        </button>
      </div>

      {/* Comments, with the first comment shown by default */}
      <section aria-label="Comments" className="px-4 pb-4 pt-3 sm:px-5">
        <button
          className="mb-3 flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
          type="button"
          onClick={handleMoreComments}
        >
          Show more comments
          <ChevronDown className={`transition-transform"}`} size={16} />
        </button>

        {/*  mapping */}
        {allComments.length > 0 ? (
          allComments.slice(0, visibleComments).map((comment) => {
            return (
              <React.Fragment key={comment._id}>
                <div className="space-y-3 my-3">
                  <div className="flex items-start gap-2.5">
                    <img
                      alt={comment.commentCreator.name}
                      className="mt-0.5 size-8 shrink-0 rounded-full object-cover"
                      src={comment.commentCreator.photo}
                    />
                    <div className="min-w-0 rounded-2xl bg-gray-100 px-3 py-2 flex justify-between w-full items-center">
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-1.5">
                          <span className="text-xs font-semibold text-gray-900">
                            {comment.commentCreator.name}
                          </span>
                          <span className="text-[11px] text-gray-500">
                            {comment.commentCreator.username}
                          </span>
                        </div>
                        <p className="mt-0.5 break-words text-sm leading-5 text-gray-800">
                          {comment.content}
                        </p>
                        {comment.image && (
                          <>
                            <img
                              src={comment.image}
                              className="w-20 h-20"
                              alt=""
                            />
                          </>
                        )}
                        <span className="mt-1 block text-[11px] text-gray-500">
                          {new Date(comment.createdAt).toLocaleString("en-us", {
                            timeStyle: "short",
                            dateStyle: "full",
                          })}
                        </span>
                      </div>
                      <div>
                        {userDetails?.id === comment.commentCreator._id ? (
                          <>
                            <Dropdown>
                              <Button aria-label="Menu" variant="ghost">
                                <MoreHorizontal size={21} />
                              </Button>
                              <Dropdown.Popover>
                                <Dropdown.Menu
                                  onAction={(key) =>
                                    console.log(`Selected: ${key}`)
                                  }
                                >
                                  <Dropdown.Item
                                    id="edit-comment"
                                    textValue="Edit comment"
                                  >
                                    <Pencil size={16} />
                                    <Label>Edit comment</Label>
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    id="delete-comment"
                                    textValue="Delete comment"
                                    variant="danger"
                                  >
                                    <Trash size={16} className="text-danger" />
                                    <Label>Delete comment</Label>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown.Popover>
                            </Dropdown>
                          </>
                        ) : (
                          <>
                            <Dropdown>
                              <Button aria-label="Menu" variant="ghost">
                                <MoreHorizontal size={21} />
                              </Button>
                              <Dropdown.Popover>
                                <Dropdown.Menu
                                  onAction={(key) =>
                                    console.log(`Selected: ${key}`)
                                  }
                                >
                                  <Dropdown.Item
                                    id="delete-comment"
                                    textValue="Delete comment"
                                    variant="danger"
                                  >
                                    <Trash size={16} className="text-danger" />
                                    <Label>Delete comment</Label>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown.Popover>
                            </Dropdown>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <>
            {post.topComment && (
              <>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <img
                      alt={post.topComment.commentCreator.name}
                      className="mt-0.5 size-8 shrink-0 rounded-full object-cover"
                      src={post.topComment.commentCreator.photo}
                    />
                    <div className="min-w-0 rounded-2xl bg-gray-100 px-3 py-2 flex justify-between w-full items-center">
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-1.5">
                          <span className="text-xs font-semibold text-gray-900">
                            {post.topComment.commentCreator.name}
                          </span>
                          <span className="text-[11px] text-gray-500">
                            {post.topComment.commentCreator.username}
                          </span>
                        </div>
                        <p className="mt-0.5 break-words text-sm leading-5 text-gray-800">
                          {post.topComment.content}
                        </p>
                        {post.topComment.image && (
                          <>
                            <img
                              src={post.topComment.image}
                              className="w-20 h-20"
                              alt=""
                            />
                          </>
                        )}
                        <span className="mt-1 block text-[11px] text-gray-500">
                          {new Date(post.topComment.createdAt).toLocaleString(
                            "en-us",
                            {
                              timeStyle: "short",
                              dateStyle: "full",
                            },
                          )}
                        </span>
                      </div>
                      <div>
                        {userDetails?.id ===
                        post.topComment.commentCreator._id ? (
                          <>
                            <Dropdown>
                              <Button aria-label="Menu" variant="ghost">
                                <MoreHorizontal size={21} />
                              </Button>
                              <Dropdown.Popover>
                                <Dropdown.Menu
                                  onAction={(key) =>
                                    console.log(`Selected: ${key}`)
                                  }
                                >
                                  <Dropdown.Item
                                    id="edit-comment"
                                    textValue="Edit comment"
                                  >
                                    <Pencil size={16} />
                                    <Label>Edit comment</Label>
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    id="delete-comment"
                                    textValue="Delete comment"
                                    variant="danger"
                                  >
                                    <Trash size={16} className="text-danger" />
                                    <Label>Delete comment</Label>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown.Popover>
                            </Dropdown>
                          </>
                        ) : (
                          <>
                            <Dropdown>
                              <Button aria-label="Menu" variant="ghost">
                                <MoreHorizontal size={21} />
                              </Button>
                              <Dropdown.Popover>
                                <Dropdown.Menu
                                  onAction={(key) =>
                                    console.log(`Selected: ${key}`)
                                  }
                                >
                                  <Dropdown.Item
                                    id="delete-comment"
                                    textValue="Delete comment"
                                    variant="danger"
                                  >
                                    <Trash size={16} className="text-danger" />
                                    <Label>Delete comment</Label>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown.Popover>
                            </Dropdown>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Add a comment */}

        <PostComment postId={post._id} getComments={getComments} />
      </section>
    </article>
  );
}
