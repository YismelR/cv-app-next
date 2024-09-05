type FormContentButtonProps = {
    name: string;
    onClickMore?: () => void;
};

export default function FormContentButton({
    name,
    onClickMore,
}: FormContentButtonProps) {
    return (
        <div className="flex justify-end w-2/3 pt-4">
            <button
                type="submit"
                className="bg-transparent rounded-xl w-20 place-self-end font-semibold underline hover:text-btnColor"
                onClick={onClickMore}
            >
                {name}
            </button>
        </div>
    );
}
