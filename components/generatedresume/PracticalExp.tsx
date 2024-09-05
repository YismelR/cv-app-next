import ResponsibilityList from "./ResponsibilityList";

type PracticalExpProps = {
    expData: Array<{
        companyname: string;
        positiontitle: string;
        startdate: string;
        enddate: string;
        workdescription: string;
    }>;
};
export default function PracticalExp({ expData }: PracticalExpProps) {
    return (
        <section>
            <h1 className="text-base font-semibold">Practical Experience</h1>
            <div className="border border-black my-2"></div>
            <div className="flex flex-col gap-4">
                {expData.map((exp, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between">
                            <div className="font-semibold">
                                <p>{exp.companyname}</p>
                                <p className="italic">{exp.positiontitle}</p>
                            </div>
                            <div className="italic">
                                <p>Start Date: {exp.startdate}</p>
                                <p>End Date: {exp.enddate}</p>
                            </div>
                        </div>
                        <ResponsibilityList listExp={exp} />
                    </div>
                ))}
            </div>
        </section>
    );
}
