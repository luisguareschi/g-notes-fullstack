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
import { useSignIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isPending: isSigningIn } = useSignIn({
    onSuccess: () => {
      toast.success("Login successful");
      router.push("/home");
    },
    onError: (error) => {
      toast.error(error.error.message);
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    signIn({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-ios-gray-500 text-center">
        G Notes
      </h1>
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Unlock Vault</CardTitle>
        <CardDescription className="mt-2">
          Enter your credentials below to unlock your vault
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Card className="py-3 flex gap-2 pl-3 flex-col overflow-hidden">
              <div className="flex gap-2">
                <label htmlFor="email" className="w-20">
                  Email
                </label>
                <input
                  type="email"
                  className="placeholder:text-ios-gray-400 focus:outline-none"
                  placeholder="example@gmail.com"
                  {...register("email")}
                />
              </div>
              <Separator className="ml-22" />
              <div className="flex gap-2">
                <label htmlFor="email" className="w-20">
                  Password
                </label>
                <input
                  type="password"
                  className="placeholder:text-ios-gray-400 focus:outline-none"
                  placeholder="Required"
                  {...register("password")}
                />
              </div>
            </Card>
            <Field>
              <Button type="submit" disabled={isSigningIn}>
                {isSigningIn && <Spinner />}
                Unlock
              </Button>
              <FieldDescription className="text-center">
                <a className="no-underline! text-base text-blue-500 font-medium">
                  Forgot your password?
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </div>
  );
}
