import ItemCard from "./ItemCard";

export default function ProductList({ items, handleDialogOpen }) {
    return (
        <section class="py-20">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 class="font-manrope font-bold text-3xl min-[400px]:text-4xl text-black mb-8 max-lg:text-center">
                    Available Products
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 font-manrope">
                    {items.map((item) => (
                        <ItemCard
                            item={item.item}
                            img={item.img}
                            type={item.type}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
