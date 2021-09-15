//@ts-nocheck
import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { SideNav, SideNavItems, SideNavLink } from "carbon-components-react";
import SuspenseBoundary from "Components/SuspenseBoundary";
import { AppPath } from "Config/appConfig";
import styles from "./Layout.module.scss";

const activeClassName = "bx--side-nav__link--current";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

function Layout(props: LayoutProps) {
  return (
    <>
      <Helmet>
        <title>{`${props.title} | flowabl`}</title>
        <meta name="description" content={props.description} />
      </Helmet>
      <div className={styles.container}>
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
            <SideNavLink large activeClassName={activeClassName} element={NavLink} to={AppPath.Logout} key="/Logout">
              Logout
            </SideNavLink>
          </SideNavItems>
        </SideNav>
        <div id="content" className={styles.main}>
          <SuspenseBoundary>{props.children}</SuspenseBoundary>
        </div>
      </div>
    </>
  );
}

export default Layout;
