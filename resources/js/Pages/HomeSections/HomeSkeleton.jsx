export default function HomeSkeleton() {
    return (
        <div className="w-full min-h-screen bg-white select-none animate-pulse">
            
            {/* 1. Header / Navbar Skeleton */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-5">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] flex items-center justify-between">
                    {/* Logo placeholder */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                        <div className="space-y-1.5">
                            <div className="w-20 h-3 bg-slate-200 rounded-md"></div>
                            <div className="w-28 h-4.5 bg-slate-200 rounded-md"></div>
                        </div>
                    </div>
                    {/* Nav links placeholder */}
                    <div className="hidden lg:flex items-center gap-10">
                        <div className="w-14 h-4.5 bg-slate-200 rounded-md"></div>
                        <div className="w-24 h-4.5 bg-slate-200 rounded-md"></div>
                        <div className="w-20 h-4.5 bg-slate-200 rounded-md"></div>
                        <div className="w-16 h-4.5 bg-slate-200 rounded-md"></div>
                    </div>
                    {/* Button placeholder */}
                    <div className="w-36 h-11 bg-slate-200 rounded-full"></div>
                </div>
            </header>

            {/* 2. Hero Section Skeleton */}
            <section className="relative min-h-[900px] flex items-center pt-32 pb-20 border-b border-slate-100 bg-[#08111F]/5">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] w-full grid grid-cols-12 gap-8 items-center">
                    {/* Left text column */}
                    <div className="col-span-12 lg:col-span-6 space-y-8 text-left">
                        <div className="space-y-3">
                            <div className="w-3/4 h-12 bg-slate-200 rounded-xl"></div>
                            <div className="w-2/3 h-12 bg-slate-200 rounded-xl"></div>
                            <div className="w-1/2 h-12 bg-slate-200 rounded-xl"></div>
                        </div>
                        <div className="space-y-2 max-w-md">
                            <div className="w-full h-4 bg-slate-200/80 rounded-md"></div>
                            <div className="w-5/6 h-4 bg-slate-200/80 rounded-md"></div>
                        </div>
                        <div className="flex gap-4 pt-4">
                            <div className="w-44 h-12 bg-slate-200 rounded-full"></div>
                            <div className="w-28 h-12 bg-slate-200/60 rounded-full"></div>
                        </div>
                    </div>
                    {/* Right media block placeholder */}
                    <div className="col-span-12 lg:col-span-6 flex justify-end">
                        <div className="w-full max-w-[620px] aspect-[16/10] bg-slate-200 rounded-3xl"></div>
                    </div>
                </div>
            </section>

            {/* 3. About Section Skeleton */}
            <section className="py-24 border-b border-slate-100 bg-white">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] grid grid-cols-12 gap-16 items-center">
                    {/* Left Image column */}
                    <div className="col-span-12 lg:col-span-6 flex justify-center">
                        <div className="w-full max-w-[480px] aspect-[4/5] bg-slate-200 rounded-2xl"></div>
                    </div>
                    {/* Right details column */}
                    <div className="col-span-12 lg:col-span-6 space-y-8 text-left">
                        <div className="space-y-4">
                            <div className="w-32 h-4.5 bg-slate-200 rounded-md"></div>
                            <div className="w-64 h-10 bg-slate-200 rounded-xl"></div>
                            <div className="space-y-2 max-w-xl">
                                <div className="w-full h-4 bg-slate-200/80 rounded-md"></div>
                                <div className="w-11/12 h-4 bg-slate-200/80 rounded-md"></div>
                            </div>
                        </div>
                        <div className="space-y-4 pt-4">
                            <div className="w-full h-16 bg-slate-100 rounded-xl"></div>
                            <div className="w-full h-16 bg-slate-100 rounded-xl"></div>
                            <div className="w-full h-16 bg-slate-100 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Pillars Section Skeleton */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-[1680px] mx-auto px-6 md:px-12 lg:px-[120px] space-y-16">
                    <div className="max-w-xl text-left space-y-3">
                        <div className="w-24 h-4.5 bg-slate-200 rounded-md"></div>
                        <div className="w-80 h-10 bg-slate-200 rounded-xl"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="h-[300px] w-full bg-slate-100 rounded-3xl"></div>
                        <div className="h-[300px] w-full bg-slate-100 rounded-3xl"></div>
                        <div className="h-[300px] w-full bg-slate-100 rounded-3xl"></div>
                        <div className="h-[300px] w-full bg-slate-100 rounded-3xl"></div>
                    </div>
                </div>
            </section>

        </div>
    );
}
