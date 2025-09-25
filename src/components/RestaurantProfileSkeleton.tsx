import { motion } from "framer-motion";

export default function RestaurantProfileSkeleton() {
  return (
    <div className="min-h-screen bg-surface-primary">
      {/* Hero section skeleton with shimmer */}
      <div className="relative h-96 overflow-hidden rounded-b-3xl">
        <div className="absolute inset-0 bg-border-subtle/30" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]"
          style={{ backgroundSize: "200% 100%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Back button skeleton */}
        <div className="absolute top-6 left-6">
          <div className="h-10 w-10 bg-border-subtle/60 rounded-full" />
        </div>

        {/* Action buttons skeleton */}
        <div className="absolute top-6 right-6 flex gap-2">
          <div className="h-10 w-10 bg-border-subtle/60 rounded-full" />
          <div className="h-10 w-10 bg-border-subtle/60 rounded-full" />
        </div>

        {/* Business info skeleton */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="h-8 w-1/3 bg-border-subtle/60 rounded mb-2" />
          <div className="h-4 w-1/4 bg-border-subtle/40 rounded mb-3" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-border-subtle/40 rounded-full" />
            <div className="h-6 w-20 bg-border-subtle/40 rounded-full" />
            <div className="h-6 w-12 bg-border-subtle/40 rounded-full" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="h-10 w-20 bg-border-subtle/40 rounded" />
          <div className="h-10 w-24 bg-border-subtle/40 rounded" />
          <div className="h-10 w-16 bg-border-subtle/40 rounded" />
        </div>

        {/* Menu items skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-xl overflow-hidden ring-1 ring-border-secondary bg-dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Menu item image skeleton with shimmer */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-border-subtle/30" />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]"
                  style={{ backgroundSize: "200% 100%" }}
                />
              </div>

              {/* Menu item content skeleton */}
              <div className="p-4">
                <div className="h-5 w-3/4 bg-border-subtle/60 rounded mb-2" />
                <div className="h-4 w-full bg-border-subtle/40 rounded mb-2" />
                <div className="h-4 w-1/2 bg-border-subtle/40 rounded mb-3" />
                <div className="flex items-center justify-between">
                  <div className="h-6 w-16 bg-border-subtle/40 rounded" />
                  <div className="h-8 w-20 bg-border-subtle/40 rounded" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
