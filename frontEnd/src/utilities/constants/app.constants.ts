import { ManagerPositionsTypes } from "../models";

export const ALERT_CONFIGS = {
  TIMEOUT: 4000,
  AUTO_CLEAR: true,
};
export const APP_TABLE_CONFIGS = {
  DEFAULT_ROWS_PER_PAGE_OPTIONS: [5, 10, 15, 25, 50, 100],
  DEFAULT_ROWS_PER_PAGE: 5,
  DATE_FORMAT: "YYYY-MM-DD HH:mm",
  DATE_TIME_FILTERATION_KEYS: [
    "Last 30 minute",
    "Last hour",
    "Last 6 hours",
    "Last 12 hours",
    "Last 24 hours",
    "Last week",
  ],
};
export const PAGINATIONS_LIMIT = {
  DEFAULT_PAGINATION_LIMIT: 50,
};
export const USER_ROLES = {
  BackOffice: 1,
  Travel_Agent: 2,
};
export const TicketType = [
  { id: 1, name: "1st class" },
  { id: 2, name: "2nd class" },
  { id: 3, name: "3rd class" },
];
export const Manager_SCREEN_MODES = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  VIEW: "VIEW",
  DELETE: "DELETE",
};
export const ManagerPositions:ManagerPositionsTypes[] = [
  { positionID: 1, positionName: "Cultivation Manager", department: "Cultivation" },
  { positionID: 2, positionName: "Harvesting Manager", department: "Harvesting" },
  { positionID: 3, positionName: "Processing Manager", department: "Processing" },
  { positionID: 4, positionName: "Quality Control Manager", department: "Quality Control" },
  { positionID: 5, positionName: "R&D Manager", department: "Research and Development" },
  { positionID: 6, positionName: "Packaging Manager", department: "Packaging" },
  { positionID: 7, positionName: "Logistics Manager", department: "Logistics" },
  { positionID: 8, positionName: "Sales Manager", department: "Sales and Marketing" },
  { positionID: 9, positionName: "Marketing Manager", department: "Sales and Marketing" },
  { positionID: 10, positionName: "HR Manager", department: "Human Resources" },
  { positionID: 11, positionName: "Finance Manager", department: "Finance" },
  { positionID: 12, positionName: "Procurement Manager", department: "Procurement" },
  { positionID: 13, positionName: "IT Manager", department: "Information Technology" },
  { positionID: 14, positionName: "Legal Manager", department: "Legal" },
  { positionID: 15, positionName: "Customer Service Manager", department: "Customer Service" },
  { positionID: 16, positionName: "Export Manager", department: "Export" }
];

export const Departments = [
  { label: "Cultivation", value: "cultivation" },
  { label: "Harvesting", value: "harvesting" },
  { label: "Processing", value: "processing" },
  { label: "Quality Control", value: "quality_control" },
  { label: "Research and Development", value: "research_development" },
  { label: "Packaging", value: "packaging" },
  { label: "Logistics", value: "logistics" },
  { label: "Sales and Marketing", value: "sales_marketing" },
  { label: "Human Resources", value: "human_resources" },
  { label: "Finance", value: "finance" },
  { label: "Procurement", value: "procurement" },
  { label: "Information Technology", value: "information_technology" },
  { label: "Legal", value: "legal" },
  { label: "Customer Service", value: "customer_service" },
  { label: "Export", value: "export" }
];
  