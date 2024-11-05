import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {SyndicForm} from "@/app/components/form/form";
import Link from "next/link";
import {getOpinions} from "@/app/components/form/actions/getOpinions";

export default async function Home() {
    const opinions = await getOpinions()

    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen md:p-8 p-4 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
                {
                    opinions.length > 0 && (
                <Link href={"/"} className={'w-full text-center text-sm hover:underline'}>
                    {`Voir les résultats (${opinions.length})`}
                </Link>)
                }
                <Card>
                    <CardHeader>
                        <CardTitle>Votre opinion pour un changement de Syndic</CardTitle>
                        <CardDescription>
                            Soyez libre de vous exprimer concernant SAFI Méditerranée.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SyndicForm/>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
