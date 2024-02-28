'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineGoogle } from "react-icons/ai"
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormModal from '@/components/modals/FormModal'


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 character."
    }),
    email: z.string().email({ message: "Invalid Email." }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    }).max(16, {
        message: "Password must not be longer than 30 characters."
    }),
})

type FormValues = z.infer<typeof formSchema>

const SignUpPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const defaultValues = {
        name: "",
        email: "",
        password: "",
    }

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        ...defaultValues,
        mode: "onChange",
    })

    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);

        await axios.post("/api/sign-up", values)
            .then(() => {
                toast.success("Sign Up successfully.");

                setTimeout(() => {
                    router.push("/sign-in")
                }, 300)
            })
            .catch(err => {
                toast.error(err)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-1">
            <div className="space-y-1">
                <Label className="pl-1 tracking-wider">Username</Label>
                <Input
                    id="name"
                    type="text"
                    placeholder="name"
                    disabled={isLoading}
                    className="focus-visible:ring-offset-0 border-neutral-400"
                    {...register("name", { required: true })}
                />
                <span className={`
                error-message
                ${errors.name ? "translate-y-0" : "-translate-y-4"}
                ${errors.name ? "opacity-100" : "opacity-0"}
                `}
                >
                    {errors.name?.message}
                </span>
            </div>
            <div className="space-y-1">
                <Label className="pl-1 tracking-wider">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="email"
                    disabled={isLoading}
                    className="focus-visible:ring-offset-0 border-neutral-400"
                    {...register("email", { required: true })}
                />
                <p className={`
                error-message
                ${errors.email ? "translate-y-0" : "-translate-y-4"}
                ${errors.email ? "opacity-100" : "opacity-0"}
                `}>
                    {errors.email?.message}
                </p>
            </div>
            <div className="space-y-1">
                <Label className="pl-1 tracking-wider">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    disabled={isLoading}
                    className="focus-visible:ring-offset-0 border-neutral-400"
                    {...register("password", { required: true })}
                />
                <span className={`
                error-message
                ${errors.password ? "translate-y-0" : "-translate-y-4"}
                ${errors.password ? "opacity-100" : "opacity-0"}
                `}>
                    {errors.password?.message}
                </span>
            </div>
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 pt-4">
            <Button
                type="button"
                className="w-full capitalize"
                disabled={isLoading}
                onClick={() => signIn("google", { callbackUrl: "/" })}
            >
                <span className="text-white inline mr-2">
                    <AiOutlineGoogle size={25} />
                </span>
                Continue with Google
            </Button>
            <div className="w-full text-center">
                <p className="
                    text-sm font-light
                    text-neutral-500 
                    tracking-wider
                    "
                >
                    Already have an account.
                    <Link href="/sign-in">
                        <span className="
                            ml-1 
                            font-normal 
                            text-neutral-700
                            hover:font-bold
                            "
                        >
                            Login now.
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    )

    return (
        <FormModal
            title="Create your account"
            onSubmit={handleSubmit(onSubmit)}
            submitButtonLabel="Click to signup"
            body={bodyContent}
            footer={footerContent}
            disabled={isLoading}
        />
    )
}



export default SignUpPage