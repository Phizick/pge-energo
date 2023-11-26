export type DataContent = {
    id: string;
    date: string;
    importance: string;
    equipment: string;
    message: string;
    responsible: string;
    avatar: string;
};

export type ContentComponentProps = {
    onSearch: (searchValue: string) => void;
    tableData: DataContent[];
    cardData: DataContent[];
    rowsTable: number;
    rowsCard: number;
    totalRecords: number;
    onChange: (event: { first: number, rows: number }) => void;
    first: number;
};

