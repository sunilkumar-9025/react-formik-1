import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import TextError from "./TextError";

function YoutubeForm() {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
    comments: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
    friends: [""],
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form Data", values);
    console.log('onSubmitProps', onSubmitProps)
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    channel: Yup.string().required("Required"),
    comments: Yup.string().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      // validateOnChange={false}
      // validateOnBlur={false}
      // validateOnMount
    >
      {(formik) => (
        <Form>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <Field id="name" type="text" name="name" />
            <ErrorMessage name="name" component={TextError} />
          </div>

          <div className="form-control">
            <label htmlFor="email">E-mail</label>
            <Field id="email" type="email" name="email" />
            <ErrorMessage name="email" />
          </div>

          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <Field id="channel" type="text" name="channel" />
            <ErrorMessage name="channel">
              {(errorMsg) => <div className="error">{errorMsg}</div>}
            </ErrorMessage>
          </div>

          <div className="form-control">
            <label htmlFor="comments">Comments</label>
            <Field as="textarea" id="comments" name="comments" />
            {/* as can be repaced by component */}
            <ErrorMessage name="comments" />
          </div>

          <div className="form-control">
            <label htmlFor="address">Address</label>
            <Field name="address">
              {(props) => {
                const { field, form, meta } = props;
                return (
                  <div>
                    <input type="text" id="address" {...field} />
                    {meta.touched && meta.error ? (
                      <div>{meta.error}</div>
                    ) : null}
                  </div>
                );
              }}
            </Field>
            <ErrorMessage name="comments" />
          </div>

          <div className="form-control">
            <label htmlFor="facebook">Facebook</label>
            <Field id="facebook" type="text" name="social.facebook" />
          </div>

          <div className="form-control">
            <label htmlFor="twitter">Twitter</label>
            <Field id="twitter" type="text" name="social.twitter" />
          </div>

          <div className="form-control">
            <label htmlFor="primaryPh">Phone Number</label>
            <Field id="primaryPh" type="text" name="phoneNumbers[0]" />
          </div>

          <div className="form-control">
            <label htmlFor="secondaryPh">Home Phone Number</label>
            <Field id="secondaryPh" type="text" name="phoneNumbers[1]" />
          </div>

          <div className="form-control">
            <label>Friends</label>
            <FieldArray name="friends">
              {(fieldAreaProps) => {
                const { push, remove, form } = fieldAreaProps;
                const { values } = form;
                const { friends } = values;
                return (
                  <div>
                    {friends.map((name, index) => (
                      <div key={index}>
                        <Field type="text" name={`friends[${index}]`} />
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            -
                          </button>
                        )}
                        <button type="button" onClick={() => push("")}>
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                );
              }}
            </FieldArray>
          </div>

          <button type="submit" disabled={!(formik.dirty && formik.isValid)}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default YoutubeForm;
