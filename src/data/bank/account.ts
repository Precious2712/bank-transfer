export interface Bank {
    name: string;
    type: "text" | "number" | "select";
    label: string;
    placeholder: string;
    required: boolean;
    options?: string[];
}

export const bankAccountData: Bank[] = [
    {
        name: "firstName",
        type: "text",
        label: "Firstname",
        placeholder: "Enter your first name",
        required: true,
    },
    {
        name: "lastName",
        type: "text",
        label: "Lastname",
        placeholder: "Enter your last name",
        required: true,
    },
    {
        name: "middleName",
        type: "text",
        label: "Middlename",
        placeholder: "Enter your middle name",
        required: true,
    },
    {
        name: "gender",
        type: "select",
        label: "Gender",
        placeholder: "Select your gender",
        required: true,
        options: ["male", "female"]
    },
    {
        name: "address",
        type: "text",
        label: "Address",
        placeholder: "Enter your address",
        required: true,
    },
    {
        name: "nationality",
        type: "text",
        label: "Nationality",
        placeholder: "Enter your nationality",
        required: true,
    },
    {
        name: "bankName",
        type: "select",
        label: "Bank Name",
        placeholder: "Select your bank",
        required: true,
        options: [
            "Guaranty Trust Bank (GTBank)",
            "United Bank for Africa (UBA)",
            "Ecobank",
            "AccessBank",
            "Zenith Bank",
            "First Bank of Nigeria",
            "Union Bank of Nigeria",
            "Stanbic IBTC Bank",
            "Fidelity Bank",
            "Sterling Bank",
            "Polaris Bank",
            "Keystone Bank",
            "Wema Bank",
            "Jaiz Bank",
            "Unity Bank",
            "MoniePoint",
            "Opay",
        ]
    },
    {
        name: "accountNo",
        type: "text",
        label: "Account NO",
        placeholder: "Generate bank account no",
        required: true,
    },
    {
        name: "bvn",
        type: "number",
        label: "BVN",
        placeholder: "Enter your BVN",
        required: true,
    }
];