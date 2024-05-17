import { FeedbackDto, Manager } from "../models";

export const Managers: Manager[] = [
  {
    _id: 1,
    name: "Alice Johnson",
    dob: "1989-04-15", 
    position: "Operations Manager",
    yearsOfExperience: 10,
    department: "Operations",
    address: "123 Oak St, Springfield",
    email: "alice.johnson@teaco.com",
    isActive: true,
    salary: 80000,
    mobileNumber: 9876543210
  },
  {
    _id: 2,
    name: "Bob Smith",
    dob: "1978-08-22",
    position: "Marketing Manager",
    yearsOfExperience: 18,
    department: "Marketing",
    address: "456 Pine Ave, River City",
    email: "bob.smith@teaco.com",
    isActive: true,
    salary: 95000,
    mobileNumber: 9876501234
  },
  {
    _id: 3,
    name: "Carol Tan",
    dob: "1985-03-05",
    position: "Procurement Manager",
    yearsOfExperience: 15,
    department: "Procurement",
    address: "789 Birch Blvd, Lakeview",
    email: "carol.tan@teaco.com",
    isActive: true,
    salary: 90000,
    mobileNumber: 9876401234
  },
  {
    _id: 4,
    name: "David Lee",
    dob: "1994-11-30",
    position: "Quality Control Manager",
    yearsOfExperience: 7,
    department: "Quality Control",
    address: "321 Cedar Rd, Brooktown",
    email: "david.lee@teaco.com",
    isActive: true,
    salary: 78000,
    mobileNumber: 9876301234
  },
  {
    _id: 5,
    name: "Eva Ricci",
    dob: "1982-06-27",
    position: "Sales Manager",
    yearsOfExperience: 12,
    department: "Sales",
    address: "654 Elm St, Highridge",
    email: "eva.ricci@teaco.com",
    isActive: true,
    salary: 86000,
    mobileNumber: 9876201234
  }
];


export const feedbacks: FeedbackDto[] = [
  {
    _id: "FB1001",
    description: "Very good your products",
    email: "user1@example.com",
    rating: 5,
    adminResponse: 'Like' // Admin liked this feedback
  },
  {
    _id: "FB1002",
    description: "Tea is very strong",
    email: "user2@example.com",
    rating: 4,
    adminResponse: 'Dislike' // Admin disliked this feedback
  },
  {
    _id: "FB1003",
    description: "Tea rate is very low",
    email: "user3@example.com",
    rating: 3,
    adminResponse: null // Admin has not responded to this feedback
  },
  {
    _id: "FB1004",
    description: "Not good",
    email: "user4@example.com",
    rating: 1,
    adminResponse: 'Like' // Admin liked this feedback, perhaps in acknowledgement of the issue raised
  },
  // ... more feedback items
];
