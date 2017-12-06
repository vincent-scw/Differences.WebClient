export interface User {
  id: string;
  displayName: string;
  jobTitle?: string;
  emails: string[];
  roles?: string[];
  avatarUrl?: string;
}
