import ProductSkeleton from '@/components/skeleton/ProductSkeleton';
import React from 'react'

const loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(9)].map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  )
}

export default loading;