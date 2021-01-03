import React from "react";

export default function Loader() {
  return (
    <section className="container">
      <svg
        className="loader"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 340 340"
      >
        <circle cx="170" cy="170" r="160" stroke="#fd8864" />
        <circle cx="170" cy="170" r="135" stroke="#0b93c9" />
        <circle cx="170" cy="170" r="110" stroke="#fd8864" />
        <circle cx="170" cy="170" r="85" stroke="#0b93c9" />
      </svg>
    </section>
  );
}
