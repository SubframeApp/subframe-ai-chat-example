"use client";

import { Attachment } from "@ai-sdk/ui-utils";
import { CreateMessage, Message } from "ai";
import React, {useRef, useState} from "react";
import * as SubframeCore from "@subframe/core";
import { Button } from "@/subframe/components/Button";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import { IconButton } from "@/subframe/components/IconButton";
import { AiChatSent } from "@/subframe/components/AiChatSent";
import { AiChatReceived } from "@/subframe/components/AiChatReceived";
import { AiChatSuggestion } from "@/subframe/components/AiChatSuggestion";
import { TextField } from "@/subframe/components/TextField";
import { useChat } from "@ai-sdk/react";
import { MODEL_TO_FRIENDLY_NAME, SUPPORTED_MODELS} from "@/src/app/model-helpers";

function AiChat() {
  const [model, setModel] = useState<SUPPORTED_MODELS>("gpt-4o-mini");
  const { messages, setMessages, input, setInput, append } = useChat();
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function appendWithChatOptions(message: Message | CreateMessage) {
    if (!attachment) {
      return append(message,  {data: {model}});
    }

    setAttachment(null);
    return append({...message, experimental_attachments: [attachment]},  {data: {model}});
  }

  return (
    <div className="container max-w-none flex h-full w-full flex-col items-center gap-6 bg-default-background pt-12 pr-6 pl-6">
      <div className="flex w-full max-w-[576px] items-center gap-4">
        <div className="flex grow shrink-0 basis-0 items-center gap-2">
          <SubframeCore.Icon
            className="text-heading-2 font-heading-2 text-default-font"
            name="FeatherMessageCircle"
          />
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <Button
                variant="neutral-tertiary"
              >
                {MODEL_TO_FRIENDLY_NAME[model]}
              </Button>
            </SubframeCore.DropdownMenu.Trigger>
            <SubframeCore.DropdownMenu.Portal>
              <SubframeCore.DropdownMenu.Content
                side="bottom"
                align="start"
                sideOffset={4}
                asChild={true}
              >
                <DropdownMenu>
                  {
                    Object.entries(MODEL_TO_FRIENDLY_NAME).map(([key, value]) => (
                      <DropdownMenu.DropdownItem
                        key={key}
                        icon={null}
                        onSelect={() => setModel(key as SUPPORTED_MODELS)}
                      >
                        {value}
                      </DropdownMenu.DropdownItem>
                    ))
                  }
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
        </div>
        <div className="flex items-center gap-2">
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <IconButton
                icon="FeatherMoreHorizontal"
              />
            </SubframeCore.DropdownMenu.Trigger>
            <SubframeCore.DropdownMenu.Portal>
              <SubframeCore.DropdownMenu.Content
                side="bottom"
                align="start"
                sideOffset={4}
                asChild={true}
              >
                <DropdownMenu>
                  <DropdownMenu.DropdownItem icon={null} onClick={() => setMessages([])}>
                    Delete
                  </DropdownMenu.DropdownItem>
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
        </div>
      </div>
      <div className="flex w-full max-w-[576px] grow shrink-0 basis-0 flex-col items-start relative">
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 pb-4 overflow-auto">
          {messages.map((message, index) => {
            if (message.role === 'user') {
              return (
                <AiChatSent key={index} avatar="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif">
                  <div className="flex flex-col gap-2">
                  <span className="grow shrink-0 basis-0 text-body font-body text-default-font">
                    {message.content}
                  </span>
                    {message.experimental_attachments && (
                      <div key={index} className="flex items-center gap-2">
                        <img
                          className="h-12 w-12 flex-none object-cover rounded-md"
                          alt={message.experimental_attachments[0].name}
                          src={message.experimental_attachments[0].url}
                        />
                      </div>
                    )}
                  </div>
                </AiChatSent>
              );
            } else {
              return (
                <AiChatReceived key={index}>
                  <span className="grow shrink-0 basis-0 text-body font-body text-default-font">
                    {message.content}
                  </span>
                </AiChatReceived>
              );
            }
          })}
          {
            messages.length === 0 && (
              <div className="flex flex-wrap items-start gap-2 self-center">
                <AiChatSuggestion text="Plan a relaxing day" onClick={async () => {
                  await appendWithChatOptions({content: "Could you help me plan a relaxing day that focuses on activities for rejuvenation? To start, can you ask me what my favorite forms of relaxation are?", role: 'user'})
                }} />
                <AiChatSuggestion text="Thank my interviewer" onClick={async () => {
                  await appendWithChatOptions({content: "Write 2-3 sentences to thank my interviewer, reiterating my excitement for the job opportunity while keeping it cool. Don't make it too formal.", role: 'user'})
                }} />
                <AiChatSuggestion text="Fun fact about Roman Empire" onClick={async () => {
                  await appendWithChatOptions({content: "Tell me a random fun fact about the Roman Empire", role: 'user'})
                }} />
              </div>
            )
          }
        </div>
        <div className="flex w-full max-w-[576px] flex-col items-start gap-8 bg-default-background">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".png,.jpeg,.gif,.webp"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (!event.target.files) {
                return
              }

              const file = event.target.files[0];
              const reader = new FileReader();
              reader.onload = (e) => {
                if (e.target?.result && typeof e.target.result === 'string') {
                  setAttachment({name: file.name, url: e.target.result, contentType: file.type});
                }
              };
              reader.readAsDataURL(file);
            }}
          />
          <div className="flex w-full flex-col items-start gap-2 pb-4">
            <div className="flex w-full items-end gap-2 overflow-hidden rounded-2xl bg-neutral-100 pt-3 pr-4 pb-3 pl-4">
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <IconButton
                    variant="brand-tertiary"
                  />
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="top"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon="FeatherImage" onSelect={() => {fileInputRef.current?.click()}}>
                        Add image
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4">
                {attachment &&
                    <div className="flex flex-col items-start gap-2 pl-4">
                        <div className="flex items-start gap-2 relative group">
                            <img
                                className="h-12 w-12 flex-none object-cover rounded-md"
                                alt={attachment.name}
                                src={attachment.url}
                            />
                            <IconButton
                                className="absolute -right-2 -top-2 hidden group-hover:flex rounded-full"
                                variant="neutral-primary"
                                size="small"
                                icon="FeatherX"
                                onClick={() => {
                                  setAttachment(null)
                                }}
                            />
                        </div>
                    </div>
                }
                <div className="flex w-full items-center gap-2">
                  <TextField
                    className="h-auto grow shrink-0 basis-0"
                    variant="filled"
                    label=""
                    helpText=""
                    iconRight="FeatherCornerDownLeft"
                  >
                    <TextField.Input
                      placeholder="Chat with me..."
                      value={input}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setInput(event.target.value)
                      }}
                      onKeyDown={async event => {
                        if (event.key === "Enter") {
                          setInput("")
                          await appendWithChatOptions({content: input, role: 'user'})
                        }
                      }}
                    />
                  </TextField>
                </div>
              </div>
            </div>
            <span className="w-full text-caption font-caption text-subtext-color text-center">
              AI can make mistakes. Always double check the source.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiChat;