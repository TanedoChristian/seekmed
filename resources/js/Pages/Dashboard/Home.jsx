import ItemCard from "@/Components/ItemCard";
import ProductList from "@/Components/ProductList";
import EditProfile from "@/Components/Profile/Edit";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Dashboard({ auth, products }) {
    const [activeCarts, setActiveCarts] = useState([]);

    const [open, setOpen] = useState(false);
    const handleDialogOpen = () => {
        setOpen(true);
    };
    const handleDialogClose = () => {
        setOpen(false);
    };

    const [dashboardPage, setDashboardPage] = useState(0);

    const dashboardCategory = useSelector(
        (state) => state.user.dashboardCategory
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            open={open}
            onOpenChange={setOpen}
            activeCarts={activeCarts}
            setActiveCarts={setActiveCarts}
            setDashboardPage={setDashboardPage}
        >
            <Head title="Dashboard" />

            {dashboardCategory == 0 ? (
                <ProductList
                    products={products}
                    handleDialogOpen={handleDialogOpen}
                    activeCarts={activeCarts}
                    setActiveCarts={setActiveCarts}
                />
            ) : (
                <EditProfile user={auth.user} />
            )}
        </AuthenticatedLayout>
    );
}
