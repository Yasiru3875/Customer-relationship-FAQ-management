import React, {  useState } from "react";
import styles from "./Login.module.scss";

import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  APP_ROUTES,
} from "../../utilities/constants";
import { useNavigate } from "react-router-dom";

import { logo } from "../../assets/images";
import { validateFormData } from "../../utilities/helpers";
import LoginFormComponet from "../../components/Login/LoginFormComponet";
import {  toast } from 'react-toastify';
import { ManagerService } from "../../services/manager.service";
const Login = () => {


const INITIAL_LOGIN_FORM={
  userName:  { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
  passWord:  { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
}

  const [LoginForm, setLoginForm] = useState(INITIAL_LOGIN_FORM);
  const navigate = useNavigate();
  const [helperText, setHelperText] = useState(true);


 
  const handleLogin = async () => {
    const [validateData, isValid] = await validateFormData(LoginForm);
    setLoginForm(validateData);
    if (isValid) {

      const payload={
        email: LoginForm.userName.value,
        password: LoginForm.passWord.value
      }

      ManagerService.Login(payload).then((res:any)=>{
        console.log("res",res)
        if(res.status===200){
          toast.success("Login Success")
          localStorage.setItem("userRole",res.data.role)
          localStorage.setItem("userId",res.data.id)
          if(res.data.role==="user"){
            navigate(APP_ROUTES.USER_FEEDBACK_VIEW)
          }else{
            navigate(APP_ROUTES.MANAGER_MANAGEMENT)
          }
        }
        
    }).catch((err)=>{
      console.log("err",err)
      toast.error("Login Failed")});  
    }

  };

  const handleInputFocus = (property: string, section: string) => {
    if (section === "GI")
    setLoginForm({
      ...LoginForm,
      [property]: {
        ...LoginForm[property as keyof typeof LoginForm],
        error: null,
      },
    });
  
}
const onInputHandleChange = (property: string, value: any) => {
  setHelperText(true);
    
  if (property === "userName") {
    setLoginForm({
        ...LoginForm,
        userName: {
          ...LoginForm.userName,
          value: value,
        },
      });
    }
    if (property === "passWord") {
      setLoginForm({
          ...LoginForm,
          passWord: {
            ...LoginForm.passWord,
            value: value,
          },
        });
      }

}

  return (
    <section
      className={`${styles.container} content-padding container layout-row layout-wrap layout-align-center center`}
    >
      <section className={`${styles.login} layout-row`}>
        <aside className={styles.logincard}>
          <aside className={styles.loginActions}>
            <aside>
            <img className={styles.logo} src={logo} alt="logo" />
              <h1>Welcome to TEA FACTORY MANAGEMENT  System</h1>
            </aside>

            <LoginFormComponet
                        helperText={helperText}
                        LoginForm={LoginForm}
                        onInputHandleChange={onInputHandleChange}
                        handleInputFocus={handleInputFocus}/>
         
            <Button
              className={`${styles.primaryBtn} `}
              startIcon={
              <CircularProgress size={18} />
              }
              variant="contained"
              disabled={
            false
              }
              onClick={() => handleLogin()}
            >
              Login with TEA FACTORY MANAGEMENT SYSTEM
            </Button>
            <div className={styles.loginFooter}>
              <p>
              Designed to streamline your operations,
               our Tea Factory Management System ensures efficient management of your production processes. .
              </p>
            </div>
          </aside>
        </aside>
      </section>
    </section>
  );
};

export default Login;
