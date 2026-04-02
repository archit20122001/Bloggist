import React from 'react'
import appwriteService from '../Appwrite/configuration'
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full h-full bg-gray-600 hover:bg-gray-800 transition-all duration-400 rounded-xl p-4'>
                <div className='w-full h-48 justify-center mb-4 overflow-hidden rounded-xl'>
                    <img
                        src={appwriteService.getFileView(featuredImage)}
                        alt={title}
                        className='w-full h-full object-cover transition-transform duration-400 ease-in-out hover:scale-105'
                    />
                </div>
                <h2 className='text-xl font-bold text-white'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default Postcard