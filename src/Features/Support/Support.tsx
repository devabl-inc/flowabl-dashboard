import * as React from "react";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  ClickableTile,
  FeatureHeader,
  FeatureHeaderTitle,
  FeatureHeaderSubtitle,
  ComposedModal,
  Loading,
  ModalForm,
  ModalBody,
  ModalFooter,
  TextInput,
  TextArea,
  InlineNotification,
  ToastNotification,
  notify,
} from "@boomerang-io/carbon-addons-boomerang-react";
import { DOCS_URL, SUPPORT_EMAIL } from "Config/appConfig";
import { resolver } from "Config/servicesConfig";
import { Launch16, Chat16, App16 } from "@carbon/icons-react";
import Advocate from "@carbon/pictograms-react/es/advocate";
import BugVirusMalware from "@carbon/pictograms-react/es/bug--virus--malware";
import Envelope from "@carbon/pictograms-react/es/envelope";
import QuestionAndAnswer from "@carbon/pictograms-react/es/question--and--answer";
import TextLayout from "@carbon/pictograms-react/es/text--layout";
import Tools from "@carbon/pictograms-react/es/tools";
import styles from "./Support.module.scss";

export default function Support() {
  const handleOnSupportClick = () => {
    window.$crisp.push(["do", "chat:toggle"]);
  };

  return (
    <article className={styles.container}>
      <FeatureHeader includeBorder={false}>
        <FeatureHeaderTitle>Support</FeatureHeaderTitle>
        <FeatureHeaderSubtitle>Let us help</FeatureHeaderSubtitle>
      </FeatureHeader>
      <div className={styles.contentContainer}>
        <section className={styles.tilesContainer}>
          <ClickableTile light className={styles.tile} handleClick={handleOnSupportClick} role="button" tabIndex="0">
            <QuestionAndAnswer fill="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Chat</h2>
              <Chat16 />
            </div>
          </ClickableTile>
          <ClickableTile light className={styles.tile} href={`mailto:${SUPPORT_EMAIL}?subject=Hi!`}>
            <Envelope fill="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Email</h2>
              <App16 />
            </div>
          </ClickableTile>
          <ClickableTile
            light
            className={styles.tile}
            href={DOCS_URL}
            target="_blank"
            rel="noopen nofollow noreferrer"
            aria-describedby="#new-window-aria-desc-0"
          >
            <TextLayout fill="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Documentation </h2>
              <Launch16 aria-label="Documentation opens in new tab" />
            </div>
          </ClickableTile>
          <ClickableTile light className={styles.tile} handleClick={handleOnSupportClick} role="button" tabIndex="0">
            <BugVirusMalware fill="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Report a bug</h2>
              <Chat16 />
            </div>
          </ClickableTile>
          <ComposedModal
            composedModalProps={{ selectorPrimaryFocus: 'input[id="feature"]' }}
            modalHeaderProps={{
              title: "Request a feature",
              subtitle: "What would you like to see in Flowabl?",
            }}
            modalTrigger={({ openModal }: { openModal: any }) => (
              <ClickableTile light className={styles.tile} handleClick={openModal} role="button" tabIndex="0">
                <Tools color="#009d9a" />
                <div className={styles.tileTitle}>
                  <h2>Request a feature</h2>
                  <Chat16 />
                </div>
              </ClickableTile>
            )}
          >
            {({ closeModal }: { closeModal: any }) => <SubmitFeatureRequest closeModal={closeModal} />}
          </ComposedModal>
          <ClickableTile light className={styles.tile} handleClick={handleOnSupportClick} role="button" tabIndex="0">
            <Advocate fill="#009d9a" />
            <div className={styles.tileTitle}>
              <h2>Request workflow help (premium only)</h2>
              <Chat16 />
            </div>
          </ClickableTile>
        </section>
      </div>
    </article>
  );
}

interface BugForm {
  feature: string;
  description: string;
  benefit: string;
}

function SubmitFeatureRequest(props: { closeModal: () => void }) {
  const handleOnSubmit = async (values: BugForm) => {
    try {
      await createBugMutator(values);
      props.closeModal();
      notify(
        <ToastNotification
          kind="success"
          title="Request a feature"
          subtitle="Successfully submitted request for a new feature"
        />
      );
    } catch (e) {
      console.error(e);
    }
  };

  const formik = useFormik<BugForm>({
    isInitialValid: false,
    initialValues: {
      feature: "",
      description: "",
      benefit: "",
    },
    validationSchema: yup.object({
      feature: yup.string().max(100, "Must be 100 characters or less").required("Required"),
      description: yup.string().max(500, "Must be 500 characters or less").required("Required"),
      benefit: yup.string().max(500, "Must be 500 characters or less").required("Required"),
    }),
    onSubmit: handleOnSubmit,
  });

  const { mutateAsync: createBugMutator, isLoading, isError } = useMutation(resolver.postFeature);

  const submitText = isError ? "Try again" : isLoading ? "Submitting..." : "Submit";
  return (
    <ModalForm onSubmit={formik.handleSubmit}>
      {isLoading && <Loading />}
      {isError && (
        <InlineNotification
          lowContrast
          kind="error"
          title={"Something's wrong"}
          subtitle={"Failed to create feature request"}
          style={{ marginBottom: "0.5rem" }}
        />
      )}
      <ModalBody>
        <TextInput id="feature" labelText="Feature" value={formik.values["feature"]} onChange={formik.handleChange} />
        <TextArea
          id="description"
          labelText="Description"
          value={formik.values["description"]}
          onChange={formik.handleChange}
        />
        <TextArea id="benefit" labelText="Benefit" value={formik.values["benefit"]} onChange={formik.handleChange} />
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={props.closeModal}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading || !formik.isValid}>
          {submitText}
        </Button>
      </ModalFooter>
    </ModalForm>
  );
}
