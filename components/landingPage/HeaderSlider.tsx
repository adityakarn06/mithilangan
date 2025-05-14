
export default async function HeaderSlider() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold text-black mb-4">--------------</h1>
        <p className="text-lg text-black mb-8">Buy authentic hand made product online.</p>
        <div className="flex gap-4">
         <button className="bg-white text-black px-6 py-3 shadow-lg hover:bg-gray-100 transition duration-300">
            FOR HER
        </button>
        <button className="bg-white text-black px-6 py-3 shadow-lg hover:bg-gray-100 transition duration-300">
            FOR HIM
        </button>
        </div>

        </div>
    );
}