export default function EducationalExp({ edu }: any) {
    return (
        <section>
            <h1 className="text-base font-semibold">Educational Experience</h1>
            <div className="border border-black my-2"></div>
            <div className="flex justify-between">
                <div className="font-semibold">
                    <p>{edu.schoolname}</p>
                    <p className="italic">{edu.studytitle}</p>
                </div>
                <div className="italic">
                    <p>Start Year - {edu.startyear}</p>
                    <p>End Year - {edu.endyear}</p>
                </div>
            </div>
        </section>
    );
}
