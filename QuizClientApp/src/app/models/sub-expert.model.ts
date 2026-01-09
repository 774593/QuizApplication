export interface SubExpert {
  regNo: string;
  email?: string;
  pwd?: string;
  subExperties?: string;
  regDate: Date;

  firstName: string;

  lastName: string;

  address: string;

  contactNo: string;

  profilePic: string;
  
  createdBy: string;

  createdOn: Date;

  updatedBy: string;

  updatedOn: Date;

  isActive: string;

  isDeleted: string;


  // add other fields if present on the server model
}
