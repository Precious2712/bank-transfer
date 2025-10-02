import { z } from "zod";

export const signupFormSchema = z.object({
  email: z.string().email("Invalid email address").min(3, "Email is required"),
  password: z.string().min(7, 'minimum is 7').max(12, 'maximum is 12'),
  country: z.string().min(2, "Country is required"),
});

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address").min(3, "Email is required"),
  password: z.string().min(7).max(12),
});

export const BankSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  gender: z.enum(["male", "female"]),
  address: z.string(),
  nationality: z.string(),
  bankName: z.enum([
    'Access Bank',
    'Zenith Bank',
    'First Bank of Nigeria',
    'United Bank for Africa (UBA)',
    'Guaranty Trust Bank (GTBank)',
    'Union Bank of Nigeria',
    'Stanbic IBTC Bank',
    'Fidelity Bank',
    'Ecobank Nigeria',
    'Sterling Bank',
    'Polaris Bank',
    'Keystone Bank',
    'Wema Bank',
    'Jaiz Bank',
    'Unity Bank'
  ]),
  accountNo: z.string(),
  bvn: z.number()
})

export type UserAccountData = z.infer<typeof BankSchema>
export type Signup = z.infer<typeof signupFormSchema>;
export type Login = z.infer<typeof loginFormSchema>;