import { Rating } from "@mui/material";

export default function Review() {
    return (
        <div class="w-full max-w-7xl px-4 md:px-5 lg:6 mx-auto">
            <div class="w-full">
                <div class="pt-8 max-xl:max-w-2xl max-xl:mx-auto">
                    <h3 class="font-manrope font-semibold text-xl sm:text-2xl leading-9 text-black mb-6">
                        Pagedone's design system seamlessly bridges the gap
                        between designers and developers!
                    </h3>
                    <div class="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
                        <div class="flex items-center gap-3">
                            <img
                                src="https://pagedone.io/asset/uploads/1704351103.png"
                                alt="Robert image"
                                class="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                                <h6 class="font-semibold text-lg leading-8 text-indigo-600">
                                    Robert Karmazov
                                </h6>
                                <Rating value={5} />
                            </div>
                        </div>
                        <p class="font-normal text-lg leading-8 text-gray-400">
                            Nov 01, 2023
                        </p>
                    </div>
                    <p class="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">
                        Pagedone doesn't disappoint when it comes to the variety
                        and richness of its design components. From pre-built
                        templates to customizable elements, the system caters to
                        both beginners and seasoned designers. The extensive
                        library ensures a diverse range of options to bring
                        creative visions to life.
                    </p>
                </div>
            </div>
        </div>
    );
}
