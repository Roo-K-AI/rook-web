interface BadgeProps {
  status: 'accepted' | 'processing' | 'completed' | 'failed';
  children?: React.ReactNode;
}

const styles = {
  accepted: 'bg-warning/10 text-warning border-warning/20',
  processing: 'bg-secondary/10 text-secondary border-secondary/20',
  completed: 'bg-success/10 text-success border-success/20',
  failed: 'bg-danger/10 text-danger border-danger/20',
};

const labels = {
  accepted: 'Accepted',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
};

export function StatusBadge({ status, children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>
      {status === 'processing' && (
        <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
      )}
      {status === 'completed' && (
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
      )}
      {children || labels[status]}
    </span>
  );
}
