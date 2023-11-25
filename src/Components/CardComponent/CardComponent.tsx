import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { Checkbox } from 'primereact/checkbox';

import { Card } from 'primereact/card';
import {tableArr} from "../../App";
import {NEUTRAL_DARKSNOW, NEUTRAL_LIGHT, NEUTRAL_SNOWWHITE} from "../../Constants/Colors/Colors";
import {useRead} from "../Hooks/useRead/useRead";
import {useActive} from "../Hooks/useActive/useActive";


const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const CardContainer = styled.div<{ isRead: boolean }>`
  .p-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    margin: 10px;
    transition: transform .3s ease-out;
    background-color: ${(props) => props.isRead ? NEUTRAL_LIGHT : NEUTRAL_DARKSNOW};
  }

  .p-card:hover {
    cursor: pointer;
    box-shadow: 0 64px 64px -48px rgba(31, 47, 70, 0.3);
    transform: scale(1.1);
  }
`;


export const CardComponent = () => {
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [activeElementId, setActiveElementId] = useActive();
    const [read, setAsRead] = useRead();


    // useEffect(() => {
    //     function handleKeyDown(e: KeyboardEvent) {
    //
    //         if (e.code === "Space" && activeCardId) {
    //             setRead(prev => ({ ...prev, [activeCardId]: true }));
    //             e.preventDefault();
    //         }
    //     }
    //
    //     window.addEventListener('keydown', handleKeyDown);
    //
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, [activeCardId]);

    const handleCheckboxChange = (e: { checked?: boolean }, id: string) => {
        setChecked(prev => ({ ...prev, [id]: !!e.checked }));
    };

    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // const handleCardClick = (id: string) => {
    //     setActiveCardId(id);
    //     setRead(prev => ({...prev, [id]: true}));
    // }
    //
    //
    // const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    //     if ((e.key === ' ' || e.key === 'Spacebar') && activeCardId) {
    //         setRead(prev => ({...prev, [activeCardId]: true}));
    //         e.preventDefault();
    //         setActiveCardId(null);
    //     }
    // }

    const handleCardClick = (id: string) => {
        setAsRead(id);
    }


    return (
        <CardsContainer>
            {tableArr.map((item, idx) => (
                <CardContainer
                    onClick={() => handleCardClick(item.id)}
                    isRead={read[item.id]}
                    onMouseEnter={() => setActiveElementId(item.id)}
                    onMouseLeave={() => setActiveElementId(null)}
                    tabIndex={0}
                >
                <Card
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '250px', margin: 10 }}>
                    <ContentContainer>
                        <div style={{ flexGrow: 1 }}>
                            <h5>{item.date}</h5>
                            <p>Message: {item.message}</p>
                            <div>
                                Importance:
                                <label htmlFor={item.id} onClick={handleCheckboxClick}>
                                    <Checkbox
                                        inputId={item.id}
                                        onChange={(e) => handleCheckboxChange(e, item.id)}
                                        checked={checked[item.id] || false}
                                    />
                                    {item.importance}
                                </label>
                            </div>
                            <p>Equipment: {item.equipment}</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            {item.avatar && <img src={item.avatar} alt="Avatar" style={{ borderRadius: '50%', width: '48px', height: '48px' }} />}
                            <p>{item.responsible}</p>
                        </div>
                    </ContentContainer>
                </Card>
                </CardContainer>
            ))}
        </CardsContainer>
    )
}
