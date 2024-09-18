export default function Breadcrumb() {
    return (
        <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                    <a
                        href="javascript:;"
                        class="inline-flex items-center text-base font-medium text-gray-900 hover:text-indigo-800"
                    >
                        {" "}
                        Tab text{" "}
                    </a>
                </li>
                <li>
                    <div class="flex items-center">
                        <svg
                            class="mx-1 w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                                stroke="#E5E7EB"
                                stroke-width="1.6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <a
                            href="javascript:;"
                            class="ml-1 text-base font-medium text-gray-900 hover:text-indigo-800 md:ml-2"
                        >
                            {" "}
                            Tab text
                        </a>
                    </div>
                </li>
                <li aria-current="page">
                    <div class="flex items-center">
                        <svg
                            class="mx-1 w-5 h-5"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                                stroke="#E5E7EB"
                                stroke-width="1.6"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                        <span class="ml-1 text-base font-medium text-indigo-600 md:ml-2 ">
                            Tab text
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    );
}
