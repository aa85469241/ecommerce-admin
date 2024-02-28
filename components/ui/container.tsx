import { cn } from "@/lib/utils";

interface ContainerProps {
    className?: string;
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
    className,
    children
}) => {
    return (
        <div className={cn("flex flex-col space-y-4 p-4 pt-6 md:p-16 md:pb-8 md:pt-8", className)}>{children}
        </div>
    )
}

export default Container