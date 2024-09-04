import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    fullname: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email().min(2, {
        message: "Email must be at least 2 characters.",
    }),
    phonenumber: z.string().min(2, {
        message: "Phone number must be at least 2 characters.",
    }),
});

export default function GeneralInfoForm({
    setTheInfo,
    formData,
    setIsSavedInfo,
}: any) {
    const { toast } = useToast();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formData,
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        setTheInfo(values);
        setIsSavedInfo(true);
        toast({
            title: "Successfully Saved",
            description: "Friday, February 10, 2023 at 5:57 PM",
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 pt-8 w-2/3"
            >
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">
                                Full Name
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">
                                Phone Number
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="bg-btnColor rounded-xl w-20 place-self-end font-semibold"
                >
                    Save
                </Button>
            </form>
        </Form>
    );
}
