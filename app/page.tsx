"use client";
import { Toaster } from "@/components/ui/toaster";
import CVGenerator from "./windows/CVGenerator";
import ResumeGenerated from "./windows/ResumeGenerated";
import { useState } from "react";

function App() {
    const [currentPage, setCurrentPage] = useState("form");
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
    });
    const [eduData, setEduData] = useState<
        Array<{
            schoolname: string;
            studytitle: string;
            startyear: string;
            endyear: string;
        }>
    >([]);
    const [expData, setExpData] = useState<
        Array<{
            companyname: string;
            positiontitle: string;
            startdate: Date;
            enddate: Date;
            workdescription: string;
        }>
    >([]);
    const [isSavedInfo, setIsSavedInfo] = useState(false);
    const [isSavedEdu, setIsSavedEdu] = useState(false);
    const [isSavedExp, setIsSavedExp] = useState(false);

    return (
        <div className="min-h-full bg-[#111827] flex place-content-center text-white">
            {currentPage === "form" && (
                <CVGenerator
                    setForm={setFormData}
                    eduData={eduData}
                    formData={formData}
                    expData={expData}
                    setEdu={setEduData}
                    setExp={setExpData}
                    setCurrent={setCurrentPage}
                    isSavedInfo={isSavedInfo}
                    isSavedEdu={isSavedEdu}
                    isSavedExp={isSavedExp}
                    setIsSavedInfo={setIsSavedInfo}
                    setIsSavedEdu={setIsSavedEdu}
                    setIsSavedExp={setIsSavedExp}
                />
            )}
            {currentPage === "resume" && (
                <ResumeGenerated
                    formData={formData}
                    eduData={eduData}
                    expData={expData}
                    setCurrent={setCurrentPage}
                />
            )}
            <Toaster />
        </div>
    );
}

export default App;
