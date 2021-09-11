//@ts-nocheck
import React from "react";
import { NavLink } from "react-router-dom";
import { SideNav, SideNavItems, SideNavLink } from "carbon-components-react";
import { AppPath } from "Config/appConfig";
import styles from "./Layout.module.scss";

const activeClassName = "bx--side-nav__link--current";

const Layout = (props: any) => (
  <div className={styles.container}>
    <>
      <SideNav
        className={styles.sidenav}
        isFixedNav
        expanded={true}
        isChildOfHeader={false}
        aria-label="Side navigation"
      >
        <SideNavItems>
          <SideNavLink exact large activeClassName={activeClassName} element={NavLink} to={AppPath.Root} key="/">
            Welcome
          </SideNavLink>
          <SideNavLink
            exact
            large
            activeClassName={activeClassName}
            element={NavLink}
            to={"/overview2"}
            key="/overview2"
          >
            Welcome2
          </SideNavLink>
          <SideNavLink
            exact
            large
            activeClassName={activeClassName}
            element={NavLink}
            to={"/overview3"}
            key="/overview3"
          >
            Welcome3
          </SideNavLink>
          <SideNavLink
            exact
            large
            activeClassName={activeClassName}
            element={NavLink}
            to={"/overview4"}
            key="/overview4"
          >
            Welcome4
          </SideNavLink>
          <SideNavLink large activeClassName={activeClassName} element={NavLink} to={AppPath.Profile} key="/Profile">
            Profile
          </SideNavLink>
          <SideNavLink
            large
            activeClassName={activeClassName}
            element={NavLink}
            to={AppPath.Subscription}
            key="/Subscription"
          >
            Subscription
          </SideNavLink>
          <SideNavLink large activeClassName={activeClassName} element={NavLink} to={AppPath.Support} key="/Support">
            Support
          </SideNavLink>
        </SideNavItems>
      </SideNav>
      <div id="content" className={styles.main}>
        {props.children}
      </div>
    </>
  </div>
);

export default Layout;
