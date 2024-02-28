import { ApiAlert } from "./api-alert";
import { useOrigin } from "@/hooks/useOrigin";

interface ApiListProps {
    entryName: string;
    entryIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
    entryName,
    entryIdName
}) => {
    const origin = useOrigin();

    return (
        <>
            <ApiAlert
                variants="public"
                method="GET"
                apiUrl={`${origin}/api/${entryName}`}
            />
            <ApiAlert
                variants="public"
                method="GET"
                apiUrl={`${origin}/api/${entryName}/${entryIdName}`}
            />
            <ApiAlert
                variants="admin"
                method="POST"
                apiUrl={`${origin}/api/${entryName}`}
            />
            <ApiAlert
                variants="admin"
                method="PATCH"
                apiUrl={`${origin}/api/${entryName}/${entryIdName}`}
            />
            <ApiAlert
                variants="admin"
                method="DELETE"
                apiUrl={`${origin}/api/${entryName}/${entryIdName}`}
            />
        </>
    )
}