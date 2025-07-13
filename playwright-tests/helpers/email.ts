interface MailDevEmail {
  html: string;
  text: string;
  headers: {
    from: string;
    to: string;
    subject: string;
    "message-id": string;
    date: string;
    "mime-version": string;
    "content-type": string;
  };
  subject: string;
  messageId: string;
  priority: string;
  from: Array<{ address: string; name: string }>;
  to: Array<{ address: string; name: string }>;
  date: string;
  id: string;
  time: string;
  read: boolean;
  envelope: {
    from: { address: string; args: boolean };
    to: Array<{ address: string; args: boolean }>;
    host: string;
    remoteAddress: string;
  };
  source: string;
  size: number;
  sizeHuman: string;
  attachments: null;
  calculatedBcc: unknown[];
}

const MAILDEV_BASE_URL =
  process.env.MAILDEV_BASE_URL ?? "http://localhost:1080";

export async function getLatestEmail({
  targetEmail,
}: {
  targetEmail: string;
}): Promise<MailDevEmail> {
  try {
    const response = await fetch(`${MAILDEV_BASE_URL}/email`);

    if (!response.ok) {
      throw new Error(`Failed to fetch emails: ${response.statusText}`);
    }

    const emails: MailDevEmail[] = await response.json();

    // Filter emails by target email address
    const filteredEmails = emails.filter(
      (email) =>
        email.to.some(
          (recipient) =>
            recipient.address.toLowerCase() === targetEmail.toLowerCase()
        ) ||
        email.envelope.to.some(
          (recipient) =>
            recipient.address.toLowerCase() === targetEmail.toLowerCase()
        )
    );

    if (filteredEmails.length === 0) {
      throw new Error("No emails found to the target email address.");
    }

    return filteredEmails[filteredEmails.length - 1];
  } catch (error) {
    throw new Error(
      `Failed to get latest email: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
