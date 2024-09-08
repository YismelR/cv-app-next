import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import FormContentButton from "./FormContentButton";
import DatePicker from "@/components/generator/DatePicker";

const experienceSchema = z
    .object({
        companyname: z.string().min(2, {
            message: "Company name must be at least 2 characters.",
        }),
        positiontitle: z.string().min(2, {
            message: "Position title must be at least 2 characters.",
        }),
        startdate: z.date().refine(startdate => startdate instanceof Date, {
            message: "Start date must be at least 2 characters.",
        }),
        enddate: z.date().refine(enddate => enddate instanceof Date, {
            message: "End date must be at least 2 characters.",
        }),
        workdescription: z.string().min(2, {
            message: "Main Responsibilities must be at least 2 characters.",
        }),
    })
    .refine(data => data.startdate < data.enddate, {
        message: "End date must be after start date.",
        path: ["enddate"],
    });

const formSchema = z.object({
    experiences: z.array(experienceSchema),
});

type PracticalExpFormProps = {
    setExperience: (
        experiences: Array<{
            companyname: string;
            positiontitle: string;
            startdate: Date;
            enddate: Date;
            workdescription: string;
        }>
    ) => void;
    expData: Array<{
        companyname: string;
        positiontitle: string;
        startdate: Date;
        enddate: Date;
        workdescription: string;
    }>;
    setIsSavedExp: (saved: boolean) => void;
};
export default function PracticalExpForm({
    setExperience,
    expData,
    setIsSavedExp,
}: PracticalExpFormProps) {
    const { toast } = useToast();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            experiences:
                expData && expData.length
                    ? expData
                    : [
                          {
                              companyname: "",
                              positiontitle: "",
                              startdate: new Date(),
                              enddate: new Date(),
                              workdescription: "",
                          },
                      ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "experiences",
    });
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setExperience(values.experiences);
        setIsSavedExp(true);
        toast({
            title: "Successfully Saved",
            description: "Friday, February 10, 2023 at 5:57 PM",
        });
    }

    const handleAddMore = () => {
        append({
            companyname: "",
            positiontitle: "",
            startdate: new Date(),
            enddate: new Date(),
            workdescription: "",
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 pt-8 w-2/3"
            >
                {fields.map((field, idx) => (
                    <div key={field.id}>
                        <FormField
                            control={form.control}
                            name={`experiences.${idx}.companyname`}
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
                            name={`experiences.${idx}.positiontitle`}
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
                                name={`experiences.${idx}.startdate`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col w-full">
                                        <FormLabel className="font-semibold text-lg">
                                            Start Date
                                        </FormLabel>
                                        <DatePicker
                                            date={field.value}
                                            setDate={date =>
                                                form.setValue(
                                                    `experiences.${idx}.startdate`,
                                                    date ? date : new Date()
                                                )
                                            }
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`experiences.${idx}.enddate`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col w-full">
                                        <FormLabel className="font-semibold text-lg">
                                            End Date
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                date={field.value}
                                                setDate={date =>
                                                    form.setValue(
                                                        `experiences.${idx}.enddate`,
                                                        date ? date : new Date()
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name={`experiences.${idx}.workdescription`}
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
                        {fields.length > 1 && (
                            <Button type="button" onClick={() => remove(idx)}>
                                Remove
                            </Button>
                        )}
                    </div>
                ))}

                <div className="flex justify-between">
                    <FormContentButton
                        onClickMore={handleAddMore}
                        name="Add More"
                    />
                    <Button
                        type="submit"
                        className="bg-btnColor rounded-xl w-20 place-self-end font-semibold"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
}
