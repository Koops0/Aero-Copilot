"use client"
import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

var para = `What this handout is about
This handout will help you understand how paragraphs are formed, how to develop stronger paragraphs, and how to completely and clearly express your ideas.

What is a paragraph?
Paragraphs are the building blocks of papers. Many students define paragraphs in terms of length: a paragraph is a group of at least five sentences, a paragraph is half a page long, etc. In reality, though, the unity and coherence of ideas among sentences is what constitutes a paragraph. A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long. Ultimately, a paragraph is a sentence or group of sentences that support one main idea. In this handout, we will refer to this as the “controlling idea,” because it controls what happens in the rest of the paragraph.

How do I decide what to put in a paragraph?
Before you can begin to determine what the composition of a particular paragraph will be, you must first decide on an argument and a working thesis statement for your paper. What is the most important idea that you are trying to convey to your reader? The information in each paragraph must be related to that idea. In other words, your paragraphs should remind your reader that there is a recurrent relationship between your thesis and the information in each paragraph. A working thesis functions like a seed from which your paper, and your ideas, will grow. The whole process is an organic one—a natural progression from a seed to a full-blown paper where there are direct, familial relationships between all of the ideas in the paper.

The decision about what to put into your paragraphs begins with the germination of a seed of ideas; this “germination process” is better known as brainstorming. There are many techniques for brainstorming; whichever one you choose, this stage of paragraph development cannot be skipped. Building paragraphs can be like building a skyscraper: there must be a well-planned foundation that supports what you are building. Any cracks, inconsistencies, or other corruptions of the foundation can cause your whole paper to crumble.

`
// This is your JSON data
var highlights = [
  {
    "start": 5,
    "end": 6,
    "reason": "Issue - To be shown on hover",
    "suggested_language": "asdfsdafsdf"
  },
  {
    "start": 10,
    "end": 13,
    "reason": "Issue - To be shown on hover",
    "suggested_language": "asdfsdafsdf"
  }
];

export default function DemoPage() {
  const codeRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, []);

  // Split the paragraph into words
  const words = para.split(" ");

  // Apply highlighting and replacement to the specified words
  highlights.forEach((highlight) => {
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