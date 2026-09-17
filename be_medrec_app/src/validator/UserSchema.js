import * as z from "zod";

const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.enum(["ADMIN", "DOKTER", "PENDAFTARAN"]),
});

export default userSchema;
