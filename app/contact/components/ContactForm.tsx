"use client";

import React, { useEffect, useState } from "react";

type FormType = "general" | "bug";
type FormState = "idle" | "loading" | "success" | "error";


export default function ContactForm() {
  const [formType, setFormType] = useState<FormType>("general");
  const [formState, setFormState] = useState<FormState>("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    university: "",
    role: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const switchForm = (type: FormType) => {
    setFormType(type);
    setFormState("idle");
    setFields({ name: "", email: "", university: "", role: "", subject: "", message: "" });
    window.history.replaceState(null, "", `${window.location.pathname}#${type}`);
  };

  useEffect(() => {
    const syncFromHash = (): void => {
      const id = window.location.hash.replace("#", "");
      if (id === "bug" || id === "general") {
        setFormType(id);
        setFormState("idle");
        requestAnimationFrame(() => {
          document
            .getElementById("contact-form-section")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, type: formType }),
    });

    if (res.ok) {
      setFormState("success");
      setFields({ name: "", email: "", university: "", role: "", subject: "", message: "" });
    } else {
      setFormState("error");
    }
  };

  const isGeneral = formType === "general";

  return (
    <div className="contact-page">
      <div className="contact-page-header">
        <h1 className="contact-page-title">Contact Us</h1>
        <p className="contact-page-subtitle">
          Have questions about the Palana app or would like to partner with us?
          If so, feel free to contact us!
        </p>
      </div>

      <div className="contact-selectors">
        <div className={`contact-selector-card ${isGeneral ? "active general" : ""}`}>
          <div className="contact-selector-top">
            <div className="contact-cutout-container">
              <img src="/General-Inquiries-Cutout.png" alt="" className="contact-cutout"></img>
            </div>
            <h2 className="contact-selector-title">General<br />Inquiries</h2>
          </div>
          <button className="contact-selector-btn general" onClick={() => switchForm("general")}>
            Submit a Form
          </button>
        </div>

        <div className={`contact-selector-card ${!isGeneral ? "active bug" : ""}`}>
          <div className="contact-selector-top">
            <div className="contact-cutout-container">
              <img src="/Report-Bug-Cutout.png" alt=""  className="contact-cutout"></img>
            </div>
            <h2 className="contact-selector-title">Report a<br />Bug</h2>
          </div>
          <button className="contact-selector-btn bug" onClick={() => switchForm("bug")}>
            Submit a Form
          </button>
        </div>
      </div>

      <div id="contact-form-section" className="contact-form-section">
        <div className="contact-form-card">
          {formState === "success" ? (
            <div className="contact-success">
              <svg className="contact-success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx={12} cy={12} r={10} />
                <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="contact-success-title">Message Sent!</h2>
              <p className="contact-success-text">
                Thanks for reaching out. We&apos;ll get back to you soon.
              </p>
              <button
                className={`contact-submit ${isGeneral ? "general" : "bug"}`}
                onClick={() => setFormState("idle")}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-field">
                <label htmlFor="name" className="contact-label">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name ..."
                  className="contact-input"
                  value={fields.name}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="email" className="contact-label">Your Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email ..."
                  className="contact-input"
                  value={fields.email}
                  onChange={handleChange}
                />
              </div>

              {isGeneral ? (
                <div className="contact-row">
                  <div className="contact-field">
                    <label htmlFor="university" className="contact-label">Your University</label>
                    <input
                      id="university"
                      name="university"
                      type="text"
                      placeholder="Enter your university ..."
                      className="contact-input"
                      value={fields.university}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-field">
                    <label htmlFor="role" className="contact-label">Your Role</label>
                    <select
                      id="role"
                      name="role"
                      className="contact-input contact-select"
                      value={fields.role}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select role</option>
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                      <option value="Staff">Staff</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Partner">Partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              ) : null}

              <div className="contact-field">
                <label htmlFor="subject" className="contact-label">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder={isGeneral ? "Enter the subject of your message..." : "Brief description of the bug..."}
                  className="contact-input"
                  value={fields.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="message" className="contact-label">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={isGeneral ? "Enter your message to Palana..." : "Describe the bug and steps to reproduce it..."}
                  className="contact-input contact-textarea"
                  value={fields.message}
                  onChange={handleChange}
                />
              </div>

              {formState === "error" && (
                <p className="contact-error">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                className={`contact-submit ${isGeneral ? "general" : "bug"}`}
                disabled={formState === "loading"}
              >
                {formState === "loading" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>

        <div className="contact-form-info">
          <h2 className="contact-form-info-title">
            {isGeneral ? "General\nInquiries\nForm" : "Bug\nReport\nForm"}
          </h2>
          <p className="contact-form-info-text">
            {isGeneral
              ? "Have questions about Palana, want to partner with us, or just want to say hello? Fill out the form and we'll get back to you as soon as possible."
              : "Found a bug in the Palana app? Let us know and we'll investigate. Please describe the issue in as much detail as possible so we can fix it quickly."}
          </p>
        </div>
      </div>
    </div>
  );
}
