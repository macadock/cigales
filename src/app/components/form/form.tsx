'use client'

import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandGroup, CommandItem, CommandList} from "@/components/ui/command";
import {Checkbox} from "@/components/ui/checkbox";
import {Separator} from "@/components/ui/separator";
import {addOpinion} from "@/app/components/form/actions/addOpinion";

const buildings = [
    { label: "Entrée A", value: "entry-a" },
    { label: "Entrée B", value: "entry-b" },
    { label: "Entrée C", value: "entry-c" },
    { label: "Villas", value: "villas" },
] as const

const statuses = [{
    label: "Propriétaire",
    value: "owner",
}, {
    label: "Locataire",
    value: "tenant",
}] as const

const willingToChange = [{
    label: "Oui",
    value: "yes",
}, {
    label: "Non",
    value: "no",
}, {
    label: "Indécis",
    value: "undecided",
}] as const

const schema = z.object({
    name: z.string().min(1, 'Merci de renseigner votre nom'),
    email: z.string().email('Email invalide'),
    isAnonymous: z.boolean({
        coerce: true,
    }).optional(),
    building: z.enum(buildings.map(building => building.value) as [string, ...string[]], {
        message: 'Merci de renseigner votre bâtiment'
    }),
    status: z.enum(statuses.map(status => status.value) as [string, ...string[]], {
        message: 'Merci de renseigner votre statut'
    }),
    willingToChange: z.enum(willingToChange.map(willing => willing.value) as [string, ...string[]], {
        message: 'Merci de renseigner votre souhait de changement de syndic'
    }),
    message: z.string().optional(),
})


type FormValues = z.infer<typeof schema>

export const SyndicForm = () => {

    const form = useForm<FormValues>({
        mode: 'onBlur',
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            isAnonymous: false,
            email: "",
            building: "",
            status: "",
            willingToChange: "",
            message: "",
        }
    })

    const { formState: { isLoading, isSubmitSuccessful} } = form

    async function onSubmit(values: FormValues) {
        await addOpinion(values)
    }

    if (isSubmitSuccessful) {
        return (
            <div className={'flex flex-col gap-6'}>
                <div className={'text-center'}>
                    <h2 className={'text-2xl font-bold'}>Merci pour votre opinion</h2>
                    <p className={'text-lg'}>Votre opinion a bien été enregistrée</p>
                </div>
            </div>
        )
    }

    return (
        <Form {...form} >
            <form className={'flex flex-col gap-6'} onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} render={({ field }) => (
                <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                        <Input {...field} placeholder={'Nom'} />
                    </FormControl>
                <FormMessage />
                </FormItem>
            )} name={'name'} />
                <FormField control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder={'Email'} />
                        </FormControl>
                        <FormDescription>Pour vous tenir informé de la démarche.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} name={'email'} />
                <div className={'flex flex-col md:flex-row gap-6 md:gap-4'}>
                <FormField control={form.control} render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Bâtiment</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-[250px] justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value
                                            ? buildings.find(
                                                (building) => building.value === field.value
                                            )?.label
                                            : "Sélectionnez un bâtiment"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {buildings.map((building) => (
                                                <CommandItem
                                                    value={building.label}
                                                    key={building.value}
                                                    onSelect={() => {
                                                        form.setValue("building", building.value)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            building.value === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {building.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )} name={'building'} />
                <FormField control={form.control} render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Statut</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-[250px] justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value
                                            ? statuses.find(
                                                (status) => status.value === field.value
                                            )?.label
                                            : "Sélectionnez un statut"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {statuses.map((status) => (
                                                <CommandItem
                                                    value={status.label}
                                                    key={status.value}
                                                    onSelect={() => {
                                                        form.setValue("status", status.value)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            status.value === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {status.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )} name={'status'} />
                </div>
                <Separator />
                <FormField control={form.control} render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Souhait de changer de Syndic</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-[250px] justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                    >
                                        {field.value
                                            ? willingToChange.find(
                                                (item) => item.value === field.value
                                            )?.label
                                            : "Sélectionnez un choix"}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[250px] p-0">
                                <Command>
                                    <CommandList>
                                        <CommandGroup>
                                            {willingToChange.map((item) => (
                                                <CommandItem
                                                    value={item.label}
                                                    key={item.value}
                                                    onSelect={() => {
                                                        form.setValue("willingToChange", item.value)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            item.value === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {item.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )} name={'willingToChange'} />
                <FormField control={form.control} render={({ field }) => (
                    <FormItem>
                        <FormLabel>{"Commentaire libre (points positifs/négatifs ou autre sujet d'attention)"}
                        </FormLabel>
                        <FormControl>
                            <Textarea {...field} placeholder={'Commentaire libre'} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} name={'message'} />
                <Separator />
                <div className={'flex flex-col gap-4'}>
                <FormField control={form.control} render={({ field }) => (
                    <FormItem>
                        <div className={'flex gap-2'}>
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel>Rester anonyme</FormLabel>
                        </div>
                        <FormDescription>Partagez votre opinion de manière anonyme.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} name={'isAnonymous'} />

                <Button type="submit">{
                    isLoading ? "En cours d'envoi..." : 'Envoyer'
                }</Button>
                </div>
            </form>
        </Form>
    )
}