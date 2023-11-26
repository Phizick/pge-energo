export interface Data {
    id: string;
    date: string;
    importance: string;
    equipment: string;
    message: string;
    responsible: string;
    avatar: string;
}

export interface RenderComponentProps {
    data: Data[];
}

export interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}