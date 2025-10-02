'use client';

import { Bank } from "@/data/bank/account";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UserAccountData } from "../FormSchema/FormSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { bankAccountData } from "@/data/bank/account";

interface OpeningBankAccount extends Bank {
  control: Control<UserAccountData>;
}

export function BankData({
  name,
  type,
  label,
  placeholder,
  required,
  control,
}: OpeningBankAccount) {
  switch (type) {
    case "text":
    case "number":
      return (
        <FormField
          control={control}
          name={name as keyof UserAccountData}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  required={required}
                  type={type}
                  readOnly={name === "accountNo" || name === "bvn"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "select":
      return (
        <FormField
          control={control}
          name={name as keyof UserAccountData}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-shadow-violet-50">{label}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue className="text-white" placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent
                    className="h-[24vh]"
                    side="bottom"
                    position="popper"
                  >
                    {bankAccountData
                      .find((el) => el.name === name)
                      ?.options?.map((item, i) => (
                        <SelectItem key={i} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    default:
      return null;
  }
}