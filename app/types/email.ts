export type HeaderMap = Record<string, string[]>;
export type Attachment = { filename: string; contentType: string; disposition: string; embedded: boolean };
export type ParsedEmail = {
  headers: HeaderMap; from: string; to: string; cc: string; subject: string; date: string; messageId: string;
  inReplyTo: string; deliveredTo: string; returnPath: string; spf: string; dkim: string; dmarc: string;
  received: string[]; body: string; attachments: Attachment[]; rawHeaders: string; rawBody: string; raw: string;
};
