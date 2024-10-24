import { Person } from "@mui/icons-material";
import { Rating } from "@mui/material";

export default function Review({ review }) {
    return (
        <div class="w-full max-w-7xl px-4 md:px-5 lg:6 mx-auto">
            <div class="w-full">
                <div class="pt-8 max-xl:max-w-2xl max-xl:mx-auto">
                    <div class="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
                        <div class="flex items-center gap-3">
                            <div className="bg-blue-100 flex justify-center items-center p-3 rounded-full">
                                <Person className="w-8 h-8" />
                            </div>

                            <div>
                                <h6 class="font-semibold text-lg leading-8 text-indigo-600">
                                    {review.customer}
                                </h6>
                                <Rating value={review.RATING} />
                            </div>
                        </div>
                        <p class="font-normal text-sm leading-8 text-gray-400">
                            {review.updated_at}
                        </p>
                    </div>
                    <p class="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">
                        {review.FEEDBACK}
                    </p>
                </div>
            </div>
        </div>
    );
}
