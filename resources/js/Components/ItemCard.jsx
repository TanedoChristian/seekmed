import { Button } from "@/shadcdn/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcdn/ui/card";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";

const ItemCard = ({ item, type, img }) => {
    return (
        <Card className="w-[380px]">
            <CardHeader>
                <div className="flex justify-between  items-center">
                    <CardTitle className="text-slate-500">{item}</CardTitle>
                    <h1 className="border-2 border-slate-300 font-bold rounded-lg px-4 py-0.5">
                        {type}
                    </h1>
                </div>
            </CardHeader>
            <CardContent>
                <div className="p-3 flex w-full justify-center items-center">
                    <img
                        src={`${img}`}
                        alt=""
                        className="h-[130px] object-cover"
                    />
                </div>
            </CardContent>

            <div className="w-full">
                <div className="flex justify-between p-2 px-5 items-center">
                    <div className="flex gap-3 items-center">
                        <h1 className="text-slate-500">Quantity</h1>
                        <div className="flex items-center gap-2">
                            <button className="p-1 rounded-lg font-bold text-slate-500">
                                +
                            </button>
                            <h1 className="text-slate-500">0</h1>
                            <button className="p-1 rounded-lg font-bold text-slate-500">
                                -
                            </button>
                        </div>
                    </div>

                    <Button
                        className="bg-[#499392] text-white rounded-md"
                        size="sm"
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ItemCard;
