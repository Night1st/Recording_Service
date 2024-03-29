import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/shared/components/common/ui/badge";
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/shared/components/common/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { FormField, FormItem, FormLabel } from "../ui/form";

type Framework = Record<"value" | "label", string>;

type Props = {
    form: any
    fieldName: string
    label?: string
    placeHolder?: string
    options?: { value: any, label: string }[]
    // defaultValue?: { value: any, label: string }[]
}

export function InputMultiSelect({ form, label, placeHolder, fieldName, options = [] }: Props) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<Framework[]>([]);
    const [inputValue, setInputValue] = React.useState("");
    React.useEffect(() => {
        console.log('func run')
        setSelected(options.filter(item => form.getValues()[fieldName]?.includes(item.value)) || [])
    }, [form, options])

    const handleUnselect = (framework: Framework) => {
        // console.log(selected, selected.filter(s => s.value !== framework.value).map(item => item.value))
        form.setValue(fieldName, selected.filter(s => s.value !== framework.value).map(item => item.value))
        setSelected(prev => prev.filter(s => s.value !== framework.value));
    };

    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current
        if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
                if (input.value === "") {
                    setSelected(prev => {
                        const newSelected = [...prev];
                        newSelected.pop();
                        return newSelected;
                    })
                }
            }
            // This is not a default behaviour of the <input /> field
            if (e.key === "Escape") {
                input.blur();
            }
        }
    }, []);

    const selectables = React.useMemo(() => options.filter(framework => !selected.map(item => item.value).includes(framework.value)), [selected, options]);

    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem >
                    {label && <FormLabel className='capitalize text-base'>{label}:</FormLabel>}
                    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
                        <div
                            className="group border border-input px-3 py-2.5 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                        >
                            <div className="flex gap-1 flex-wrap">
                                {selected.map((framework) => {
                                    return (
                                        <Badge key={framework?.value} variant="secondary">
                                            {framework?.label}
                                            <button
                                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleUnselect(framework);
                                                    }
                                                }}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                onClick={() => handleUnselect(framework)}
                                            >
                                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                            </button>
                                        </Badge>
                                    )
                                })}
                                {/* Avoid having the "Search" Icon */}
                                <CommandPrimitive.Input
                                    ref={inputRef}
                                    value={inputValue}
                                    onValueChange={setInputValue}
                                    onBlur={() => setOpen(false)}
                                    onFocus={() => setOpen(true)}
                                    placeholder={placeHolder}
                                    className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                                />
                            </div>
                        </div>
                        <div className="relative mt-2">
                            {open && selectables.length > 0 ?
                                <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                    <CommandGroup className="max-h-[300px] overflow-auto">
                                        {selectables.map((framework) => {
                                            return (
                                                <CommandItem
                                                    key={framework.value}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    onSelect={(value) => {
                                                        setInputValue("")
                                                        setSelected(prev => [...prev, framework])
                                                        form.setValue(fieldName, [...selected, framework].map(item => item.value))
                                                    }}
                                                    className={"cursor-pointer"}
                                                >
                                                    {framework.label}
                                                </CommandItem>
                                            );
                                        })}
                                    </CommandGroup>
                                </div>
                                : null}
                        </div>
                    </Command >
                </FormItem>
            )}
        />
    )
}