import SweetCard from './SweetCard';
import EmptyState from '../ui/EmptyState';

const SweetGrid = ({ sweets, onPurchase, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white rounded-2xl border border-pink-100 shadow-lg overflow-hidden">
              <div className="h-48 shimmer"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 shimmer rounded w-3/4"></div>
                <div className="h-4 shimmer rounded w-1/2"></div>
                <div className="h-8 shimmer rounded w-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sweets.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No sweets found"
        description="Try adjusting your search or check back later for new delicious treats!"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sweets.map((sweet) => (
        <SweetCard
          key={sweet._id}
          sweet={sweet}
          onPurchase={onPurchase}
        />
      ))}
    </div>
  );
};

export default SweetGrid;