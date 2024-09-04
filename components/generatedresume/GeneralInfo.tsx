export default function GeneralInfo({ info }: any) {
    return (
        <section className="flex flex-col place-items-center gap-1">
            <h2 className="text-lg font-semibold">{info.fullname}</h2>
            <div className="flex">
                <p className="border-r border-black px-2">{info.email}</p>
                <p className="px-2">{info.phonenumber}</p>
            </div>
        </section>
    );
}
