//@ts-nocheck
import * as React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { UIShell } from "@boomerang-io/carbon-addons-boomerang-react";
import { PRODUCT_ENV_URL } from "Config/platformUrlConfig";
import { BASE_URL } from "Config/servicesConfig";

const defaultUIShellProps = {
  baseServiceUrl: BASE_URL,
  renderLogo: false,
  baseLaunchEnvUrl: PRODUCT_ENV_URL,
};

const skipToContentProps = {
  href: "#content",
};

Navbar.propTypes = {
  //handleOnTutorialClick: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  user: PropTypes.object,
};

function Navbar(props) {
  const { navigation, user } = props;

  if (navigation) {
    return (
      <>
        <Helmet>
          <title>{`Dashboard | ${navigation?.platform?.platformName ?? "Flowabl"}`}</title>
        </Helmet>
        <UIShell
          {...defaultUIShellProps}
          headerConfig={navigation}
          user={user}
          requirePlatformConsent={false}
          onTutorialClick={props.handleOnTutorialClick}
          renderLogo={navigation?.platform?.displayLogo}
          companyName={navigation?.platform?.platformName ?? "Flowabl"}
          skipToContentProps={skipToContentProps}
        />
      </>
    );
  }

  return <UIShell {...defaultUIShellProps} />;
}

export default Navbar;
