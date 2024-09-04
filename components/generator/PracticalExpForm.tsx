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
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
    companyname: z.string().min(2, {
        message: "Company name must be at least 2 characters.",
    }),
    positiontitle: z.string().min(2, {
        message: "Position title must be at least 2 characters.",
    }),
    startdate: z.string().min(2, {
        message: "Start date must be at least 2 characters.",
    }),
    enddate: z.string().min(2, {
        message: "End date must be at least 2 characters.",
    }),
    workdescription: z.string().min(2, {
        message: "Main Responsibilities must be at least 2 characters.",
    }),
});
export default function PracticalExpForm({
    setExperience,
    expData,
    setIsSavedExp,
}: any) {
    const { toast } = useToast();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: expData,
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setExperience(values);
        setIsSavedExp(true);
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
                    name="companyname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">
                                Company Name
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
                    name="positiontitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">
                                Position Title
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
                        name="startdate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-lg">
                                    Start Date
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="MM/YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="enddate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-lg">
                                    End Date
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="MM/YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="workdescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold text-lg">
                                Main Responsibilities
                            </FormLabel>
                            <FormControl>
                                <Textarea placeholder="" {...field} />
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
