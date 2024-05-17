import { FormFieldDto } from ".";

export interface FeedbackDto {
    _id: string;
    description: string;
    email: string;
    rating: number;
    adminResponse?: 'Like' | 'Dislike' | null; // Admin response can be 'Like', 'Dislike', or not responded (null)
  }
  
  export interface FeedbackInformationFormDto {
    id:FormFieldDto<string>;
    description: FormFieldDto<string>;
    email: FormFieldDto<string>;
    adminResponse: FormFieldDto<string|null>;
    rating: FormFieldDto<number>;
    userID: FormFieldDto<string>;
  }
  