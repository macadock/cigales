import {db, Opinion, opinionsTable,} from "@/db";

export function getOpinions(): Promise<Array<Opinion>> {
    return db.select().from(opinionsTable)
}