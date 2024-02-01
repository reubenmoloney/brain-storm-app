"use client";

import qs from "query-string";
import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Topic name is required"
    }).refine(
        name => name !== "general",
        {
            message: "Topic name cannot be 'general'"
        }
    )
});

export const CreateTopicModal = () => {
    const { isOpen, onClose, type } = useModal();
    const router = useRouter();

    const params = useParams();

    const isModalOpen = isOpen && type === "createTopic";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const url = qs.stringifyUrl({
                url: "/api/topics",
                query: {
                    groupId: params?.groupId
                }
            });
            await axios.post(url, values);

            form.reset();
            router.refresh();
            onClose();
        } catch(error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Create New Topic
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField 
                                control={form.control} 
                                name="name" 
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                            Topic Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text black focus-visible:ring-offset-0"
                                                placeholder="Enter Topic Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant={"default"}>
                                Create
                            </Button>            
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}