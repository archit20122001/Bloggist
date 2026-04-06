import React from 'react'
import appwriteService from '../Appwrite/configuration'
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full h-full rounded-xl p-4 shadow-xl shadow-black/30 bg-[#5d6a7f] bg-linear-to-b from-[#b6c7e4] via-[#939eb1] via-49% to-[#5d6a7f] hover:bg-[#313A5E] hover:bg-linear-to-t hover:from-[#313A5E] hover:via-[#5468B9] hover:to-[#738FFE] transition-all duration-500 hover:scale-105'>
                <div className='w-full h-48 justify-center mb-4 overflow-hidden rounded-xl'>
                    <img
                        src={appwriteService.getFileView(featuredImage)}
                        alt={title}
                        className='w-full h-full object-cover transition-transform duration-400 ease-in-out'
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