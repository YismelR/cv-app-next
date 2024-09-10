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
import { useToast } from "@/hooks/use-toast";
import FormContentButton from "./FormContentButton";
import DatePicker from "./DatePicker";

const educationSchema = z
    .object({
        schoolname: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        studytitle: z.string().min(2, {
            message: "Study title must be at least 2 characters.",
        }),
        startyear: z.date().refine(startyear => startyear instanceof Date, {
            message: "Start year must be at least 2 characters.",
        }),
        endyear: z.date().refine(endyear => endyear instanceof Date, {
            message: "End year must be at least 2 characters.",
        }),
    })
    .refine(data => data.startyear < data.endyear, {
        message: "End year must be after start year.",
        path: ["endyear"],
    });

const formSchema = z.object({
    educations: z.array(educationSchema),
});

type EducationalExpFormProps = {
    setEducation: (
        educations: Array<{
            schoolname: string;
            studytitle: string;
            startyear: Date;
            endyear: Date;
        }>
    ) => void;
    eduData: Array<{
        schoolname: string;
        studytitle: string;
        startyear: Date;
        endyear: Date;
    }>;
    setIsSavedEdu: (saved: boolean) => void;
};

export default function EducationalExpForm({
    setEducation,
    eduData,
    setIsSavedEdu,
}: EducationalExpFormProps) {
    const { toast } = useToast();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            educations:
                eduData && eduData.length
                    ? eduData
                    : [
                          {
                              schoolname: "",
                              studytitle: "",
                              startyear: new Date(),
                              endyear: new Date(),
                          },
                      ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "educations",
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        setEducation(values.educations);
        setIsSavedEdu(true);
        toast({
            title: "Successfully Saved",
            description: "Friday, February 10, 2023 at 5:57 PM",
        });
    }

    const handleAddMore = () => {
        append({
            schoolname: "",
            studytitle: "",
            startyear: new Date(),
            endyear: new Date(),
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
                            name={`educations.${idx}.schoolname`}
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
                            name={`educations.${idx}.studytitle`}
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
                                name={`educations.${idx}.startyear`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col w-full">
                                        <FormLabel className="font-semibold text-lg">
                                            Start Year
                                        </FormLabel>
                                        <DatePicker
                                            date={field.value}
                                            setDate={date =>
                                                form.setValue(
                                                    `educations.${idx}.startyear`,
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
                                name={`educations.${idx}.endyear`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-col w-full">
                                        <FormLabel className="font-semibold text-lg">
                                            End Year
                                        </FormLabel>
                                        <DatePicker
                                            date={field.value}
                                            setDate={date =>
                                                form.setValue(
                                                    `educations.${idx}.endyear`,
                                                    date ? date : new Date()
                                                )
                                            }
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
