'use client';

import { useCallback } from "react";
import { Button } from "../ui/button";

interface FormModalProps {
    onSubmit: () => Promise<void>;
    title: string;
    submitButtonLabel: string;
    disabled?: boolean;
    body?: React.ReactElement;
    footer?: React.ReactElement;
}

const FormModal: React.FC<FormModalProps> = ({
    onSubmit,
    title,
    submitButtonLabel,
    disabled,
    body,
    footer,
}) => {


    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit])

    return (
        <div
            id="wrapper"
            className="
            flex
            items-center
            justify-center
            bg-neutral-200/50
            fixed
            inset-0
        "
        >
            <div
                className="
                relative
                w-10/12
                max-w-md
                shadow-md 
                border 
                rounded-md 
                bg-[url('/images/backdrop.svg')]
                bg-no-repeat
                bg-cover
                "
            >
                <form
                    className="
                    w-full
                    h-full
                    p-4
                    pt-6
                    bg-neutral-200/80
                    "
                >
                    <div
                        id="header"
                        className="
                    text-center
                    mb-4
                    "
                    >
                        <label
                            className="
                            font-extrabold
                            text-2xl
                            drop-shadow-md
                            tracking-widest
                            uppercase
                            "
                        >
                            {title}
                        </label>
                    </div>
                    {body}
                    <Button
                        disabled={disabled}
                        className="tracking-wider w-full my-4"
                        onClick={handleSubmit}
                    >
                        {submitButtonLabel}
                    </Button>
                    <div
                        id="divider"
                        className="
                    relative
                    w-full 
                    flex
                    items-center
                    gap-4
                    "
                    >
                        <span className="w-full h-[2px] bg-neutral-400" />
                        <span className="font-medium">
                            or
                        </span>
                        <span className="w-full h-[2px] bg-neutral-400" />
                    </div>
                    {footer}
                </form>
            </div>
        </div>
    )
}

export default FormModal;