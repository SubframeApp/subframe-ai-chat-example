"use client";
/*
 * Documentation:
 * AI Chat Suggestion — https://app.subframe.com/ec98ea52812e/library?component=AI+Chat+Suggestion_b66d445b-b9c7-4cf6-82e2-4f1130e68f92
 */

import React from "react";
import * as SubframeCore from "@subframe/core";

interface AiChatSuggestionRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  className?: string;
}

const AiChatSuggestionRoot = React.forwardRef<
  HTMLElement,
  AiChatSuggestionRootProps
>(function AiChatSuggestionRoot(
  { text, className, ...otherProps }: AiChatSuggestionRootProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "group/b66d445b flex cursor-pointer items-center gap-2 rounded bg-neutral-50 pt-2 pr-2 pb-2 pl-2 flex-col items-start justify-start border border-solid border-neutral-border bg-default-background pt-4 pr-4 pb-4 pl-4 shadow-default hover:bg-neutral-100",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <SubframeCore.Icon
        className="text-body font-body text-default-font"
        name="FeatherSparkles"
      />
      {text ? (
        <span className="text-caption-bold font-caption-bold text-default-font text-body font-body">
          {text}
        </span>
      ) : null}
    </div>
  );
});

export const AiChatSuggestion = AiChatSuggestionRoot;
