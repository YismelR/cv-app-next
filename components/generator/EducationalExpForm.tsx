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
    schoolname: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    studytitle: z.string().min(2, {
        message: "Study title must be at least 2 characters.",
    }),
    startyear: z.string().min(2, {
        message: "Start date must be at least 2 characters.",
    }),
    endyear: z.string().min(2, {
        message: "End date must be at least 2 characters.",
    }),
});
export default function EducationalExpForm({
    setEducation,
    eduData,
    setIsSavedEdu,
}: any) {
    const { toast } = useToast();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: eduData,
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setEducation(values);
        setIsSavedEdu(true);
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
                    name="schoolname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">
                                School Name
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
                    name="studytitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">
                                Title of Study
                            </FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-8">
                    <FormField
                        control={form.control}
                        name="startyear"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-lg">
                                    Start Year
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endyear"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-lg">
                                    End Year
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
