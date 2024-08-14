'use client';
import Header from "../../../components/header/Header";
import VerticalLinearStepper from "./Reservation";

import reserv from '../../../assets/images/pexels-thu-trang-1190570-2265084.jpg';
import styled from "@emotion/styled";


const Container = styled.div`
    position: relative;
    min-height: 100vh;
    padding: 20px;
    overflow: hidden;

    &::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${reserv.src});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        z-index: -1; // İçeriğin arkasında kalmasını sağlar
    }
`;

const Reservation = () => {
    return (
        <Container>
            <Header />
            <VerticalLinearStepper />
        </Container>
    );
}

export default Reservation;
