import { Button } from "../ui/button";

type FormContentButtonProps = {
    name: string;
    onClickMore?: () => void;
};

export default function FormContentButton({
    name,
    onClickMore,
}: FormContentButtonProps) {
    return (
        <Button
            type="button"
            className="bg-btnColor rounded-xl w-20 place-self-end font-semibold"
            onClick={onClickMore}
        >
            {name}
        </Button>
    );
}
