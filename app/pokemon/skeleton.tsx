import clsx from 'clsx';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function Skeleton() {
  return (
    <div className="w-full animate-pulse">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          style={{ height: 77 }}
          className={clsx('flex items-center justify-between border-b border-gray-200 p-2')}
        >
          <div className="h-2.5 bg-gray-200 rounded-full w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
