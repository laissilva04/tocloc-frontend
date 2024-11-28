import React from 'react'
import { MousePointer, Users, ClipboardList } from 'lucide-react'

export default function Highlights() {
    return (
        <section className="bg-gray-200 py-16">
            <div className="container-gray mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-12" >Por que escolher Tocloc?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <HighlightItem 
                        icon={<MousePointer className="w-8 h-8 text-green-600" />}
                        title="Fácil de Usar"
                        description="Reserve locais em apenas alguns cliques."
                    />
                    <HighlightItem 
                        icon={<Users className="w-8 h-8 text-green-600" />}
                        title="Conexão Rápida"
                        description="Encontre jogadores e donos de espaços facilmente."
                    />
                    <HighlightItem 
                        icon={<ClipboardList className="w-8 h-8 text-green-600" />}
                        title="Gestão Eficiente"
                        description="Acompanhe suas reservas e check-ins em um só lugar."
                    />
                </div>
            </div>
        </section>
    )
}

function HighlightItem({ icon, title, description }) {
    return (
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl border-2 border-green-500">
            <div className="mb-4 bg-primary-50 p-4 rounded-full shadow-inner">{icon}</div>
            <h3 className="text-xl font-semibold text-primary-800 mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
        </div>
    )
}

