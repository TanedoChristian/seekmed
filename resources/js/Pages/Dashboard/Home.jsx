import ItemCard from "@/Components/ItemCard";
import Orderwait from "@/Components/Orderwait";
import ProductList from "@/Components/ProductList";
import EditProfile from "@/Components/Profile/Edit";
import MessageBox from "@/Components/UserMessageBox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    setDashboardCategory,
    setOrderAccepted,
    setReviews,
} from "@/state/userSlice";
import { Head } from "@inertiajs/react";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard({ auth, products, orders, reviews }) {
    const dispatch = useDispatch();
    const [activeCarts, setActiveCarts] = useState([]);
    const [open, setOpen] = useState(false);
    const handleDialogOpen = () => {
        setOpen(true);
    };
    const handleDialogClose = () => {
        setOpen(false);
    };

    dispatch(setReviews(reviews));

    const [dashboardPage, setDashboardPage] = useState(0);

    const dashboardCategory = useSelector(
        (state) => state.user.dashboardCategory
    );

    const isAccepted = useSelector((state) => state.user.isOrderAccepted);

    if (orders.length > 0) {
        dispatch(setOrderAccepted(1));
    }

    useEffect(() => {
        const pusher = new Pusher("0f60d240a7e37c6b2818", {
            cluster: "ap1",
            encrypted: true,
        });

        const channel = pusher.subscribe(`accept-order-${auth.user.id}`);
        channel.bind("my-event", (data) => {
            dispatch(setDashboardCategory(3));
        });

        return () => {
            pusher.unsubscribe(`accept-order-${auth.user.id}`);
            pusher.disconnect();
        };
    }, []);

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

            {dashboardCategory === 0 ? (
                isAccepted === 1 ? (
                    <Orderwait />
                ) : (
                    <ProductList
                        products={products}
                        handleDialogOpen={handleDialogOpen}
                        activeCarts={activeCarts}
                        setActiveCarts={setActiveCarts}
                    />
                )
            ) : dashboardCategory === 1 ? (
                <EditProfile user={auth.user} />
            ) : (
                <MessageBox user={auth.user} />
            )}
        </AuthenticatedLayout>
    );
}
