import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground text-center">
      <h2 className="text-4xl font-bold mb-4">Página não encontrada</h2>
      <p className="text-lg mb-6">Nenhum recurso foi encontrado</p>
      <Link 
        href="/dashboard-engineering"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-secondary transition">
        Retornar à página de engenharia
      </Link>
    </div>
  );
}
