import {Spectre} from "spectre-orm/dist/spectre";

let conn: Spectre | undefined = undefined;

async function setConnection(connectionString: string): Promise<boolean> {
    try {
        conn = new Spectre(connectionString);
        await conn.strategy.rawQuery("/* ping */ SELECT 1")
    } catch (e) {
        console.error(e)
        conn = undefined
        return false
    }

    return true
}

export {
    conn,
    setConnection
}
