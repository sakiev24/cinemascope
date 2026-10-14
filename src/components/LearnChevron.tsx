// Learn more hover: put `t-learn` on the hovered parent; the chevron slides and opens into an arrow
const LearnChevron = ({ className = 'h-4 w-4' }: { className?: string }) => (
    <span className="t-learn-chevron" aria-hidden="true">
        <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
            <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" />
            <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" />
        </svg>
    </span>
);

export default LearnChevron;
