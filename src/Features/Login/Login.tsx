import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAuth } from "Hooks/useFirebase";
import { AppLink } from "Config/appConfig";
import { PRODUCT_ENV_URL } from "Config/platformUrlConfig";

export default function Login() {
  const { signInWithPopup } = useAuth();
  return (
    <>
      <Helmet>
        <title>{`Login | flowabl`}</title>
      </Helmet>
      <div className="webflow">
        <div className="page-wrapper-2">
          <div className="page-container">
            <div className="block-1">
              <div className="content-wrapper">
                <a href={PRODUCT_ENV_URL} className="brand w-nav-brand">
                  <img
                    src="https://uploads-ssl.webflow.com/60d12e51cd5e87607f0568c9/60d185e9238281478de5036e_brandmark-design.svg"
                    alt=""
                    className="image"
                  />
                </a>
                <div className="content-box">
                  <h1 className="heading-1">
                    Ready? Let's start automating.
                    <br />
                  </h1>
                  <div className="feature-box-4">
                    <img
                      src="https://uploads-ssl.webflow.com/60d12e51cd5e87607f0568c9/610e04ac9242da6bcb9876da_flow--connection.svg"
                      alt=""
                      className="feature-icon-2"
                    />
                    <div className="feature-text">Powerful visual editor.</div>
                  </div>
                  <div className="feature-box-4">
                    <img
                      src="https://uploads-ssl.webflow.com/60d12e51cd5e87607f0568c9/610e050d7de9017279b44fe4_task.svg"
                      alt=""
                      className="feature-icon-2"
                    />
                    <div className="feature-text">Pre-built drag-and-drop tasks.</div>
                  </div>
                  <div className="feature-box-4">
                    <img
                      src="https://uploads-ssl.webflow.com/5e59340e7bb9af36b79a4c14/5e5b06d60e170663c37a873a_close.svg"
                      alt=""
                      className="feature-icon-2"
                    />
                    <div className="feature-text">Reduce manual errors.</div>
                  </div>
                </div>
                <div className="legal-box _2">
                  <div className="legal-text">© 2021 flowabl Ltd. All rights reserved.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="page-container _2">
            <div className="block-2">
              <div className="form-wrapper">
                <h2 className="heading-3">Log in to flowabl.io</h2>
                <div className="form-box">
                  <h3 className="signup-terms-and-conditions">Use your social profile to log in</h3>
                  <div className="social-box">
                    <button
                      id="loginGoogle"
                      className="social-login w-inline-block"
                      onClick={() => signInWithPopup("")}
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
                  <div className="w-form">
                    <form id="email-form" name="email-form" data-name="Email Form" className="form-3">
                      <div className="form-field-wrapper">
                        <div className="text-field-box _2">
                          <label htmlFor="loginEmail" className="field-label-2">
                            Email
                          </label>
                          <input
                            type="email"
                            className="text-field-2 w-input"
                            maxLength={256}
                            name="loginEmail"
                            data-name="loginEmail"
                            placeholder="you@email.com"
                            id="loginEmail"
                            required
                          />
                        </div>
                        <div className="text-field-box _2">
                          <label htmlFor="loginPassword" className="field-label-2">
                            Password
                          </label>
                          <input
                            type="password"
                            className="text-field-2 w-input"
                            maxLength={256}
                            name="loginPassword"
                            data-name="loginPassword"
                            placeholder="Password"
                            id="loginPassword"
                            required
                          />
                        </div>
                      </div>
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
                          LOGIN
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
                    <div className="text-block-8">Don't have an account yet? </div>
                    <Link to={AppLink.Signup()} className="link-3">
                      Sign up now
                    </Link>
                  </div>
                </div>
              </div>
              <div className="legal-box _2-copy">
                <div className="legal-text _3">© 2020 MyBusiness Ltd. All rights reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
