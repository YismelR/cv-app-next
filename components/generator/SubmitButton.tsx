import { Button } from "../ui/button";

type SubmitButtonProps = {
    name: string;
    onSubmit: () => void;
};

export default function SubmitButton({ name, onSubmit }: SubmitButtonProps) {
    return (
        <Button
            type="submit"
            className="place-self-end mt-auto text-2xl bg-btnColor rounded-xl w-[148px] h-[55px]"
            onClick={onSubmit}
        >
            {name}
        </Button>
    );
}
