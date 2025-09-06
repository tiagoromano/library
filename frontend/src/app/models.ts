export interface Genre {
    id?: number;
    name: string;
}

export interface Author {
    id?: number;
    name: string;
    bio?: string;
}

export interface Book {
    id?: number;
    title: string;
    summary?: string;
    authorId: number;
    genreId: number;
    authorName: string;
    genreName: string;
}
