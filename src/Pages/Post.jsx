import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Service from "../Appwrite/configuration";
import { Button, Container } from "../Components";
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
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={Service.getFileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                </div>
                {isAuthor && (
                    <div className="flex justify-end gap-3 mt-4">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-700" className="mr-3 p-2">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-700" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
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