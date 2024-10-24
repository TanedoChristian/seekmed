export default function HomePage() {
    return (
        <div>
            <nav
                class="py-5 border-b-default border-solid border-gray-200 z-10 w-full bg-inherit lg:fixed"
                id="topnav"
            >
                <div class="mx-auto max-w-7xl  lg:px-8">
                    <div class="w-full flex flex-col lg:flex-row">
                        <div class="flex justify-between lg:hidden px-4">
                            <h1 className="text-4xl font-bold">Seekmed</h1>
                        </div>
                        <div
                            class="hidden w-full lg:flex justify-between max-lg:bg-white py-5 max-lg:mt-1 max-lg:px-4 max-lg:shadow-lg max-lg:shadow-gray-200 max-lg:h-auto max-lg:overflow-auto transition-all duration-500 delay-200 "
                            id="navbar"
                        >
                            <ul class="flex lg:items-center max-lg:gap-4 max-lg:mb-4 flex-col mt-4 lg:flex-1 md:mt-0 lg:flex-row">
                                <li>
                                    <a
                                        href="javascript:;"
                                        class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:mr-6 lg:text-base md:mb-0 md:mr-3 hover:text-gray-900"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="javascript:;"
                                        class="text-gray-500 text-sm font-medium hover:text-prime-blue-700 transition-all duration-500 mb-2 block lg:mr-6 lg:text-base md:mb-0 md:mr-3 hover:text-gray-900"
                                    >
                                        About us
                                    </a>
                                </li>
                            </ul>

                            <div class="flex lg:items-center justify-start flex-col lg:flex-row max-lg:gap-4 lg:flex-1 lg:justify-end">
                                <button
                                    class="bg-main text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-3 px-6 text-sm lg:ml-5 hover:bg-indigo-700"
                                    onClick={() => {
                                        window.location.href = "/register";
                                    }}
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <section class="pt-8 lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
                    <h1 class="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 mb-5 md:text-5xl leading-[50px]">
                        Pharmaceutical delivery with
                        <span class="text-main ml-2">Seekmed </span>
                    </h1>

                    <h1 className="text-center text-xl p-2">Choose Account</h1>
                    <div className="flex items-center gap-1.5 w-full justify-center p-3">
                        <button
                            class="bg-main text-white rounded-sm cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-2 px-8 text-sm lg:ml-5 hover:bg-indigo-700"
                            onClick={() => {
                                window.location.href = "/login";
                            }}
                        >
                            User
                        </button>
                        <button
                            class="bg-main text-white rounded-sm cursor-pointer font-semsibold text-center shadow-xs transition-all duration-500 py-2 px-8 text-sm lg:ml-5 hover:bg-indigo-700"
                            onClick={() => {
                                window.location.href = "/rider/login";
                            }}
                        >
                            Rider
                        </button>
                        <button
                            class="bg-main text-white rounded-sm cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 py-2 px-8 text-sm lg:ml-5 hover:bg-indigo-700"
                            onClick={() => {
                                window.location.href = "/admin/login";
                            }}
                        >
                            Admin
                        </button>
                    </div>
                    <div class="flex justify-center">
                        <img
                            src="https://www.singlecare.com/blog/wp-content/uploads/2021/01/Pharmacy-Delivery.png"
                            alt="Dashboard image"
                            class="rounded-t-3xl h-auto object-cover"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
