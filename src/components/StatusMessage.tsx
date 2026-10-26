import { CircleAlert, CloudSun, LoaderCircle } from 'lucide-react';

interface StatusMessageProps {
  variant: 'empty' | 'loading' | 'error';
  title: string;
  description?: string;
}

const ICONS = {
  empty: <CloudSun className="size-10 text-mist-400" aria-hidden />,
  loading: <LoaderCircle className="size-10 animate-spin text-mist-400" aria-hidden />,
  error: <CircleAlert className="size-10 text-sun-400" aria-hidden />,
};

export function StatusMessage({ variant, title, description }: StatusMessageProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className="flex min-h-48 flex-col items-center justify-center gap-3 text-center"
    >
      {ICONS[variant]}
      <p className="text-lg font-medium">{title}</p>
      {description && <p className="max-w-xs text-sm text-mist-400">{description}</p>}
    </div>
  );
}
