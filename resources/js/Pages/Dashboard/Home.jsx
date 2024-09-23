import ItemCard from "@/Components/ItemCard";
import ProductList from "@/Components/ProductList";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, products }) {
    const [activeCarts, setActiveCarts] = useState([]);

    const [open, setOpen] = useState(false);
    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            open={open}
            onOpenChange={setOpen}
            activeCarts={activeCarts}
            setActiveCarts={setActiveCarts}
        >
            <Head title="Dashboard" />
            <ProductList
                products={products}
                handleDialogOpen={handleDialogOpen}
                activeCarts={activeCarts}
                setActiveCarts={setActiveCarts}
            />
        </AuthenticatedLayout>
    );
}
