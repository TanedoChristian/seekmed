import ItemCard from "./ItemCard";

export default function ProductList({
    products,
    handleDialogOpen,
    activeCarts,
    setActiveCarts,
}) {
    return (
        <section class="py-20">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 class="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
                    Available Products
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 font-manrope">
                    {products.map((item) => (
                        <ItemCard
                            id={item.id}
                            item={item.PRODUCT_NAME}
                            img={item.image}
                            type={item.IS_WHOLESALE}
                            description={item.DESCRIPTION}
                            price={item.PRICE}
                            stock={item.STOCK_QUANTITY}
                            activeCarts={activeCarts}
                            setActiveCarts={setActiveCarts}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
