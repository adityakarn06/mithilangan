import { serve } from "inngest/next";
import { inngest } from "@/config/inngest/client";
import { syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
  ],
});
