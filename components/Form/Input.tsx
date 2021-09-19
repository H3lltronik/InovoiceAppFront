import React from 'react'
import { Box } from './Box'

export const Input = () => {
    return (
        <Box>
            <input className={`bg-transparent w-full text-white focus:outline-none h-full px-2`} type="text" />
        </Box>
    )
}
