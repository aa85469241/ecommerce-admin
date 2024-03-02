'use client';

import { dateFormat, emailFormat } from "@/lib/utils";
import { User } from "@prisma/client"

interface UserStatusProps {
    user: User;
}

const UserStatus: React.FC<UserStatusProps> = ({
    user
}) => {
    const isGoogleAuth = user.email.startsWith("googleauth-");

    return (
        <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
                <h1>ID:</h1>
                <p className="text-neutral-500">
                    {user.id}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <h1>Email:</h1>
                <p className="text-neutral-500">
                    {emailFormat(user.email)}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <h1>Authentication:</h1>
                <p className="text-neutral-500">
                    {isGoogleAuth ? "Google" : "Credentials"}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <h1>Role:</h1>
                <p className="text-neutral-500">
                    {user.role}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <h1>Create At:</h1>
                <p className="text-neutral-500">
                    {dateFormat(user.createAt)}
                </p>
            </div>
        </div>
    )
}

export default UserStatus