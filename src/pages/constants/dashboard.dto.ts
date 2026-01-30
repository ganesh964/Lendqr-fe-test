export interface IUser {
  id: number | null
  name: string | null
  email: string | null
  phone: string | null
  status: string | null
  lastName: string | null
  createdAt: string | null
  firstName: string | null
  organization: string | null
}

export interface IUserDetails {
  id: number | null
  firstName: string
  lastName: string | null
  firstNameLower: string | null
  lastNameLower: string | null
  name: string | null
  username: string | null
  email: string | null
  officeEmail: string | null
  phone: string | null
  accountNumber: string | null
  organization: string | null
  status: string | null
  createdAt: string | null
  maritalStatus: string | null
  children: number | null
  residenceType: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  guarantorName: string | null
  guarantorPhone: string | null
  guarantorEmail: string | null
  guarantorRelationship: string | null
  education: IEducation
}

export interface IEducation {
  level: string | null
  employmentStatus: string | null
  sector: string | null
  duration: string | null
  monthlyIncome: string | null
  loanRepayment: string | null
}
