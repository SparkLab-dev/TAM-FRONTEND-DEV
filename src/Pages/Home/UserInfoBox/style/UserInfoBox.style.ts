import styled from "styled-components";

export const Box = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;

    flex-basis: 30%;
    width:277px;
   
`;

export const Content = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;

    flex-direction: column;
`;

export const DetailRow = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 20px;
`;

export const Label = styled.p`

    font-size: 20px;
    font-weight: 700;
`;

export const LabelValue = styled(Label)`

    font-weight: 500;
    font-style: italic;
`;
