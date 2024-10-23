"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
const TemplateNavbar = () => {
  return (
    <div className="w-full bg-white flex justify-center gap-8">
      <a className="text-blue-800" href="settings">
        General Settings
      </a>
      <a className="text-blue-800" href="access-settings">
        Access Settings
      </a>
      <a className="text-blue-800" href="questions">
        Questions
      </a>
      <a className="text-blue-800" href="responses">
        Responses
      </a>
      <a className="text-blue-800" href="aggregation">
        Aggregation
      </a>
    </div>
  );
};

export default TemplateNavbar;
