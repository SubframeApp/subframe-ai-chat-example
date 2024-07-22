"use client";
/*
 * Documentation:
 * AI Chat Received — https://app.subframe.com/ec98ea52812e/library?component=AI+Chat+Received_f3f2b42c-0949-4269-9ba9-0f247778a839
 * Icon with background — https://app.subframe.com/ec98ea52812e/library?component=Icon+with+background_c5d68c0e-4c0c-4cff-8d8c-6ff334859b3a
 * AI Chat Toolbar — https://app.subframe.com/ec98ea52812e/library?component=AI+Chat+Toolbar_e3cd651a-0a0f-441e-8ea8-b0fe066515e7
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { IconWithBackground } from "./IconWithBackground";
import { AiChatToolbar } from "./AiChatToolbar";

interface AiChatReceivedRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const AiChatReceivedRoot = React.forwardRef<
  HTMLElement,
  AiChatReceivedRootProps
>(function AiChatReceivedRoot(
  { children, className, ...otherProps }: AiChatReceivedRootProps,
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
      <IconWithBackground size="medium" icon="FeatherSparkle" />
      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
        {children ? (
          <div className="flex w-full flex-col items-start pt-1.5">
            {children}
          </div>
        ) : null}
        <AiChatToolbar />
      </div>
    </div>
  );
});

export const AiChatReceived = AiChatReceivedRoot;
