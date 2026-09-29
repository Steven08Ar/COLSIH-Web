import { useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

const WA_NUMBER = '573151458309';
const WA_MESSAGE = encodeURIComponent('¡Hola! Me comunico desde la página del Movimiento Juvenil Salesiano (MJS) Floridablanca. Me gustaría recibir información para unirme a las actividades de los sábados.');

export default function MjsFloatingWhatsApp() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            id="floating-mjs-whatsapp"
            className="fixed bottom-4 right-3 sm:bottom-8 sm:right-8 z-[99990] flex items-center gap-3 select-none pointer-events-auto transition-all duration-500"
        >
            {/* Tooltip Juvenil MJS */}
            <div 
                className={`hidden sm:flex items-center gap-2.5 px-4 py-2.5 bg-[#080D3B]/95 text-white text-xs font-bold rounded-2xl shadow-2xl backdrop-blur-md border border-[#FFC606]/40 transition-all duration-300 transform origin-right ${
                    isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95 pointer-events-none'
                }`}
            >
                <span className="w-2 h-2 rounded-full bg-[#FFC606] animate-ping" />
                <span className="text-[#FEF08A]">¡Escríbenos al MJS Floridablanca! 🎈</span>
            </div>

            {/* Botón Flotante con pulso y estilo */}
            <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chatear con el MJS en WhatsApp"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.65)] transform hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
            >
                {/* Anillo de pulso exterior */}
                <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-40 pointer-events-none" />

                {/* Badge Salesiano flotante arriba a la derecha */}
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#FFC606] text-[#080D3B] text-[10px] font-black flex items-center justify-center shadow-md border-2 border-white">
                    MJS
                </span>

                <svg 
                    viewBox="0 0 24 24" 
                    className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-sm group-hover:rotate-6 transition-transform duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
            </a>
        </div>
    );
}
