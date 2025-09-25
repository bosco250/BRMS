import { motion } from "framer-motion";

export default function BusinessCardSkeleton() {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden ring-1 ring-border-secondary shadow-md bg-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image skeleton */}
      <div className="aspect-[4/3] bg-gradient-to-r from-border-subtle/40 via-border-subtle/20 to-border-subtle/40 animate-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {/* Type badge skeleton */}
        <div className="absolute top-3 left-3">
          <div className="h-6 w-16 bg-border-subtle/60 rounded-full animate-pulse" />
        </div>

        {/* Rating skeleton */}
        <div className="absolute top-3 right-3">
          <div className="h-6 w-12 bg-border-subtle/60 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4">
        {/* Title and rating */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="h-5 w-3/4 bg-border-subtle/60 rounded animate-pulse mb-2" />
            <div className="h-4 w-1/2 bg-border-subtle/40 rounded animate-pulse" />
          </div>
          <div className="h-4 w-16 bg-border-subtle/40 rounded animate-pulse" />
        </div>

        {/* Location and status */}
        <div className="flex items-center gap-4 mb-3">
          <div className="h-3 w-20 bg-border-subtle/40 rounded animate-pulse" />
          <div className="h-3 w-16 bg-border-subtle/40 rounded animate-pulse" />
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-1 mb-4">
          <div className="h-5 w-16 bg-border-subtle/40 rounded-full animate-pulse" />
          <div className="h-5 w-20 bg-border-subtle/40 rounded-full animate-pulse" />
          <div className="h-5 w-12 bg-border-subtle/40 rounded-full animate-pulse" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="h-8 w-20 bg-border-subtle/40 rounded animate-pulse" />
          <div className="h-8 w-16 bg-border-subtle/40 rounded animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}
