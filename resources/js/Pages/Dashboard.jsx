import ItemCard from "@/Components/ItemCard";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    var items = [
        {
            item: "Surgical Mask",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzAiXNo_nAbOujxUeFuBuA2JsqcvBXJ2dnAg&s",
            type: "WholeSale",
        },
        {
            item: "Catheter Kit",
            img: "https://www.deroyal.com/images/default-source/patient-care/surgical-acute-care/81-0805xx-foley-catheter-kit.tmb-thumb800.png?sfvrsn=cbfbdbef_49",
            type: "Retail",
        },
        {
            item: "Wheelchair",
            img: "https://i.pinimg.com/originals/50/71/2c/50712cf3008ba68f63da9e56395515a7.png",
            type: "Retail",
        },
        {
            item: "Robust Extreme",
            img: "https://atchealthcare.com.ph/wp-content/uploads/2020/03/Robust-Extreme-.png",
            type: "Retail",
        },
        {
            item: "Robust Extreme",
            img: "https://atchealthcare.com.ph/wp-content/uploads/2020/03/Robust-Extreme-.png",
            type: "Retail",
        },
        {
            item: "Robust Extreme",
            img: "https://atchealthcare.com.ph/wp-content/uploads/2020/03/Robust-Extreme-.png",
            type: "Retail",
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="w-full flex justify-center"> <div className="p-5 flex flex-wrap gap-5 w-[80%] justify-start">
  {items.map((item) => (
    <ItemCard
      item={item.item}
      img={item.img}
      type={item.type}
    />
  ))}
</div></div>

        </AuthenticatedLayout>
    );
}
