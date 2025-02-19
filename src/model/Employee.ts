export class Employee {
    employeeID !: string;
    fullName !: string;
    email !: string;
    phoneNumber ?: string;
    role !: string;
    salary ?: number; // Decimal values can be represented as numbers in TypeScript
    hireDate ?: Date;
    createdAt !: Date;
  
    // Additional Report Fields
    reportType!: string;
    guestId!: string;
    description!: string;
  }
  