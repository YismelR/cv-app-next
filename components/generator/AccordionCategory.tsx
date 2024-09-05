import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import GeneralInfoForm from "./GeneralInfoForm";
import EducationalExpForm from "./EducationalExpForm";
import PracticalExpForm from "./PracticalExpForm";
import FormContentButton from "./FormContentButton";

export default function AccordionCategory({
    formSetter,
    eduSetter,
    expSetter,
    expData,
    eduData,
    formData,
    setIsSavedInfo,
    setIsSavedEdu,
    setIsSavedExp,
}: any) {
    return (
        <>
            <Accordion
                type="single"
                collapsible
                className="w-full flex flex-col gap-8"
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger>General Information</AccordionTrigger>
                    <AccordionContent>
                        <GeneralInfoForm
                            setTheInfo={formSetter}
                            formData={formData}
                            setIsSavedInfo={setIsSavedInfo}
                        />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Educational Experience</AccordionTrigger>
                    <AccordionContent>
                        <EducationalExpForm
                            setEducation={eduSetter}
                            eduData={eduData}
                            setIsSavedEdu={setIsSavedEdu}
                        />
                        <FormContentButton name="Add More" />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Practical Experience</AccordionTrigger>
                    <AccordionContent>
                        <PracticalExpForm
                            setExperience={expSetter}
                            expData={expData}
                            setIsSavedExp={setIsSavedExp}
                        />
                        <FormContentButton name="Add More" />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
}
