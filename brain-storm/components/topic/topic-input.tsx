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
import axios from "axios";
import qs from "query-string";

import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

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
    const { onOpen } = useModal();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });

            await axios.post(url, values);
        }catch(error){
            console.log(error);
        }
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
                                        onClick={() => onOpen("messageFile", { apiUrl, query})}
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 hover:bg-zinc-600 transition rounded-full p-1 flex items-center justify-center"
                                    >
                                        <Plus className="text-white"/>
                                    </button>
                                    <Input 
                                        disabled={isLoading}
                                        className="px-14 py-6 bg-zinc-200 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600"
                                        placeholder="Enter message here"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}