"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
const TemplateNavbar = () => {
  return (
    <div className="w-full bg-base-200 flex justify-center gap-8">
      <a href="settings">General Settings</a>
      <a href="access-settings">Access Settings</a>
      <a href="questions">Questions</a>
      <a href="responses">Responses</a>
      <a href="aggregation">Aggregation</a>
    </div>
  );
};

export default TemplateNavbar;
