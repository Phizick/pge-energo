import React, { useState } from 'react';
import styled from "styled-components";
import { Checkbox } from 'primereact/checkbox';
import { Card } from 'primereact/card';
import {useRead} from "../Hooks/useRead/useRead";
import {useActive} from "../Hooks/useActive/useActive";
import {TEXT_STYLES} from "../../Constants/Typography/Typography";


interface Data {
    id: string;
    date: string;
    importance: string;
    equipment: string;
    message: string;
    responsible: string;
    avatar: string;
}

interface CardComponentProps {
    data: Data[];
}


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
    width: 380px;
    margin: 10px;
    transition: transform .3s ease-out;
    background-color: ${(props) => props.isRead ? "var(--blue-50)" : "var(--blue-100)"};    
    height: 180px;
  }

  .p-card:hover {
    cursor: pointer;
    box-shadow: 0 100px 75px -48px rgba(31, 47, 70, 0.3);
    transform: scale(1.1);
  }  
`;

const CardContent = styled.div`
    flex-grow: 1;
    padding: 0;
`;

const TextContent = styled.p`
    margin: 0;
    padding-right: 10px;    
    overflow: hidden;
    text-overflow: ellipsis;
    ${Object.entries(TEXT_STYLES.TEXT_NORMAL).map(([key, value]) => `${key}: ${value};`).join('\n')}  
`;

const LabelContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    ${Object.entries(TEXT_STYLES.TEXT_NORMAL).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

const Label = styled.label`
    display: flex;
    gap: 15px;
`;


const CardComponent: React.FC<CardComponentProps> = ({ data }) => {
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [read, setAsRead] = useRead();
    const [activeElementId, setActiveElementId] = useActive(setAsRead);

    const handleCheckboxChange = (e: { checked?: boolean }, id: string) => {
        setChecked(prev => ({ ...prev, [id]: !!e.checked }));
    };

    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleCardClick = (id: string) => {
        setAsRead(id);
        setActiveElementId(null);
    };


    return (
        <CardsContainer>
            {data.map((item: any, idx: any) => (
                <CardContainer
                    key={item.id}
                    onClick={() => handleCardClick(item.id)}
                    isRead={read[item.id]}
                    onMouseEnter={() => setActiveElementId(item.id)}
                    onMouseLeave={() => setActiveElementId(null)}
                    tabIndex={0}
                >
                <Card>
                    <ContentContainer>
                        <CardContent>
                            <TextContent><b>Дата:</b> {item.date}</TextContent>
                            <LabelContainer>
                                <b>Важность:</b>
                                <Label htmlFor={item.id} onClick={handleCheckboxClick}>
                                    <Checkbox
                                        inputId={item.id}
                                        onChange={(e) => handleCheckboxChange(e, item.id)}
                                        checked={checked[item.id] || false}
                                    />
                                    {item.importance}
                                </Label>
                            </LabelContainer>
                            <TextContent><b>Оборудование:</b> {item.equipment}</TextContent>
                            <TextContent><b>Сообщение:</b> {item.message}</TextContent>
                        </CardContent>
                        <div style={{ textAlign: 'center' }}>
                            {item.avatar && <img src={item.avatar} alt="Avatar" style={{ borderRadius: '50%', width: '48px', height: '48px' }} />}
                            {/*использовался компонент Avatar из библиотеки, но он отрабатывает неккоректно, и не рендерит аватарки. хотя по коду должен обрабатывать нормально:*/}
                            {/*    var imageProps = utils.mergeProps({*/}
                            {/*    src: props.image,*/}
                            {/*    onError: onImageError*/}
                            {/*}, ptm('image'));*/}
                            {/*{item.avatar &&<Avatar className="mr-2" size="xlarge" shape="circle" image={item.avatar} imageAlt="avatarImage"/>}*/}
                            <p>{item.responsible}</p>
                        </div>
                    </ContentContainer>
                </Card>
                </CardContainer>
            ))}
        </CardsContainer>
    )
}

export default CardComponent
