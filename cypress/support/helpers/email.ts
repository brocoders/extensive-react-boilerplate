import mailParser from "mailparser";
import Imap from "imap";

const imap = new Imap({
  user: process.env.TEST_IMAP_USER ?? "",
  password: process.env.TEST_IMAP_PASSWORD ?? "",
  host: process.env.TEST_IMAP_HOST ?? "",
  port: Number(process.env.TEST_IMAP_PORT) ?? 993,
  tls: process.env.TEST_IMAP_TLS === "true",
});

function connectImap() {
  if (imap.state !== "authenticated") {
    return new Promise((resolve, reject) => {
      imap.once("ready", resolve);
      imap.once("error", reject);
      imap.connect();
    });
  }

  return Promise.resolve();
}

export async function getLatestEmail() {
  await connectImap();

  return new Promise((resolve, reject) => {
    imap.openBox("INBOX", true, (error, box) => {
      if (error) reject(error);

      const fetchImap = imap.seq.fetch(`${box.messages.total}:*`, {
        bodies: "",
      });

      fetchImap.on("message", (message) => {
        message.on("body", (stream) => {
          let content = "";

          stream.on("data", (chunk) => {
            content += chunk.toString("utf-8");
          });

          stream.once("end", () => {
            mailParser.simpleParser(content, (error, mail) => {
              if (error) reject(error);

              resolve(mail);
            });
          });
        });
      });
    });
  });
}
