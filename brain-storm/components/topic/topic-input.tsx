"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Plus } from "lucide-react";

interface TopicInputProps {
    apiUrl: string;
    query: Record<string, any>;
    name: string;
}

const formSchema = z.object({
    content: z.string().min(1),
});

export const TopicInput = ({
    apiUrl,
    query,
    name
}: TopicInputProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        console.log(value);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button
                                        type="button"
                                        onClick={() => {}}
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 hover:bg-zinc-600 transition rounded-full p-1 flex items-center justify-center"
                                    >
                                        <Plus className="text-white"/>
                                    </button>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}