import { usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Pages/HomeSections/Footer';

export default function AppLayout({ children }) {
    const { props } = usePage();
    const flash = props.flash ?? {};

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-red-100 selection:text-red-900">
            <Navbar />

            {/* Flash Message Banner */}
            {flash.success && (
                <div className="bg-emerald-50 border-b border-emerald-100 py-3.5 px-4 shadow-inner">
                    <div className="max-w-7xl mx-auto flex items-center gap-3">
                        <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[14px] font-medium text-emerald-800">{flash.success}</p>
                    </div>
                </div>
            )}

            {/* Page Content */}
            <main className="flex-grow">{children}</main>

            <Footer />
        </div>
    );
}
