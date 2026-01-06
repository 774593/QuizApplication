export interface OrganizationMaster {
  organizationId?: number;
  regNo?: string;
  orgName?: string;
  city?: string;
  regDate?: Date;
  contactPersonFname: string;
  contactPersonLname: string;
  address: string;
  state: string;
  contactNo: number;
  alterNetNo: number;
  email: string;
  logoPath: number;
  createdBy: string;
  createdOn: Date;
  updatedBy: string;
  updatedOn: Date;
  isActive: string;
  isDeleted: string;
  

  // add other fields if present on the server model
}
