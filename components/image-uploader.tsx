'use client';

import Image from "next/image";
import { BiImageAdd } from "react-icons/bi";
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from './ui/button';
import { FiTrash } from "react-icons/fi";
import { useEffect, useState } from "react";

interface ImageUploaderProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    disabled,
    onChange,
    onRemove,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <div className="flex items-center space-x-2 mb-2">
                {value.map((url) => (
                    <div
                        key={url}
                        className="relative w-36 h-36 border rounded-md overflow-hidden"
                    >
                        <Image
                            src={url}
                            alt="url"
                            fill
                            className="object-cover"
                        />
                        <Button
                            size="sm"
                            variant="destructive"
                            className="absolute top-2 right-2"
                            onClick={() => onRemove(url)}
                        >
                            <FiTrash />
                        </Button>
                    </div>
                ))}
            </div>
            <CldUploadWidget
                onUpload={onUpload}
                uploadPreset='ke28pnmb'
            >
                {({ open }) => {
                    const handleOnClick = () => {
                        open();
                    }
                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            className="bg-neutral-300 text-black hover:bg-neutral-300/70"
                            onClick={handleOnClick}>
                            <BiImageAdd size={20} className="mr-2" />
                            Upload Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUploader
