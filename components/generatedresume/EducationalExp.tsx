type EducationalExpProps = {
    eduData: Array<{
        schoolname: string;
        studytitle: string;
        startyear: string;
        endyear: string;
    }>;
};
export default function EducationalExp({ eduData }: EducationalExpProps) {
    console.log(eduData);
    return (
        <section>
            <h1 className="text-base font-semibold">Educational Experience</h1>
            <div className="border border-black my-2"></div>
            <div className="flex flex-col gap-4">
                {eduData.map((edu, idx) => (
                    <div key={idx} className="flex justify-between">
                        <div className="font-semibold">
                            <p>{edu.schoolname}</p>
                            <p className="italic">{edu.studytitle}</p>
                        </div>
                        <div className="italic">
                            <p>Start Year - {edu.startyear}</p>
                            <p>End Year - {edu.endyear}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
