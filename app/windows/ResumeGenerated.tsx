import SubmitButton from "@/components/generator/SubmitButton";
import Resume from "@/components/generatedresume/Resume";
import { useRef } from "react";
import { renderToString } from "react-dom/server";

export default function ResumeGenerated({
    formData,
    eduData,
    expData,
    setCurrent,
}: any) {
    const componentRef = useRef<HTMLDivElement>(null);
    function handleEdit() {
        setCurrent("form");
    }

    async function handleDownload() {
        if (!componentRef.current) {
            return;
        }
        const content = renderToString(
            <Resume formData={formData} eduData={eduData} expData={expData} />
        );
        try {
            const response = await fetch("/api/generate-pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ html: content }),
            });

            if (!response.ok) {
                throw new Error("PDF generation failed");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "resume.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="bg-backgroundCardColor flex flex-col gap-10 my-8 p-8 rounded-2xl w-[600px] min-h-full">
            <h1 className="font-bold text-3xl place-self-center">
                CV/Resume Generated
            </h1>
            <div ref={componentRef}>
                <Resume
                    formData={formData}
                    eduData={eduData}
                    expData={expData}
                />
            </div>
            <footer className="flex justify-between mt-auto">
                <SubmitButton name="Edit" onSubmit={handleEdit} />
                <SubmitButton name="Download" onSubmit={handleDownload} />
            </footer>
        </div>
    );
}
