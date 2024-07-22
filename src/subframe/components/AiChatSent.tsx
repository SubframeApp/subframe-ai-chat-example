"use client";
/*
 * Documentation:
 * AI Chat Sent — https://app.subframe.com/ec98ea52812e/library?component=AI+Chat+Sent_6bd95403-e7ef-4ac8-90f4-2cfb62a6824f
 * Avatar — https://app.subframe.com/ec98ea52812e/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { Avatar } from "./Avatar";

interface AiChatSentRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  avatar?: string;
  className?: string;
}

const AiChatSentRoot = React.forwardRef<HTMLElement, AiChatSentRootProps>(
  function AiChatSentRoot(
    { children, avatar, className, ...otherProps }: AiChatSentRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeCore.twClassNames(
          "flex w-full items-start gap-4 pt-2 pb-2",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <Avatar image={avatar}>AB</Avatar>
        {children ? (
          <div className="flex grow shrink-0 basis-0 items-center gap-4 pt-1.5">
            {children}
          </div>
        ) : null}
      </div>
    );
  }
);

export const AiChatSent = AiChatSentRoot;
