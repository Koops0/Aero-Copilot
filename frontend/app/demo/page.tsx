"use client"
import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import demotext from "@/data/demo_content_text";
// This is your JSON data
import  highlightData  from "@/data/highlight_output";

export default function DemoPage() {
  const codeRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, []);

  // Split the paragraph into words
  const words = demotext.split(" ");

  // Apply highlighting and replacement to the specified words
  highlightData.forEach((highlight) => {
    words[highlight.start] = `<mark class="underline text-red-500" title="${highlight.reason}">${words.slice(highlight.start, highlight.end + 1).join(" ")}</mark>`;
    words.fill("", highlight.start + 1, highlight.end + 1);
  });

  // Join the words back into a paragraph
  const highlightedPara = words.join(" ");

  return (
    <main className="flex h-full w-full flex-col items-center justify-around gap-5 lg:flex-row">
      <div className="w-full lg:w-1/2">
        <p dangerouslySetInnerHTML={{ __html: highlightedPara }} />
      </div>
    </main>
  );
}

// Mark DemoPage as a client component
DemoPage.useClient = true;
