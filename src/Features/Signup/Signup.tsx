import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useAuth } from "Hooks";
import { AppLink } from "Config/appConfig";
import { PRODUCT_ENV_URL } from "Config/platformUrlConfig";
import { useQueryParams } from "Hooks";
import { Tier } from "Utils/types";

export default function Signup() {
  const { signUpWithPopup } = useAuth();
  const queryParams = useQueryParams();
  return (
    <>
      <Helmet>
        <title>{`Signup | Flowabl`}</title>
        <meta name="description" content="Signup page for Flowabl" />
      </Helmet>
      <div className="webflow">
        <div className="page-wrapper-2">
          <div className="page-container">
            <div className="block-1">
              <div className="content-wrapper">
                <a href={PRODUCT_ENV_URL} className="brand w-nav-brand">
                  <img
                    src="https://uploads-ssl.webflow.com/60d12e51cd5e87607f0568c9/614de26b3d8f9c9a66cc9e09_logo.svg"
                    alt="Flowabl logo"
                    className="image"
                  />
                </a>
                <div className="content-box">
                  <h1 className="heading-1">
                    Embrace the future of <br />
                    workflow automation!
                    <br />
                  </h1>
                  <div className="feature-box-4">
                    <img
                      src="https://uploads-ssl.webflow.com/5e59340e7bb9af36b79a4c14/5e5b05550e170603cd7a7649_tag.svg"
                      alt=""
                      className="feature-icon-2"
                    />
                    <div className="feature-text">Its Free.</div>
                  </div>
                  <div className="feature-box-4">
                    <img
                      src="https://uploads-ssl.webflow.com/5e59340e7bb9af36b79a4c14/5e5b05f02089e52bed8b12d5_dismiss.svg"
                      alt=""
                      className="feature-icon-2"
                    />
                    <div className="feature-text">No Credit Card.</div>
                  </div>
                  <div className="feature-box-4">
                    <img
                      src="https://uploads-ssl.webflow.com/5e59340e7bb9af36b79a4c14/5e5b06d60e170663c37a873a_close.svg"
                      alt=""
                      className="feature-icon-2"
                    />
                    <div className="feature-text">Cancel Anytime.</div>
                  </div>
                </div>
                <div className="legal-box _2">
                  <div className="legal-text">© 2022 Devabl, Inc. All rights reserved.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="page-container _2">
            <div className="block-2">
              <div className="form-wrapper">
                <h2 className="heading-3">Get Started!</h2>
                <div className="form-box">
                  <h3 className="signup-terms-and-conditions">Use your social profile to sign up</h3>
                  <div className="social-box">
                    <button
                      id="loginGoogle"
                      className="social-login w-inline-block"
                      onClick={() =>
                        signUpWithPopup({
                          tier: (queryParams.get("tier") as Tier) ?? "explorer",
                          interval: queryParams.get("interval") ?? "month",
                        })
                      }
                    >
                      <img
                        src="https://uploads-ssl.webflow.com/60d12e51cd5e87607f0568c9/61077e26da023d6c3090c056_G.png"
                        alt=""
                        className="image-3"
                      />
                      <div className="div-block-2">
                        <div className="text-block-9">Google</div>
                      </div>
                    </button>
                    <a href="/" className="social-login facebook w-inline-block">
                      <img
                        src="https://uploads-ssl.webflow.com/60d12e51cd5e87607f0568c9/61077e26da023deca790c054_facebook.png"
                        alt=""
                        className="image-3"
                      />
                      <div className="div-block-2">
                        <div className="text-block-9 _2">Facebook</div>
                      </div>
                    </a>
                  </div>
                  <div className="div-block-6-copy">
                    <div className="_1px-div-line" />
                    <h3 className="signup-terms-and-conditions">Or</h3>
                    <div className="_1px-div-line" />
                  </div>
                  <div className="form-block-3 w-form">
                    <form id="email-form" name="email-form" data-name="Email Form">
                      <div className="form-field-wrapper">
                        <div className="text-field-box">
                          <label htmlFor="name" className="field-label-2">
                            Name
                          </label>
                          <input
                            type="text"
                            className="text-field-2 w-input"
                            maxLength={256}
                            name="name"
                            data-name="Name"
                            placeholder="Name"
                            id="loginName"
                            required
                          />
                        </div>
                        <div className="text-field-box _2">
                          <label htmlFor="Email" className="field-label-2">
                            Email
                          </label>
                          <input
                            type="email"
                            className="text-field-2 w-input"
                            maxLength={256}
                            name="Email"
                            data-name="Email"
                            placeholder="you@email.com"
                            id="loginEmail"
                            required
                          />
                        </div>
                        <div className="text-field-box _2">
                          <label htmlFor="Password" className="field-label-2">
                            Password
                          </label>
                          <input
                            type="password"
                            className="text-field-2 w-input"
                            maxLength={256}
                            name="Password"
                            data-name="Password"
                            placeholder="Password"
                            id="loginPassword"
                            required
                          />
                        </div>
                      </div>
                      <h4 className="signup-terms-and-conditions">
                        By continuing you agree to the Terms &amp; Conditions and Privacy Policy
                      </h4>
                      <div id="loginError" className="inline-error">
                        <div id="loginError" className="html-embed-9 w-embed">
                          <svg
                            style={{ fill: "#da1e28" }}
                            focusable="false"
                            preserveAspectRatio="xMidYMid meet"
                            xmlns="http://www.w3.org/2000/svg"
                            className="bx--inline-notification__icon"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z" />
                            <path d="M13.5,14.5l-8-8l1-1l8,8L13.5,14.5z" data-icon-path="inner-path" opacity={0} />
                          </svg>
                        </div>
                        <div id="loginErrorText" className="inline-error-text">
                          An unknown error occurred. We apologize for any inconvenience
                        </div>
                      </div>
                      <a id="loginButton" href="/" className="button-2 login-button w-inline-block">
                        <label htmlFor="loginPassword-2" className="field-label-3">
                          Sign Up
                        </label>
                      </a>
                    </form>
                    <div className="w-form-done">
                      <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail">
                      <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                  </div>
                  <div className="div-block-41">
                    <div className="text-block-8">Already have an account? </div>
                    <Link to={AppLink.Login()} className="link-3">
                      Log in here
                    </Link>
                  </div>
                </div>
              </div>
              <div className="legal-box _2-copy">
                <div className="legal-text _3">© 2022 Devabl, Inc. All rights reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
