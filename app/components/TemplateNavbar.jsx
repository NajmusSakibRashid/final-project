"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
const TemplateNavbar = () => {
  return (
    <div className="w-full bg-white flex justify-center gap-8">
      <Link className="text-blue-800" href="settings">
        General Settings
      </Link>
      <Link className="text-blue-800" href="access-settings">
        Access Settings
      </Link>
      <Link className="text-blue-800" href="questions">
        Questions
      </Link>
      <Link className="text-blue-800" href="responses">
        Responses
      </Link>
      <Link className="text-blue-800" href="aggregation">
        Aggregation
      </Link>
    </div>
  );
};

export default TemplateNavbar;
