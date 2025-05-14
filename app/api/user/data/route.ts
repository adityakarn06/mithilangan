import prisma from '@/lib/prisma'
import { getAuth } from '@clerk/nextjs/server'
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                message: "User not found"})
        }

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}