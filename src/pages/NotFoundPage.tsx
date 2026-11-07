import { Link } from 'react-router-dom';
import { StatusMessage } from '@/components/StatusMessage';

export function NotFoundPage() {
  return (
    <>
      <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
        <StatusMessage
          variant="error"
          title="Страница не найдена"
          description="Такого адреса в приложении нет."
        />
      </div>

      <div className="mt-6">
        <Link
          to="/"
          className="text-sm text-mist-400 underline-offset-4 hover:text-mist-100 hover:underline"
        >
          ← На главную
        </Link>
      </div>
    </>
  );
}
