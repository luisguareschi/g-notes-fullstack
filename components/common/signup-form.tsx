"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { useSignUp } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  name: z.string().min(1, "Name is required"),
  password: z.string().min(1, "Password is required"),
  username: z.string().min(1, "Username is required"),
});

export function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      username: "",
    },
  });
  const { mutate: signUp, isPending: isSigningUp } = useSignUp({
    onSuccess: () => {
      toast.success("Account created successfully");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    signUp({
      email: data.email,
      name: data.name,
      password: data.password,
      username: data.username,
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-ios-gray-500 text-center">
        G Notes
      </h1>
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Create Vault</CardTitle>
        <CardDescription className="mt-2">
          Enter your information below to create your vault
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Card className="py-3 flex gap-2 pl-3 flex-col overflow-hidden">
              <div className="flex gap-2">
                <label htmlFor="name" className="w-20">
                  Full Name
                </label>
                <input
                  type="text"
                  className="placeholder:text-ios-gray-400 focus:outline-none bg-transparent"
                  placeholder="John Doe"
                  {...register("name")}
                />
              </div>
              <Separator className="ml-22" />
              <div className="flex gap-2">
                <label htmlFor="email" className="w-20">
                  Email
                </label>
                <input
                  type="email"
                  className="placeholder:text-ios-gray-400 focus:outline-none bg-transparent"
                  placeholder="example@gmail.com"
                  {...register("email")}
                />
              </div>
              <Separator className="ml-22" />
              <div className="flex gap-2">
                <label htmlFor="username" className="w-20">
                  Username
                </label>
                <input
                  type="text"
                  className="placeholder:text-ios-gray-400 focus:outline-none bg-transparent"
                  placeholder="john_doe"
                  {...register("username")}
                />
              </div>
              <Separator className="ml-22" />
              <div className="flex gap-2">
                <label htmlFor="password" className="w-20">
                  Password
                </label>
                <input
                  type="password"
                  className="placeholder:text-ios-gray-400 focus:outline-none bg-transparent"
                  placeholder="Required"
                  {...register("password")}
                />
              </div>
            </Card>
            <Field>
              <Button type="submit" disabled={isSigningUp}>
                {isSigningUp && <Spinner />}
                Create Account
              </Button>
              <FieldDescription className="text-center">
                <a
                  className="no-underline! text-base text-blue-500 font-medium"
                  href="/login"
                >
                  Already have an account? Sign in
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </div>
  );
}
