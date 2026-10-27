import React from 'react';
import { FolderPlus, CheckCircle2 } from 'lucide-react';

const EmptyState = ({
  icon: Icon = FolderPlus,
  title = 'No items found',
  description = 'Get started by creating your very first entry.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrap">
        <Icon size={32} />
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary">
          <Icon size={16} />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
