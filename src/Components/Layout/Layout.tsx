//@ts-nocheck
import React from "react";
import { NavLink } from "react-router-dom";
import { SideNav, SideNavItems, SideNavLink } from "carbon-components-react/lib/components/UIShell";
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
            Overview
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
