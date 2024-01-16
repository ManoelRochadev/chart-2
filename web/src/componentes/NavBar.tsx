const NavBar = () => {
    return (
        <header>
            <div className="grid grid-cols-3 md:grid-cols-2 px-5 py-4 bg-my_blue justify-center ">
                <a
                    href="#"
                    className=" col-start-2 md:col-start-1 md:mx-1 text-lg md:text-xl font-semibold text-slate-100 justify-self-center md:justify-self-start"
                >
                    <h1>MM-DIRECT</h1>
                </a>
                {/* <div className="mr-2 justify-self-end">
                    <button className="w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 scale-90 md:scale-110 fill-slate-50"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div> */}
            </div>
        </header>
    );
};

export default NavBar;
