import { FiCopy, FiServer } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    apiUrl: string;
    variants: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variants"], string> = {
    public: "public",
    admin: "admin",
}

const variantMap: Record<ApiAlertProps["variants"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
}

export const ApiAlert: React.FC<ApiAlertProps> = ({
    method,
    apiUrl,
    variants
}) => {
    const onCopy = (copiedText: string) => {
        navigator.clipboard.writeText(copiedText);
        toast.success("Successfully copied to clipboard.")
    }

    return (
        <Alert>
            <FiServer size={20} />
            <AlertTitle className="font-semibold">
                {method}
                <Badge
                    variant={variantMap[variants]}
                    className="ml-2 font-normal tracking-wide"
                >
                    {textMap[variants]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="flex items-center justify-between">
                <code className="text-sm max-w-[90%] truncate mr-2">
                    {apiUrl}
                </code>
                <Button
                    variant="outline"
                    type="button"
                    size="icon"
                    onClick={() => onCopy(apiUrl)}
                >
                    <FiCopy />
                </Button>
            </AlertDescription>
        </Alert>
    )
}