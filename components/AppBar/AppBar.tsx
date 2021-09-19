/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

const AppBar = () => {
    return (
        <aside className="relative lg:fixed
        lg:w-28 h-20 lg:h-screen z-20
        lg:rounded-r-3xl dark:bg-blue-darker">
            <div className="flex flex-row lg:flex-col h-full">
                <button className="relative bg-purple-dark
                w-20 h-full lg:w-full lg:h-28
                lg:rounded-r-3xl overflow-hidden">
                    <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <img className="w-10 h-9" src="/logo.svg" alt="App icon"/>
                    </div>

                    <div className="absolute top-1/2 w-full h-28 bg-purple-light rounded-l-3xl z-0"></div>
                </button>

                <div className="flex-grow"></div>
                
                <section className="flex flex-row lg:flex-col lg:w-full">
                    <button className="flex h-full lg:h-28 h:lg-auto lg:w-full px-10 lg:px-0">
                        <div className="inline-block m-auto">
                            <img className="w-5 h-5" src="/icon-sun.svg" alt="Sun icon"/>
                        </div>
                    </button>

                    <button className="relative w-28 h-full lg:h-28 lg:w-full 
                    border-l-2 lg:border-l-0 lg:border-t-2 border-gray-100 border-opacity-10
                    ">
                        <div className="absolute transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            <img className="w-10 h-10 rounded-full" src="/image-avatar.jpg" alt="Avatar"/>
                        </div>
                    </button>
                </section>
            </div>
        </aside>
    )
}

export default AppBar
