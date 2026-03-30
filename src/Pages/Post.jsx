import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../Appwrite/configuration";
import { Button, Container, Like_Dislike } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import EditPost from "./EditPost";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            Service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        Service.deletePost(post.$id).then((status) => {
            if (status) {
                Service.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative rounded-xl">
                    <img
                        src={Service.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>
                <div className=' flex flex-row justify-between mb-2'>
                    <div className="flex w-32 gap-3 rounded-md p-2 bg-gray-300">
                        <Like_Dislike slug={post.$id} currentUserId={userData?.$id}/>
                    </div>
                    {isAuthor && (
                        <div>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-700" className="mr-3 p-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-700" onClick={deletePost} className="p-2">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}