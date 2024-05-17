/* eslint-disable no-empty-pattern */
import { TreeItem, treeItemClasses, TreeItemProps } from "@mui/lab";
import {
  alpha,
  Autocomplete,
  Checkbox,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Select,
  styled,
  Switch,
  TableCell,
  tableCellClasses,
  TableRow,
  TextField,
} from "@mui/material";
import "../theme/constants.scss";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../../components/Shared";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
const primaryFontSize = 14;
export const PrimaryTheme = createTheme({
  palette: {
    text: {
      primary: "#000000",
      disabled: "#ffff",
    },
    primary: {
      main: "#dd2126",
    },
    secondary: {
      main: "#274D36",
    },
    success: {
      main: "#00C853",
    },
    error: {
      main: "#FF0001",
    },
    warning: {
      main: "#FFB800",
    },
    background: {
      default: "#274D36", // Set a dark background color
      paper: "rgba(25, 111, 61 , 0.5)", // Set a dark background color for paper elements
    },
  },
  typography: {
    fontFamily: ["Ubuntu", "sans-serif"].join(","),

    fontSize: primaryFontSize,
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightBold: 500,
    body1: {
      fontSize: primaryFontSize,
    },
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "16px",
          "&:last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: "rgba(0, 0, 0, 0.05)",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: "-2px",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "16px",
          paddingTop: "0",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginRight: "0px",
        },
      },
    },
  },
});
export const StickyTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
    backgroundColor: "#274D36",
    color: theme.palette.common.white,
    padding: "15px",
    borderLeft: "1px solid",
    borderColor: "#274D36",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "15px",
    color: theme.palette.common.white,
    backgroundColor: "#274D36",
    borderBottom: "0.01px solid #bfbfbf !important",
  },
  position: "sticky",
  zIndex: 10,
  left: 0,
}));

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop: string) => prop !== "width",
})(({ theme, width }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 14,
    backgroundColor: "#274D36",
    color: theme.palette.common.white,
    padding: "15px",
    borderLeft: "1px solid",
    borderColor: "#5CAD77",
    width: width || "auto",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "15px",
    color: theme.palette.common.white,
    backgroundColor: "#5CAD77",
    borderBottom: "0.01px solid #bfbfbf !important",
    width: width || "auto",
  },
  "&:last-child": {
    position: "sticky",
    right: 0,
    zIndex: 10,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }:any) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const StyledCheckBox = styled(Checkbox)(({ theme }:any) => ({
  "&.MuiCheckbox-colorPrimary": {
    color: theme.palette.common.white,
  },
}));

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    backgroundColor: "#5CAD77",
    color: "white",
    borderColor: "#5CAD77",
  },
  "& .MuiInputLabel-root": {
    color: "white",
    pointerEvents: "none",
  },
  "& .MuiInputLabel-root.Mui-required::after": {
    color: "red",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
    opacity: 1,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#5CAD77",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "#274D36",
    },
    "&.Mui-focused fieldset": {
      color: "white",
      borderColor: "#274D36",
      borderWidth: "2px",
    },
    "& input::placeholder": {
      color: "white",
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "white",
  },
  "& .MuiSvgIcon-root": {
    color: "#274D36", //icon color
  },
  "&.Mui-disabled .MuiOutlinedInput-root": {
    borderColor: "red",
  },
}));

export const StyledSelect = styled(Select)(() => ({
  "& .MuiSelect-root": {
    backgroundColor: "#5CAD77",
    color: "white",
    borderColor: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
    pointerEvents: "none",
  },
  "& .MuiInputLabel-root.Mui-required::after": {
    color: "white",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white", // Set the outline color when the input is focused
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
    opacity: 1,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
      borderWidth: "2px",
    },
    "& input::placeholder": {
      color: "white",
    },
  },
  "& .MuiSelect-icon": {
    color: "white", // icon color
  },
  "&.Mui-disabled .MuiOutlinedInput-root": {
    borderColor: "white",
  },
}));

export const StyledAutocomplete = styled(Autocomplete)(() => ({
  "& .MuiInputBase-root": {
    color: "white",
    backgroundColor: "#0c361c",
    "&:hover": {
      backgroundColor: "#0c361c",
    },
    "&.Mui-focused": {
      backgroundColor: "#0c361c",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#5CAD77",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "& input::placeholder": {
      color: "white",
    },
  },
  "& .MuiAutocomplete-paper": {
    backgroundColor: "#5CAD77",
  },
  "& .MuiAutocomplete-popper": {
    "& .MuiPopper-root": {
      backgroundColor: "#0c361c",
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "white",
  },
}));

export const StyledTimePickerInput = styled(MobileTimePicker)(() => ({
  "& .MuiInputBase-root": {
    color: "white",
    backgroundColor: "#5CAD77",
    "&:hover": {
      backgroundColor: "#5CAD77",
    },
    "&.Mui-focused": {
      backgroundColor: "#5CAD77",
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#5CAD77",
    },
    "&:hover fieldset": {
      borderColor: "##5CAD77",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "&.Mui-error fieldset": {
      borderColor: "red",
    },
    "& input::placeholder": {
      color: "white",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#5CAD77",
    "&.Mui-error": {
      borderColor: "red",
    },
  },
  "& .MuiSvgIcon-root": {
    color: "#5CAD77",
    "&.Mui-error": {
      color: "red",
    },
  },
}));

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    border: '2px solid #5CAD77',
    borderRadius: '22px',
    backgroundColor: '#5CAD77',
    background:"#5CAD77",
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '16px',
      height: '16px',
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: '16px',
    height: '16px',
    margin: '2px',
    // Use the primary color from the theme
  },
  '& .Mui-checked + .MuiSwitch-track': {
    border: '2px solid #00c853',
    backgroundColor: '#00c853',
  },
  '& .Mui-checked .MuiSwitch-thumb': {
    // Set the background color when checked
  },
  '&.Mui-disabled': {
    color: 'yellow',
  },
}));


export const StyledTreeItem = styled((props: TreeItemProps) => (
  // eslint-disable-next-line react/react-in-jsx-scope
  <TreeItem {...props} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  [`& .${treeItemClasses.content}`]: {
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
}));
interface CustomDialogProps extends DialogProps {
  width?: string;
}

export const BootstrapDialog = styled((props: CustomDialogProps) => (
  <Dialog {...props} />
))(({ theme, width }) => ({
  "& .MuiDialogContent-root": {},
  "& .MuiDialogActions-root": {
    paddingBottom: 16,
    paddingTop: 16,
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(75, 75, 75, 0.5);",
  },
  "& .MuiDialog-paper": {
    width: width ? width : "fit-content",
    maxWidth: width ? "none" : "fit-content",
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose(): void;
}
export const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      style={{
        fontWeight: 500,
        fontSize: 16,
        textAlign: "left",
        color: "white",
        backgroundColor: "#274D36",
        border: "2.5px solid #274D36",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...other}
    >
      {children}
      <CustomButton
        isShadow="none"
        icon={<CloseIcon sx={{ backgroundColor: "transparent" }} />}
        onClick={onClose}
        bgColor="transparent"
      />
    </DialogTitle>
  );
};

export const BootstrapDialogContent: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  return (
    <DialogContent
      dividers
      style={{
        backgroundColor: "#5CAD77",
        borderLeft: "2.5px solid #5CAD77",
        borderRight: "2.5px solid #5CAD77",
        padding: "35px 50px",
      }}
    >
      {props.children}
    </DialogContent>
  );
};
export const BootstrapDialogActions: React.FC<{
  children?: React.ReactNode;
}> = (props) => {
  return (
    <DialogActions
      style={{
        backgroundColor: "#274D36",
        border: "2.5px solid #5CAD77",
        padding: "20px 45px",
      }}
    >
      {props.children}
    </DialogActions>
  );
};
export const StyledSelectebleTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "white", // Set the outline color when the input is focused
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white", // Set the border color for the input
  },
  backgroundColor: "#5CAD77",
  "& .MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-popupIndicator":
    {
      color: "white" /* Change the color to your desired color */,
    },
}));

export const StyledStatusApproved = styled("div")(({ theme }) => ({
  color: theme.palette.success.main,
  cursor: "pointer",
}));
export const StyledStatusRejected = styled("div")(({ theme }) => ({
  color: theme.palette.error.main,
  cursor: "pointer",
}));
export const StyledStatusPending = styled("div")(({ theme }) => ({
  color: theme.palette.warning.main,
  cursor: "pointer",
}));
export const StyledStatusDraft = styled("div")(({ theme }) => ({
  color: theme.palette.common.white,
  cursor: "pointer",
}));
