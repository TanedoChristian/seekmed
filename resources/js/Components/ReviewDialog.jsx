import { Dialog, DialogContent, DialogTrigger } from "@/shadcdn/ui/dialog";
import { Input } from "@/shadcdn/ui/input";
import { Rating } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function ReviewDialog({ order }) {
    const [feedback, setFeedback] = useState({
        Feedback: "",
        Rating: 0,
        order_id: order.order_id,
    });

    const handleRating = (newValue) => {
        setFeedback((prev) => ({ ...prev, Rating: newValue }));
    };

    const handleChange = (e) => {
        setFeedback((prev) => ({ ...prev, Feedback: e.target.value }));
    };

    const handleFeedback = () => {
        axios.post(`api/reviews`, feedback).then(({ data }) => {
            Swal.fire({
                title: "Thank you for submitting your review!",
                icon: "success",
                showCloseButton: true,
                timer: 1000,
            });
            setIsOpen(false);
        });
    };

    const [open, setIsOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="px-10 py-2 bg-main rounded-sm text-white">
                    Add Review
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[30vw] h-[70vh] outline-none">
                <div className="p-10">
                    <div className="flex justify-between">
                        <h1 className=" font-bold text-2xl">
                            Add Review #{order.order_id}
                        </h1>
                    </div>
                    <div className="mt-10">
                        <div className=" rounded-xl p-3">
                            <h1 className="font-semibold text-lg">Rate</h1>
                            <Rating
                                className="mt-3"
                                size="large"
                                name="simple-controlled"
                                value={feedback.Rating}
                                onChange={(event, newValue) => {
                                    handleRating(newValue);
                                }}
                            />
                        </div>
                        <div className=" rounded-xl p-3 mt-5">
                            <h1 className="font-semibold text-lg">
                                Add Review
                            </h1>
                            <textarea
                                className="mt-3 w-full h-32 p-2 border border-gray-300 rounded-md resize-none outline-none"
                                onChange={handleChange}
                                placeholder="Add Description"
                            />
                        </div>

                        <div className="flex w-full justify-center mt-10">
                            <button
                                className="bg-main text-white px-10 py-3 rounded-sm outline-none"
                                onClick={handleFeedback}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
