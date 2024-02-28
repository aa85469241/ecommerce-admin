'use client';

import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai"
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form"
import FormModal from '@/components/modals/FormModal'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid Email." }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    }).max(16),
})

type FormValues = z.infer<typeof formSchema>

const SignInPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange"
    })

    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);

        if (!values.email || !values.password) {
            return;
        }

        await signIn("credentials", {
            ...values,
            redirect: true,
            callbackUrl: "/"
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("Login successful!!");
            }

            if (callback?.error) {
                toast.error("Login failed!!")
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-2 mb-2">
            <div className="space-y-1">
                <Label className="pl-1 tracking-wider">Email</Label>
                <Input
                    type="email"
                    placeholder="email"
                    className="focus-visible:ring-offset-0 border-neutral-400"
                    disabled={isLoading}
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
                    type="password"
                    placeholder="password"
                    className="focus-visible:ring-offset-0 border-neutral-400"
                    disabled={isLoading}
                    {...register("password", { required: true })}
                />
                <p className={`
                error-message
                ${errors.password ? "translate-y-0" : "-translate-y-4"}
                ${errors.password ? "opacity-100" : "opacity-0"}
                `}>
                    {errors.password?.message}
                </p>
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
                    Do not have an account?
                    <Link href="/sign-up">
                        <span className="
                            ml-1 
                            font-normal 
                            text-neutral-700
                            hover:font-bold
                            "
                        >
                            Register now.
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    )

    return (
        <FormModal
            title="Sign In"
            onSubmit={handleSubmit(onSubmit)}
            submitButtonLabel="Click to Login"
            disabled={isLoading}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default SignInPage