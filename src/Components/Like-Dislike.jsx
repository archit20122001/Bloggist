import React, { useState, useEffect } from 'react';
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import appwriteService from '../Appwrite/configuration';

function Like({ slug, currentUserId }) {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [likesArray, setLikesArray] = useState([]);

    const [dislike, setDislike] = useState(false);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [dislikesArray, setDislikesArray] = useState([]);

    useEffect(() => {
        if (slug && currentUserId) {
            console.log(`Fetching likes for post: ${slug}`)
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    const currentLikes = post.likes || [];
                    const currentDislikes = post.dislikes || [];
                    console.log("Appwrite returned these likes:", currentLikes);

                    setLikesArray(currentLikes);
                    setLikeCount(currentLikes.length);
                    setLike(currentLikes.includes(currentUserId));

                    setDislikesArray(currentDislikes);
                    setDislikeCount(currentDislikes.length);
                    setDislike(currentDislikes.includes(currentUserId));
                }
                else {
                    console.log("Waiting for slug and currentUserId...")
                }
            });
        }
    }, [slug, currentUserId]);

    const handleLikeClick = async () => {
        let updatedLikes = [...likesArray];
        let updatedDislikes = [...dislikesArray];

        if (like) {
            updatedLikes = updatedLikes.filter(id => id !== currentUserId);
            setLike(false);
            setLikeCount(likeCount - 1);
        } else {
            updatedLikes.push(currentUserId);
            setLike(true);
            setLikeCount(likeCount + 1);

            if (dislike) {
                updatedDislikes = updatedDislikes.filter(id => id !== currentUserId);
                setDislike(false);
                setDislikeCount(dislikeCount - 1);
            }
        }

        setLikesArray(updatedLikes);
        setDislikesArray(updatedDislikes);

        await appwriteService.updatePostReactions(slug, updatedLikes, updatedDislikes);
    };

    const handleDislikeClick = async () => {
        let updatedLikes = [...likesArray];
        let updatedDislikes = [...dislikesArray];

        if (dislike) {
            updatedDislikes = updatedDislikes.filter(id => id !== currentUserId);
            setDislike(false);
            setDislikeCount(dislikeCount - 1);
        } else {
            updatedDislikes.push(currentUserId);
            setDislike(true);
            setDislikeCount(dislikeCount + 1);

            if (like) {
                updatedLikes = updatedLikes.filter(id => id !== currentUserId);
                setLike(false);
                setLikeCount(likeCount - 1);
            }
        }

        setLikesArray(updatedLikes);
        setDislikesArray(updatedDislikes);

        await appwriteService.updatePostReactions(slug, updatedLikes, updatedDislikes);
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
                {like ? (
                    <BiSolidLike
                        className="text-blue-600 cursor-pointer text-2xl hover:text-blue-800 transition-colors"
                        onClick={handleLikeClick}
                    />
                ) : (
                    <BiLike
                        className="cursor-pointer text-2xl text-gray-700 hover:text-blue-600 transition-colors"
                        onClick={handleLikeClick}
                    />
                )}
                <span className="text-lg font-medium text-gray-800">
                    {likeCount}
                </span>
            </div>

            <div className="h-6 w-px bg-gray-800"></div>

            <div className="flex items-center gap-1">
                {dislike ? (
                    <BiSolidDislike
                        className="text-red-600 cursor-pointer text-2xl hover:text-red-800 transition-colors mt-1"
                        onClick={handleDislikeClick}
                    />
                ) : (
                    <BiDislike
                        className="cursor-pointer text-2xl text-gray-700 hover:text-red-600 transition-colors mt-1"
                        onClick={handleDislikeClick}
                    />
                )}
                <span className="text-lg font-medium text-gray-800">
                    {dislikeCount}
                </span>
            </div>
        </div>
    );
}

export default Like;