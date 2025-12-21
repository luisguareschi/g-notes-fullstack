"use client";
import { Button } from "@/components/ui/button";
import {
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
import { IOSFormCard } from "./ios-form/ios-form-card";
import { IOSInput } from "./ios-form/ios-input";

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
            <IOSFormCard>
              <IOSInput
                label="Full Name"
                placeholder="John Doe"
                hideCard
                inputProps={{
                  ...register("name"),
                }}
              />
              <IOSInput
                label="Email"
                placeholder="example@gmail.com"
                hideCard
                inputProps={{
                  ...register("email"),
                  type: "email",
                }}
              />
              <IOSInput
                label="Username"
                placeholder="john_doe"
                hideCard
                inputProps={{
                  ...register("username"),
                }}
              />
              <IOSInput
                label="Password"
                placeholder="Required"
                hideCard
                inputProps={{
                  ...register("password"),
                  type: "password",
                }}
              />
            </IOSFormCard>
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
