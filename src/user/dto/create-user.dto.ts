export class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role?: string;       
    isVerified?: boolean; 
    googleId?: string;   
  }
  