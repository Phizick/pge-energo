import { useState } from "react";

export const useRead = (initialState: Record<string, boolean> = {}): [Record<string, boolean>, (id: string) => void] => {
    const [read, setRead] = useState<Record<string, boolean>>(initialState);

    const setAsRead = (id: string) => {
        setRead(prev => ({
            ...prev,
            [id]: true
        }));
    }

    return [read, setAsRead];
}