
// Define prop types for TabItem using TypeScript interface
interface TabItemProps {
    IconName: React.ElementType;
    active: boolean;
    onClick: () => void;
}

export function TabItem({ IconName, active, onClick }: TabItemProps) {
    const iconClass = active ? 'stroke-green-500 min-h-8 min-w-8' : 'stroke-gray-500 min-h-8 min-w-8';
    return (
        <button onClick={onClick}>
            <IconName className={iconClass}/>
        </button>
    );
}