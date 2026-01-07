export interface SubjectMaster {
  subId?: number;
  subName?: string;
  createdBy?: string;
  // Send DateOnly as "YYYY-MM-DD" string to match server
  createdOn?: string | null;
  updatedBy?: string | null;
  updatedOn?: string | null;
  isActive?: string;
  isDeleted?: string;

}
