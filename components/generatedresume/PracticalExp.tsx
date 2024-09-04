import ResponsibilityList from "./ResponsibilityList";

export default function PracticalExp({ exp }: any) {
    return (
        <section>
            <h1 className="text-base font-semibold">Practical Experience</h1>
            <div className="border border-black my-2"></div>
            <div className="flex flex-col gap-3">
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
        </section>
    );
}
