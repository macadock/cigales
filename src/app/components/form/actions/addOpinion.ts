'use server'

import {AddOpinionDto, db, opinionsTable} from "@/db";
import {revalidatePath} from "next/cache";

export const addOpinion = async (opinion: AddOpinionDto) => {
    await db.insert(opinionsTable).values(opinion).execute()
    revalidatePath('/')
}