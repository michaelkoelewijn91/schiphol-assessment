import { memo } from "react";

export const ArrowDown = memo(({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M18.2 8.6L12 14.7 5.8 8.6 4.4 10l7.6 7.5 7.6-7.5-1.4-1.4z" />
    </svg>
));
