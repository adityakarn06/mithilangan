import { inngest } from "./client";
import prisma from "@/lib/prisma";

// Inngest func to save user to a db (we created the webhook with name 'clerk' thats why we're using clerk/event)
export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
    },
    {
        event: "clerk/user.created",
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const email = email_addresses[0].email_address;
        await prisma.user.create({
            data: {
                id,
                firstName: first_name,
                lastName: last_name,
                name: `${first_name} ${last_name}`,
                email: email,
                imageUrl: image_url,
            }
        })
    }
)

export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {   event: 'clerk/user.updated' },
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const email = email_addresses[0].email_address;
        await prisma.user.update({
            where: {
                id
            },
            data: {
                id,
                firstName: first_name,
                lastName: last_name,
                name: `${first_name} ${last_name}`,
                email: email,
                imageUrl: image_url,
            }
        })
    }
)

export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-from-clerk'
    },
    {   event: 'clerk/user.deleted' },
    async ({event}) => {
        const { id } = event.data;
        await prisma.user.delete({
            where: {
                id
            }
        })
    }
)


// import { NextResponse } from "next/server";
// import { inngest } from "../../../config/inngest/client"; 
// export async function GET() {
//   await inngest.send({
//     name: "test/hello.world",
//     data: {
//       email: "testUser@example.com",
//     },
//   });
//   return NextResponse.json({ message: "Event sent!" });
// }