'use client'
// import MainPage from "@/src/components/page/MainPage"
import dynamic from 'next/dynamic'
import React from 'react'

const MainPage = dynamic(() => import('@/src/components/page/MainPage'), { ssr: false })

const page = () => {
    return (
        <>
            <MainPage />
        </>
    )
}

export default page
