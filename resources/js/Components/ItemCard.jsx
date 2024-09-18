import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcdn/ui/dialog";

const ItemCard = ({ item, type, img }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div class="bg-white rounded-2xl p-5 cursor-pointer hover:-translate-y-2 transition-all relative">
                    <span class="py-1 min-[400px]:py-2 px-2 min-[400px]:px-4 cursor-pointer rounded-lg bg-main from-indigo-600 to-purple-600 font-medium text-base leading-7 text-white absolute top-3 right-3 z-10 tex-sm">
                        {type}
                    </span>

                    <div class="w-5/6 h-[210px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4 bg-white">
                        <img
                            src={img}
                            alt="Product 1"
                            class="h-full w-full object-contain"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <h3 class="text-lg  text-gray-800">{item}</h3>
                            <h4 class="text-lg text-gray-800 font-semibold mt-4">
                                $10
                            </h4>
                        </div>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader className="text-center"></DialogHeader>
                <div class="w-full text-center text-black text-3xl font-bold font-manrope leading-normal">
                    Add to Cart
                </div>
                <div className="p-2">
                    <div className="flex gap-3 justify-between px-2 mb-2 items-center">
                        <img
                            src={img}
                            alt=""
                            className="w-10 h-10 object-cover"
                        />
                        <div className="">
                            <h1 className="font-semibold text-md">{item}</h1>
                        </div>
                        <div className="flex gap-3 items-center">
                            <button className="outline-none font-semibold">
                                -
                            </button>
                            <span className="outline-none">2</span>
                            <button className="outline-none font-semibold">
                                +
                            </button>
                        </div>
                        <div className="">
                            <h1 className="font-semibold text-md">$50.00</h1>
                        </div>

                        <button className="px-3 py-1 text-sm  text-red-500 font-semibold">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ItemCard;
