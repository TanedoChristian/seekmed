import Review from "./Review";

export default function ReviewList() {
    return (
        <div className="overflow-auto h-[300px]">
            <Review />
            <Review />
        </div>
    );
}
