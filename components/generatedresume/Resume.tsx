import EducationalExp from "@/components/generatedresume/EducationalExp";
import GeneralInfo from "@/components/generatedresume/GeneralInfo";
import PracticalExp from "@/components/generatedresume/PracticalExp";
import { Key } from "react";
export default function Resume({ formData, eduData, expData }: any) {
    return (
        <main className="bg-resumeBG flex flex-col text-black w-full p-10 text-xs gap-8 h-full">
            <GeneralInfo info={formData} />
            <EducationalExp eduData={eduData} />
            <PracticalExp expData={expData} />
        </main>
    );
}
