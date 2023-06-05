export interface RatingProps {
    rate: number;
    count: number;
}

export interface ResponseItemProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: RatingProps;
}