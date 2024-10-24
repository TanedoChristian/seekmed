import { useSelector } from "react-redux";
import Review from "./Review";

export default function ReviewList({ productId }) {
    const reviews = useSelector((state) => state.user.reviews);

    const productReviews = reviews.filter(
        (reviews) => reviews.product_id == productId
    );

    return (
        <div className="overflow-auto h-[300px]">
            {productReviews.map((review) => (
                <Review review={review} />
            ))}
        </div>
    );
}
