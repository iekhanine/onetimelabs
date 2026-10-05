export type AssessmentReportAnswer = {
  id: string;
  category: string;
  question: string;
  answer: string;
  answerLabel: string;
};

export type AssessmentReportSubmission = {
  id: string;
  assessment_type: string;
  assessment_title: string;
  score: number;
  rating: string;
  category_scores: Record<string, number> | null;
  critical_flags: Array<{ title: string; recommendation: string; question?: string }> | null;
  answers: AssessmentReportAnswer[] | null;
  contact_name: string | null;
  contact_company: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  consultation_notes: Record<string, string> | null;
  consultation_summary: string | null;
  implementation_plan_notes: string | null;
  created_at: string;
  updated_at?: string | null;
};

type Page = { commands: string[] };

type TextOptions = {
  size?: number;
  bold?: boolean;
  color?: [number, number, number];
  maxWidth?: number;
  lineHeight?: number;
  after?: number;
};

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const LEFT = 48;
const RIGHT = 48;
const CONTENT_WIDTH = PAGE_WIDTH - LEFT - RIGHT;
const HEADER_LINE_Y = 716;
const FOOTER_Y = 31;
const NAVY: [number, number, number] = [7 / 255, 17 / 255, 29 / 255];
const BLUE: [number, number, number] = [22 / 255, 117 / 255, 209 / 255];
const TEXT: [number, number, number] = [23 / 255, 38 / 255, 56 / 255];
const MUTED: [number, number, number] = [98 / 255, 117 / 255, 137 / 255];
const LIGHT: [number, number, number] = [235 / 255, 241 / 255, 247 / 255];
const RED: [number, number, number] = [156 / 255, 46 / 255, 27 / 255];

function sanitizeText(value: unknown) {
  return String(value ?? "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00A0/g, " ")
    .normalize("NFKD")
    .replace(/[^\x20-\x7E\n\r\t]/g, "")
    .replace(/\t/g, "  ");
}

function pdfString(value: string) {
  return sanitizeText(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function colorCommand(color: [number, number, number], stroke = false) {
  return `${color.map((value) => value.toFixed(3)).join(" ")} ${stroke ? "RG" : "rg"}`;
}

function estimateLineChars(width: number, fontSize: number, bold: boolean) {
  return Math.max(12, Math.floor(width / (fontSize * (bold ? 0.57 : 0.53))));
}

function wrapText(text: string, width: number, fontSize: number, bold = false) {
  const paragraphs = sanitizeText(text).split(/\r?\n/);
  const maxChars = estimateLineChars(width, fontSize, bold);
  const lines: string[] = [];

  for (let p = 0; p < paragraphs.length; p += 1) {
    const paragraph = paragraphs[p].trim();
    if (!paragraph) {
      lines.push("");
      continue;
    }

    const words = paragraph.split(/\s+/);
    let line = "";
    for (const word of words) {
      if (!line) {
        line = word;
        continue;
      }
      if (`${line} ${word}`.length <= maxChars) {
        line += ` ${word}`;
      } else {
        lines.push(line);
        if (word.length > maxChars) {
          let remaining = word;
          while (remaining.length > maxChars) {
            lines.push(remaining.slice(0, maxChars));
            remaining = remaining.slice(maxChars);
          }
          line = remaining;
        } else {
          line = word;
        }
      }
    }
    if (line) lines.push(line);
    if (p < paragraphs.length - 1 && paragraphs[p + 1].trim()) lines.push("");
  }

  return lines.length ? lines : [""];
}

class ReportComposer {
  pages: Page[] = [];
  page!: Page;
  y = 0;

  constructor(private readonly logoWidth = 1070, private readonly logoHeight = 1070) {
    this.newPage();
  }

  private command(value: string) {
    this.page.commands.push(value);
  }

  private drawTextAt(text: string, x: number, y: number, size: number, bold = false, color = TEXT) {
    if (!text) return;
    this.command(`BT /${bold ? "F2" : "F1"} ${size.toFixed(1)} Tf ${colorCommand(color)} 1 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)} Tm (${pdfString(text)}) Tj ET`);
  }

  private drawRect(x: number, y: number, width: number, height: number, color: [number, number, number], stroke?: [number, number, number]) {
    this.command(`${colorCommand(color)} ${x.toFixed(1)} ${y.toFixed(1)} ${width.toFixed(1)} ${height.toFixed(1)} re f`);
    if (stroke) this.command(`${colorCommand(stroke, true)} 0.7 w ${x.toFixed(1)} ${y.toFixed(1)} ${width.toFixed(1)} ${height.toFixed(1)} re S`);
  }

  private drawLine(x1: number, y1: number, x2: number, y2: number, color = LIGHT, width = 0.7) {
    this.command(`${colorCommand(color, true)} ${width.toFixed(1)} w ${x1.toFixed(1)} ${y1.toFixed(1)} m ${x2.toFixed(1)} ${y2.toFixed(1)} l S`);
  }

  private drawHeader() {
    this.command(`q 30 0 0 30 ${LEFT.toFixed(1)} 735.0 cm /Im1 Do Q`);
    this.drawTextAt("OneTime Labs", 84, 750, 12.5, true, NAVY);
    this.drawTextAt("CLIENT ASSESSMENT REPORT", 84, 735, 7.8, true, MUTED);
    this.drawLine(LEFT, HEADER_LINE_Y, PAGE_WIDTH - RIGHT, HEADER_LINE_Y, [210 / 255, 220 / 255, 231 / 255], 0.8);
  }

  newPage() {
    this.page = { commands: [] };
    this.pages.push(this.page);
    this.drawHeader();
    this.y = 694;
  }

  ensureSpace(height: number) {
    if (this.y - height < 58) this.newPage();
  }

  text(text: string, options: TextOptions = {}) {
    const size = options.size ?? 10.5;
    const bold = options.bold ?? false;
    const color = options.color ?? TEXT;
    const maxWidth = options.maxWidth ?? CONTENT_WIDTH;
    const lineHeight = options.lineHeight ?? size * 1.42;
    const after = options.after ?? 7;
    const lines = wrapText(text, maxWidth, size, bold);

    for (const line of lines) {
      this.ensureSpace(lineHeight + 2);
      if (line) this.drawTextAt(line, LEFT, this.y, size, bold, color);
      this.y -= lineHeight;
    }
    this.y -= after;
  }

  title(text: string) {
    const lines = wrapText(text, CONTENT_WIDTH, 23, true);
    this.ensureSpace(lines.length * 29 + 15);
    for (const line of lines) {
      this.drawTextAt(line, LEFT, this.y, 23, true, NAVY);
      this.y -= 28;
    }
    this.y -= 6;
  }

  section(text: string) {
    this.ensureSpace(34);
    this.drawRect(LEFT, this.y - 4, 4, 20, BLUE);
    this.drawTextAt(text, LEFT + 12, this.y, 15.5, true, NAVY);
    this.y -= 31;
  }

  labelValue(label: string, value: string) {
    this.ensureSpace(24);
    this.drawTextAt(label.toUpperCase(), LEFT, this.y, 7.8, true, MUTED);
    const valueLines = wrapText(value || "Not provided", CONTENT_WIDTH - 130, 10.5, true);
    let localY = this.y;
    for (const line of valueLines) {
      this.drawTextAt(line, LEFT + 130, localY, 10.5, true, TEXT);
      localY -= 14;
    }
    this.y = Math.min(this.y - 18, localY - 4);
    this.drawLine(LEFT, this.y + 4, PAGE_WIDTH - RIGHT, this.y + 4, [232 / 255, 237 / 255, 243 / 255], 0.5);
  }

  scoreBox(score: number, rating: string) {
    this.ensureSpace(92);
    const top = this.y;
    this.drawRect(LEFT, top - 72, CONTENT_WIDTH, 72, NAVY);
    this.drawTextAt(String(score), LEFT + 20, top - 43, 31, true, [1, 1, 1]);
    this.drawTextAt("/100", LEFT + 68, top - 43, 10, true, [180 / 255, 203 / 255, 225 / 255]);
    this.drawTextAt(rating, LEFT + 130, top - 34, 17, true, [1, 1, 1]);
    this.drawTextAt("ASSESSMENT RESULT", LEFT + 130, top - 51, 7.5, true, [143 / 255, 198 / 255, 1]);
    this.y -= 88;
  }

  categoryRow(label: string, score: number) {
    this.ensureSpace(28);
    const labelWidth = 210;
    const barX = LEFT + labelWidth;
    const barWidth = CONTENT_WIDTH - labelWidth - 45;
    this.drawTextAt(label, LEFT, this.y, 9.2, true, TEXT);
    this.drawRect(barX, this.y - 1, barWidth, 7, [233 / 255, 238 / 255, 244 / 255]);
    this.drawRect(barX, this.y - 1, Math.max(0, Math.min(barWidth, barWidth * (score / 100))), 7, BLUE);
    this.drawTextAt(`${score}%`, PAGE_WIDTH - RIGHT - 34, this.y, 9.2, true, TEXT);
    this.y -= 24;
  }

  callout(title: string, body: string, danger = false) {
    const titleLines = wrapText(title, CONTENT_WIDTH - 28, 10.5, true);
    const bodyLines = wrapText(body, CONTENT_WIDTH - 28, 9.5, false);
    const height = 18 + titleLines.length * 14 + bodyLines.length * 13 + 12;
    if (height < 210) this.ensureSpace(height + 8);
    const top = this.y;
    const fill = danger ? [1, 247 / 255, 244 / 255] as [number, number, number] : [247 / 255, 250 / 255, 253 / 255] as [number, number, number];
    const border = danger ? [241 / 255, 194 / 255, 184 / 255] as [number, number, number] : [218 / 255, 228 / 255, 238 / 255] as [number, number, number];
    this.drawRect(LEFT, top - height + 5, CONTENT_WIDTH, height, fill, border);
    let lineY = top - 14;
    for (const line of titleLines) {
      this.drawTextAt(line, LEFT + 14, lineY, 10.5, true, danger ? RED : NAVY);
      lineY -= 14;
    }
    lineY -= 2;
    for (const line of bodyLines) {
      this.drawTextAt(line, LEFT + 14, lineY, 9.5, false, danger ? [113 / 255, 79 / 255, 72 / 255] : [64 / 255, 84 / 255, 104 / 255]);
      lineY -= 13;
    }
    this.y = top - height - 6;
  }

  noteBlock(category: string, question: string, response: string, note: string) {
    const qLines = wrapText(question, CONTENT_WIDTH, 10.5, true);
    const nLines = wrapText(note, CONTENT_WIDTH, 10, false);
    const estimated = 20 + qLines.length * 15 + Math.min(nLines.length, 8) * 14 + 25;
    this.ensureSpace(Math.min(estimated, 180));
    this.drawTextAt(category.toUpperCase(), LEFT, this.y, 7.6, true, BLUE);
    this.y -= 14;
    for (const line of qLines) {
      this.ensureSpace(17);
      this.drawTextAt(line, LEFT, this.y, 10.5, true, NAVY);
      this.y -= 15;
    }
    this.drawTextAt(`Assessment response: ${response}`, LEFT, this.y, 8.5, true, MUTED);
    this.y -= 17;
    for (const line of nLines) {
      this.ensureSpace(16);
      if (line) this.drawTextAt(line, LEFT, this.y, 10, false, TEXT);
      this.y -= line ? 14 : 8;
    }
    this.y -= 8;
    this.drawLine(LEFT, this.y + 4, PAGE_WIDTH - RIGHT, this.y + 4, [225 / 255, 232 / 255, 239 / 255], 0.6);
    this.y -= 9;
  }

  answerBlock(answer: AssessmentReportAnswer) {
    const qLines = wrapText(answer.question, CONTENT_WIDTH - 110, 9.2, false);
    const height = Math.max(33, qLines.length * 12 + 15);
    this.ensureSpace(height + 7);
    this.drawTextAt(answer.category.toUpperCase(), LEFT, this.y, 7, true, MUTED);
    this.drawTextAt(answer.answerLabel, PAGE_WIDTH - RIGHT - 105, this.y, 8.5, true, BLUE);
    this.y -= 13;
    for (const line of qLines) {
      this.drawTextAt(line, LEFT, this.y, 9.2, false, TEXT);
      this.y -= 12;
    }
    this.y -= 7;
    this.drawLine(LEFT, this.y + 3, PAGE_WIDTH - RIGHT, this.y + 3, [235 / 255, 240 / 255, 245 / 255], 0.5);
  }

  addFooters() {
    const total = this.pages.length;
    this.pages.forEach((page, index) => {
      page.commands.push(`BT /F1 8 Tf ${colorCommand(MUTED)} 1 0 0 1 281 ${FOOTER_Y} Tm (Page ${index + 1} of ${total}) Tj ET`);
    });
  }
}

function buildPdfObjects(pages: Page[], logoJpeg: Buffer, logoWidth: number, logoHeight: number) {
  const objects: Buffer[] = [];
  const pageObjectNumbers = pages.map((_, index) => 6 + index * 2);
  const contentObjectNumbers = pages.map((_, index) => 7 + index * 2);

  objects[1] = Buffer.from(`<< /Type /Catalog /Pages 2 0 R >>`);
  objects[2] = Buffer.from(`<< /Type /Pages /Kids [${pageObjectNumbers.map((n) => `${n} 0 R`).join(" ")}] /Count ${pages.length} >>`);
  objects[3] = Buffer.from(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`);
  objects[4] = Buffer.from(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`);
  const imageHeader = Buffer.from(`<< /Type /XObject /Subtype /Image /Width ${logoWidth} /Height ${logoHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${logoJpeg.length} >>\nstream\n`);
  objects[5] = Buffer.concat([imageHeader, logoJpeg, Buffer.from(`\nendstream`)]);

  pages.forEach((page, index) => {
    const pageNo = pageObjectNumbers[index];
    const contentNo = contentObjectNumbers[index];
    const content = Buffer.from(page.commands.join("\n") + "\n", "ascii");
    objects[pageNo] = Buffer.from(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << /Im1 5 0 R >> >> /Contents ${contentNo} 0 R >>`);
    objects[contentNo] = Buffer.concat([Buffer.from(`<< /Length ${content.length} >>\nstream\n`), content, Buffer.from("endstream")]);
  });

  const header = Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "binary");
  const chunks: Buffer[] = [header];
  const offsets: number[] = [0];
  let offset = header.length;
  const maxObject = objects.length - 1;

  for (let i = 1; i <= maxObject; i += 1) {
    const body = objects[i];
    if (!body) throw new Error(`Missing PDF object ${i}`);
    offsets[i] = offset;
    const start = Buffer.from(`${i} 0 obj\n`);
    const end = Buffer.from(`\nendobj\n`);
    chunks.push(start, body, end);
    offset += start.length + body.length + end.length;
  }

  const xrefOffset = offset;
  const xrefLines = [`xref`, `0 ${maxObject + 1}`, `0000000000 65535 f `];
  for (let i = 1; i <= maxObject; i += 1) {
    xrefLines.push(`${String(offsets[i]).padStart(10, "0")} 00000 n `);
  }
  const xref = Buffer.from(`${xrefLines.join("\n")}\n`);
  const trailer = Buffer.from(`trailer\n<< /Size ${maxObject + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);
  chunks.push(xref, trailer);
  return Buffer.concat(chunks);
}

export function buildAssessmentReportPdf(
  submission: AssessmentReportSubmission,
  logoJpeg: Buffer,
  logoWidth = 1070,
  logoHeight = 1070,
) {
  const composer = new ReportComposer(logoWidth, logoHeight);
  const clientName = submission.contact_company || submission.contact_name || "Assessment client";
  const reportDate = new Date(submission.updated_at || submission.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  composer.text("PREPARED FOR", { size: 8, bold: true, color: BLUE, after: 5 });
  composer.title(clientName);
  composer.text(submission.assessment_title, { size: 13, bold: true, color: MUTED, after: 3 });
  composer.text(`Assessment completed ${new Date(submission.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}  |  Report updated ${reportDate}`, { size: 8.5, color: MUTED, after: 16 });
  composer.scoreBox(submission.score, submission.rating);

  composer.section("Assessment overview");
  composer.labelValue("Assessment", submission.assessment_title);
  composer.labelValue("Client", clientName);
  if (submission.contact_name && submission.contact_company) composer.labelValue("Contact", submission.contact_name);
  if (submission.contact_email) composer.labelValue("Email", submission.contact_email);

  const categories = Object.entries(submission.category_scores || {});
  if (categories.length) {
    composer.section("Category breakdown");
    for (const [category, score] of categories) composer.categoryRow(category, Number(score) || 0);
    composer.text(
      submission.assessment_type === "vendor-migration"
        ? "For this risk assessment, higher category percentages indicate more exposure."
        : "For maturity assessments, higher category percentages indicate stronger capability and control maturity.",
      { size: 8.5, color: MUTED, after: 12 },
    );
  }

  const flags = submission.critical_flags || [];
  if (flags.length) {
    composer.section("Critical risks");
    for (const flag of flags) composer.callout(flag.title, flag.recommendation, true);
  }

  if (submission.consultation_summary) {
    composer.section("Consultation summary");
    composer.text(submission.consultation_summary, { size: 10.5, lineHeight: 15, after: 13 });
  }

  if (submission.implementation_plan_notes) {
    composer.section("Implementation plan");
    composer.text(submission.implementation_plan_notes, { size: 10.5, lineHeight: 15, after: 13 });
  }

  const notes = submission.consultation_notes || {};
  const answerMap = new Map((submission.answers || []).map((answer) => [answer.id, answer]));
  const noteEntries = Object.entries(notes).filter(([, note]) => String(note || "").trim());
  if (noteEntries.length) {
    composer.section("Consultation notes");
    for (const [questionId, note] of noteEntries) {
      const answer = answerMap.get(questionId);
      composer.noteBlock(
        answer?.category || "Consultation",
        answer?.question || "Discussion note",
        answer?.answerLabel || "Not recorded",
        note,
      );
    }
  }

  const answers = submission.answers || [];
  if (answers.length) {
    composer.section("Assessment responses");
    composer.text("The original assessment responses are included for reference.", { size: 9, color: MUTED, after: 9 });
    for (const answer of answers) composer.answerBlock(answer);
  }

  composer.addFooters();
  return buildPdfObjects(composer.pages, logoJpeg, logoWidth, logoHeight);
}
