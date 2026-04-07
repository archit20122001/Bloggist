import React from 'react'
import logoimg from '../assets/Bloggist.png'

function Logo({ className = 'w-24' }) {
    return (
        <div><img src={logoimg} alt="Logo" className={`${className} object-contain`} /></div>
    )
}

export default Logo