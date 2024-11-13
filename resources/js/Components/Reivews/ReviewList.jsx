import { useSelector, useDispatch } from "react-redux";
import Review from "./Review";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ReviewList({ productId, user }) {
    const reviews = useSelector((state) => state.user.reviews);
    const dispatch = useDispatch(); // Assuming you're using Redux for state management

    // Filter reviews for the specific product
    const productReviews = reviews.filter(
        (review) => review.product_id === productId
    );

    // State to manage local reviews
    const [localReviews, setLocalReviews] = useState(productReviews);

    // Update local reviews when global reviews change
    useEffect(() => {
        setLocalReviews(productReviews);
    }, [reviews, productId]);

    const handleDelete = (id) => {
        // Call your delete API and then update local state
        axios
            .delete(`/api/reviews/${id}`)
            .then(() => {
                // Remove the review from local state
                setLocalReviews(
                    localReviews.filter((review) => review.id !== id)
                );
                Swal.fire({
                    title: "Deleted!",
                    text: `Successfully deleted`,
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false,
                });
            })
            .catch((error) => {
                console.error("Error deleting review:", error);
                Swal.fire({
                    title: "Error!",
                    text: `Failed to delete review`,
                    icon: "error",
                });
            });
    };

    return (
        <div className="overflow-auto h-[300px]">
            {localReviews.map((review) => (
                <Review
                    key={review.id}
                    review={review}
                    user={user}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
