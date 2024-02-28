import { cn } from "@/lib/utils";
import { Button } from "./button"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { CheckIcon } from "lucide-react";
import { Separator } from "./separator";
import { Badge } from "./badge";

interface MultiSelectMenuProps {
    title: string;
    values: string[];
    onChange: (values: string[]) => void;
    options: {
        name: string;
        value: string;
    }[]
}

const MultiSelectMenu: React.FC<MultiSelectMenuProps> = ({
    title,
    values,
    onChange,
    options,
}) => {
    console.log(values)
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[200px] p-0">
                    {title}
                    {values?.length > 0 &&
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {values.length}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {values.length > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {values.length} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => values.includes(option.value))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.name}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>
                            No results found.
                        </CommandEmpty>
                        {options.map((option) => {
                            const isSelected = values.includes(option.value);
                            return (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => {
                                        if (isSelected) {
                                            onChange(values.filter((val) => val !== option.value))
                                        } else {
                                            onChange([...values, option.value])
                                        }
                                    }}
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            isSelected
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                        )}
                                    >
                                        <CheckIcon className={cn("h-4 w-4")} />
                                    </div>
                                    <span>{option.name}</span>
                                </CommandItem>
                            )
                        })}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default MultiSelectMenu