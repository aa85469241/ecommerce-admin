import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { BiCheck } from "react-icons/bi";
import { Button } from "./button";
import { Separator } from "./separator";
import { Badge } from "./badge";
import { FiPlusCircle } from "react-icons/fi";

export type OptionType = {
    name: string;
    value: string;
}

interface MultiSelectProps {
    title: string;
    selected: string[];
    options: OptionType[];
    onChange: (selected: string[]) => void;
    className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
    title,
    options,
    selected,
    onChange,
    className,
}) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="max-w-sm border-2 border-black/40 md:w-full">
                    <FiPlusCircle size={20} className="mr-2" />
                    {title}
                    {selected.length > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selected.length} selected
                            </Badge>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className={className}>
                    <CommandInput placeholder="Search ..." />
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup className='max-h-64 overflow-auto'>
                        {options.map((option) => (
                            <CommandItem
                                key={option.value}
                                onSelect={() => {
                                    const isSelected = selected.includes(option.value);

                                    if (isSelected) {
                                        onChange([...selected.filter((_option) => _option !== option.value)]);
                                    } else {
                                        onChange([...selected, option.value])
                                    }
                                }}
                            >
                                <div
                                    className={cn(
                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                        selected.includes(option.value)
                                            ? "bg-primary text-primary-foreground"
                                            : "opacity-50 [&_svg]:invisible"
                                    )}
                                >
                                    <BiCheck className={cn("h-4 w-4")} />
                                </div>
                                {option.name}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default MultiSelect