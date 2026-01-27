import React from 'react'
import SellerDetail from './SellerDetail'
import { Container } from '@mui/material'
import StatsCards from './StatsCards'

const SellerMain = () => {
    return (
        <>
            <Container
                maxWidth={false}
                sx={{ maxWidth: "1400px", fontFamily: "Inter" }}
            >
                <SellerDetail/>
                <StatsCards />
            </Container>
        </>
    )
}

export default SellerMain