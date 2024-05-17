import React from "react";

import { APP_ROUTES } from "../../utilities/constants";
import { AppLayoutHeader } from "../index";
import { NavLink } from "react-router-dom";
import { logo } from "../../assets/images";

const AppLayout: React.FC<{
  children: React.ReactNode;
  componentTitle: string;
}> = (props) => {

  const authorizedUser: any = {
    userId: 1,
    firstName: "John",
    lastName: "Doe",
    roleId: 2,
    roleName: "User",
    emailId: "john.doe@example.com",
    isActive: true,
    nic: "123456789",
    contactNumber: "+1234567890",
    homeContactNumber: "+9876543210",
    permissions: [
  
    ],
    plant: "Plant A",
    sbu: "SBU X",
    department: "Engineering",
    address: "123 Main Street, Cityville",
  };
  return (
    <React.Fragment>
      <div className={"layout-row authorizedContainer"}>
        <aside className={`layout-row sideNavigation `}>
          <aside className="navBar">
            <aside className={"layout-row"}>
              {/* <div className={`menuBox ${navClass}`}>
                <a className="menuIcon" onClick={() => toggleSideNav()}>
                  <span></span>
                </a>
              </div> */}
              <div className="contentGroup ">
                <img className="logo" src={logo} alt="BookMySeatlogo" />
              </div>
            </aside>

            <aside className={"links"}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    className={({ isActive }) =>
                      isActive ? "layout-row is-active" : "layout-row"
                    }
                    to={APP_ROUTES.MANAGER_MANAGEMENT}
                  >
                    <div className={`navBarContent navLink layout-row`}>
                      <span>Manager  Management</span>
                    </div>
                  </NavLink>
                  </aside>
                  
                  <aside className={"links"}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    className={({ isActive }) =>
                      isActive ? "layout-row is-active" : "layout-row"
                    }
                    to={APP_ROUTES.FEEDBACK_MANAGEMENT}
                  >
                    <div className={`navBarContent navLink layout-row`}>
                      <span>FeedBack Management</span>
                    </div>
                  </NavLink>
                  </aside>


                  <aside className={"links"}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    className={({ isPending }) =>
                      isPending ? "layout-row is-active" : "layout-row"
                    }
                    to={APP_ROUTES.STAFF_MANAGEMENT}
                  >
                    <div className={`navBarContent navLink layout-row`}>
                      <span>Staff Management</span>
                    </div>
                  </NavLink>
                  </aside>


                  <aside className={"links"}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    className={({ isPending }) =>
                      isPending ? "layout-row is-active" : "layout-row"
                    }
                    to={APP_ROUTES.STOCK_MANAGEMENT}
                  >
                    <div className={`navBarContent navLink layout-row`}>
                      <span>Stock Management</span>
                    </div>
                  </NavLink>
                  </aside>


                  <aside className={"links"}>
                  <NavLink
                    style={{ textDecoration: "none" }}
                    className={({ isPending }) =>
                      isPending ? "layout-row is-active" : "layout-row"
                    }
                    to={APP_ROUTES.RAWTEA_COLLECTION_MANAGEMENT}
                  >
                    <div className={`navBarContent navLink layout-row`}>
                      <span>RawTea Management</span>
                    </div>
                  </NavLink>
                  </aside>

           

           
          </aside>
        </aside>

        <aside className={"content"}>
          <aside className="content2">
            <AppLayoutHeader authorizedUser={authorizedUser} />
          </aside>
          <aside className={"content3"}>{props.children}</aside>
        </aside>
      </div>
    </React.Fragment>
  );
};

export default AppLayout;
