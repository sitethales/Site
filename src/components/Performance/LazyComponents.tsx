import { lazy, Suspense, ComponentType } from 'react';

// Lazy loading wrapper with error boundary - simplified version
export const withLazyLoading = (
  importComponent: () => Promise<{ default: ComponentType<any> }>,
  fallback: JSX.Element = <div className="w-full h-32 bg-muted animate-pulse rounded-lg" />
) => {
  const LazyComponent = lazy(importComponent);
  
  return (props: any) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

// Performance optimized image component
export const OptimizedImage = ({ 
  src, 
  alt, 
  className = "", 
  loading = "lazy",
  ...props 
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  [key: string]: any;
}) => (
  <img
    src={src}
    alt={alt}
    loading={loading}
    decoding="async"
    className={className}
    {...props}
    onError={(e) => {
      const target = e.target as HTMLImageElement;
      target.style.display = 'none';
    }}
  />
);