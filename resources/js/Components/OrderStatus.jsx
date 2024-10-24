export default function OrderStatus({ icon, number, title, bgColor, color }) {
    return (
        <div className="h-[11vh] w-[250px] rounded-xl border flex gap-6 items-center p-6 mt-10 shadow-sm">
            <div
                className={`w-[50px] h-[50px]  rounded-full flex p-3 items-center justify-center ${bgColor}`}
            >
                <span className={`${color}`}>{icon} </span>
            </div>
            <div className="flex flex-col gap-1">
                <h1 className="font-bold text-2xl">{number}</h1>
                <p className="text-gray-500  text-sm font-medium">{title}</p>
            </div>
        </div>
    );
}
