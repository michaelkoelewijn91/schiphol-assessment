import { memo } from "react";

export const ArrowRight = memo(({ className }: { className?: string }) => (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" className={className}>
        <path fill="currentcolor" d="m7 5.8 6.1 6.2L7 18.2l1.4 1.4 7.5-7.6-7.5-7.6L7 5.8z" />
    </svg>
));
