(() => {
  "use strict";

  const STORAGE_KEY = "otl-local-mail-merge-v1";

  const DEFAULT_SUBJECT = "Local Racine developer — offering my time and experience";
  const DEFAULT_BODY = `Hi {{first_name}}!

My name is Ivan Khanine. I’m a software developer here in Racine, and I recently separated from my role at SC Johnson.

After leaving SC Johnson, I started my own company, OneTime Labs (www.onetimelabs.net), with the goal of using the enterprise experience I’ve gained over more than 20 years in IT to help nonprofits and small to midsize businesses. You can also see more of my background and work at www.ivankay.org.

{{merge_lines}}

I wanted to reach out because I’d love the opportunity to get involved with what {{organization}} is doing, whether that means volunteering some of my time, helping solve a specific technology or workflow problem, or simply having a conversation about where my experience might be useful. :)

My background includes work with organizations such as SC Johnson, Google, Apple, and Hewlett-Packard, but my focus now is much more local. I’m interested in helping organizations solve everyday operational problems without requiring enterprise-sized budgets or complicated technology.

A lot of what I build revolves around simplifying workflows, organizing information, reducing repetitive work, improving internal processes, and giving organizations better tools to manage what they already do.

One of my current projects is a civic participation and proxy-voting platform being developed for Portland District 3. It allows residents to raise community issues, develop proposals, participate directly or through delegated voting, and follow an issue through the decision-making process.

You can see that project here:
https://d3connect.onetimelabs.net

On a much smaller scale, I recently helped a local bicycle repair business build its own customer-facing service portal and a full administrative dashboard for managing the business behind the scenes.

That one was completely voluntary — basically, I saw that he had a need, I had some free time, and I figured I could help. Haha.

[Attach front-end screenshot]

[Attach admin dashboard screenshot]

I’m local, I enjoy building practical systems that make people’s jobs easier, and I’d be happy to help however I can.

Even if there isn’t an immediate need, I’d be glad to introduce myself and become a resource you can reach out to if something comes up down the road.

Thank you for your time!

Ivan Khanine
OneTime Labs
www.onetimelabs.net
www.ivankay.org`;

  const sampleRecipients = [
    {
      id: cryptoRandomId(),
      firstName: "",
      organization: "",
      email: "",
      lines: [""],
      sent: false
    }
  ];

  let state = loadState() || {
    subjectTemplate: DEFAULT_SUBJECT,
    bodyTemplate: DEFAULT_BODY,
    recipients: sampleRecipients,
    activeFilter: "all"
  };

  let focusedTemplateField = "bodyTemplate";
  let toastTimer;

  const el = (id) => document.getElementById(id);
  const subjectTemplate = el("subjectTemplate");
  const bodyTemplate = el("bodyTemplate");
  const recipientList = el("recipientList");
  const generatedList = el("generatedList");
  const recipientSearch = el("recipientSearch");
  const generatedSearch = el("generatedSearch");
  const bulkDialog = el("bulkDialog");
  const bulkInput = el("bulkInput");

  function cryptoRandomId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `r-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function normalizeState(raw) {
    return {
      subjectTemplate: typeof raw?.subjectTemplate === "string" ? raw.subjectTemplate : DEFAULT_SUBJECT,
      bodyTemplate: typeof raw?.bodyTemplate === "string" ? raw.bodyTemplate : DEFAULT_BODY,
      activeFilter: ["all", "sent", "unsent"].includes(raw?.activeFilter) ? raw.activeFilter : "all",
      recipients: Array.isArray(raw?.recipients) ? raw.recipients.map((r) => ({
        id: r.id || cryptoRandomId(),
        firstName: String(r.firstName || ""),
        organization: String(r.organization || ""),
        email: String(r.email || ""),
        lines: Array.isArray(r.lines) && r.lines.length ? r.lines.map((x) => String(x || "")) : [""],
        sent: Boolean(r.sent)
      })) : []
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? normalizeState(JSON.parse(raw)) : null;
    } catch (error) {
      console.warn("Could not load local merge state", error);
      return null;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Could not save local merge state", error);
    }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function replaceTokens(template, recipient) {
    const nonEmptyLines = recipient.lines.map((line) => line.trim()).filter(Boolean);
    const replacements = {
      first_name: recipient.firstName.trim(),
      organization: recipient.organization.trim(),
      email: recipient.email.trim(),
      merge_lines: nonEmptyLines.join("\n\n")
    };

    nonEmptyLines.forEach((line, index) => {
      replacements[`merge_line_${index + 1}`] = line;
    });

    return String(template || "").replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, key) => {
      return Object.prototype.hasOwnProperty.call(replacements, key) ? replacements[key] : `{{${key}}}`;
    });
  }

  function unresolvedTokens(text) {
    return [...new Set((String(text).match(/{{\s*[a-zA-Z0-9_]+\s*}}/g) || []))];
  }

  function recipientReady(recipient) {
    const subject = replaceTokens(state.subjectTemplate, recipient);
    const body = replaceTokens(state.bodyTemplate, recipient);
    return Boolean(recipient.firstName.trim() && recipient.organization.trim() && !unresolvedTokens(`${subject}\n${body}`).length);
  }

  function setTab(name) {
    document.querySelectorAll(".tab").forEach((button) => button.classList.toggle("is-active", button.dataset.tab === name));
    document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("is-active", panel.id === `panel-${name}`));
    if (name === "generated") renderGenerated();
  }

  function showToast(message) {
    const toast = el("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  async function copyText(text, message = "Copied") {
    try {
      await navigator.clipboard.writeText(text);
      showToast(message);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      showToast(message);
    }
  }

  function downloadFile(filename, content, type = "text/plain;charset=utf-8") {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function updateStats() {
    const readyCount = state.recipients.filter(recipientReady).length;
    const sentCount = state.recipients.filter((r) => r.sent).length;
    el("recipientCountStat").textContent = state.recipients.length;
    el("generatedCountStat").textContent = readyCount;
    el("sentCountStat").textContent = sentCount;
    el("recipientSummary").textContent = `${state.recipients.length} recipient${state.recipients.length === 1 ? "" : "s"} • ${readyCount} ready`;
  }

  function renderTemplate() {
    subjectTemplate.value = state.subjectTemplate;
    bodyTemplate.value = state.bodyTemplate;
    el("bodyCharCount").textContent = `${state.bodyTemplate.length.toLocaleString()} characters`;
  }

  function recipientLabel(recipient, index) {
    const who = recipient.firstName.trim();
    const org = recipient.organization.trim();
    if (who && org) return `${who} — ${org}`;
    return who || org || `Recipient ${index + 1}`;
  }

  function renderRecipients() {
    const query = recipientSearch.value.trim().toLowerCase();
    const matches = state.recipients
      .map((recipient, index) => ({ recipient, index }))
      .filter(({ recipient }) => {
        const haystack = `${recipient.firstName} ${recipient.organization} ${recipient.email} ${recipient.lines.join(" ")}`.toLowerCase();
        return !query || haystack.includes(query);
      });

    recipientList.innerHTML = matches.map(({ recipient, index }) => `
      <article class="recipient-card" data-recipient-id="${escapeHtml(recipient.id)}">
        <div class="recipient-card-header">
          <div>
            <div class="recipient-index">RECIPIENT ${index + 1}</div>
            <div class="recipient-title">${escapeHtml(recipientLabel(recipient, index))}</div>
          </div>
          <div class="recipient-actions">
            <button class="button button-secondary" data-action="duplicate" type="button">Duplicate</button>
            <button class="button button-danger" data-action="delete" type="button">Delete</button>
          </div>
        </div>
        <div class="recipient-grid">
          <div class="field">
            <label>First name</label>
            <input class="text-input" data-field="firstName" type="text" value="${escapeHtml(recipient.firstName)}" placeholder="Lorianne" />
          </div>
          <div class="field">
            <label>Organization</label>
            <input class="text-input" data-field="organization" type="text" value="${escapeHtml(recipient.organization)}" placeholder="Organization name" />
          </div>
          <div class="field">
            <label>Email</label>
            <input class="text-input" data-field="email" type="email" value="${escapeHtml(recipient.email)}" placeholder="name@example.org" />
          </div>
        </div>
        <div class="personalization-block">
          <div class="personalization-top">
            <p class="personalization-heading">Personalization / merge lines</p>
            <button class="button button-secondary" data-action="add-line" type="button">+ Add line</button>
          </div>
          <div class="lines-list">
            ${recipient.lines.map((line, lineIndex) => `
              <div class="line-row" data-line-index="${lineIndex}">
                <span class="line-number">${lineIndex + 1}</span>
                <textarea class="line-input" data-field="line" rows="2" placeholder="Organization-specific line…">${escapeHtml(line)}</textarea>
                <button class="icon-button" data-action="delete-line" aria-label="Delete personalization line" title="Delete line" type="button">×</button>
              </div>
            `).join("")}
          </div>
        </div>
      </article>
    `).join("");

    el("recipientEmpty").hidden = state.recipients.length > 0;
    updateStats();
  }

  function renderGenerated() {
    const query = generatedSearch.value.trim().toLowerCase();
    const filter = state.activeFilter || "all";

    document.querySelectorAll(".filter-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === filter);
    });

    const rows = state.recipients
      .map((recipient, index) => {
        const subject = replaceTokens(state.subjectTemplate, recipient);
        const body = replaceTokens(state.bodyTemplate, recipient);
        const unresolved = unresolvedTokens(`${subject}\n${body}`);
        return { recipient, index, subject, body, unresolved };
      })
      .filter(({ recipient, subject, body }) => {
        if (filter === "sent" && !recipient.sent) return false;
        if (filter === "unsent" && recipient.sent) return false;
        const haystack = `${recipient.firstName} ${recipient.organization} ${recipient.email} ${subject} ${body}`.toLowerCase();
        return !query || haystack.includes(query);
      });

    generatedList.innerHTML = rows.map(({ recipient, index, subject, body, unresolved }) => `
      <article class="generated-card ${recipient.sent ? "is-sent" : ""}" data-recipient-id="${escapeHtml(recipient.id)}">
        <div class="generated-card-header">
          <div>
            <div class="generated-meta">
              <span class="status-pill ${recipient.sent ? "sent" : "unsent"}">${recipient.sent ? "Sent" : "Unsent"}</span>
              <span>${escapeHtml(recipient.email || "No email entered")}</span>
            </div>
            <div class="generated-title">${escapeHtml(recipientLabel(recipient, index))}</div>
          </div>
          <div class="generated-actions">
            <button class="button button-secondary" data-action="copy-subject" type="button">Copy subject</button>
            <button class="button button-secondary" data-action="copy-body" type="button">Copy body</button>
            <button class="button button-primary" data-action="copy-email" type="button">Copy full email</button>
            <button class="button button-secondary" data-action="toggle-sent" type="button">${recipient.sent ? "Mark unsent" : "Mark sent"}</button>
          </div>
        </div>
        <div class="generated-content">
          <div class="generated-subject"><strong>Subject:</strong>${escapeHtml(subject)}</div>
          <pre class="generated-body">${escapeHtml(body)}</pre>
          ${unresolved.length ? `<div class="warning-box"><strong>Missing merge data:</strong> ${escapeHtml(unresolved.join(", "))}</div>` : ""}
        </div>
      </article>
    `).join("");

    el("generatedEmpty").hidden = state.recipients.length > 0;
    updateStats();
  }

  function fullEmailText(recipient) {
    const subject = replaceTokens(state.subjectTemplate, recipient);
    const body = replaceTokens(state.bodyTemplate, recipient);
    return `To: ${recipient.email.trim()}\nSubject: ${subject}\n\n${body}`;
  }

  function allEmailsText(recipients = state.recipients) {
    return recipients.map((recipient, index) => {
      return `==================== EMAIL ${index + 1} ====================\n${fullEmailText(recipient)}`;
    }).join("\n\n\n");
  }

  function addRecipient(partial = {}) {
    state.recipients.push({
      id: cryptoRandomId(),
      firstName: partial.firstName || "",
      organization: partial.organization || "",
      email: partial.email || "",
      lines: Array.isArray(partial.lines) && partial.lines.length ? partial.lines : [""],
      sent: false
    });
    saveState();
    renderRecipients();
    updateStats();
  }

  function getRecipient(id) {
    return state.recipients.find((recipient) => recipient.id === id);
  }

  function getRecipientIndex(id) {
    return state.recipients.findIndex((recipient) => recipient.id === id);
  }

  function parseBulk(text) {
    return text
      .split(/\r?\n/)
      .map((line) => line.trimEnd())
      .filter((line) => line.trim())
      .map((line) => {
        const parts = line.split("\t");
        return {
          firstName: (parts[0] || "").trim(),
          organization: (parts[1] || "").trim(),
          email: (parts[2] || "").trim(),
          lines: parts.slice(3).map((x) => x.trim()).filter(Boolean).length
            ? parts.slice(3).map((x) => x.trim()).filter(Boolean)
            : [""]
        };
      });
  }

  function exportCampaign() {
    const snapshot = {
      exportedAt: new Date().toISOString(),
      app: "OneTime Labs Local Outreach Merge",
      version: 1,
      data: state
    };
    downloadFile(`otl-mail-merge-${new Date().toISOString().slice(0,10)}.json`, JSON.stringify(snapshot, null, 2), "application/json;charset=utf-8");
    showToast("Campaign exported");
  }

  function importCampaign(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        state = normalizeState(parsed.data || parsed);
        saveState();
        renderTemplate();
        renderRecipients();
        renderGenerated();
        showToast("Campaign imported");
      } catch {
        alert("That file does not look like a valid mail merge export.");
      }
    };
    reader.readAsText(file);
  }

  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => setTab(button.dataset.tab));
  });

  subjectTemplate.addEventListener("focus", () => focusedTemplateField = "subjectTemplate");
  bodyTemplate.addEventListener("focus", () => focusedTemplateField = "bodyTemplate");

  subjectTemplate.addEventListener("input", () => {
    state.subjectTemplate = subjectTemplate.value;
    saveState();
    updateStats();
  });

  bodyTemplate.addEventListener("input", () => {
    state.bodyTemplate = bodyTemplate.value;
    el("bodyCharCount").textContent = `${state.bodyTemplate.length.toLocaleString()} characters`;
    saveState();
    updateStats();
  });

  el("tokenList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-token]");
    if (!button) return;
    const target = el(focusedTemplateField) || bodyTemplate;
    const token = button.dataset.token;
    const start = target.selectionStart ?? target.value.length;
    const end = target.selectionEnd ?? start;
    target.value = `${target.value.slice(0, start)}${token}${target.value.slice(end)}`;
    target.focus();
    target.setSelectionRange(start + token.length, start + token.length);
    target.dispatchEvent(new Event("input", { bubbles: true }));
  });

  el("resetTemplateBtn").addEventListener("click", () => {
    if (!confirm("Reset the subject and email body to the default OneTime Labs outreach template? Recipient data will stay intact.")) return;
    state.subjectTemplate = DEFAULT_SUBJECT;
    state.bodyTemplate = DEFAULT_BODY;
    saveState();
    renderTemplate();
    renderGenerated();
    showToast("Template reset");
  });

  el("addRecipientBtn").addEventListener("click", () => addRecipient());
  el("bulkAddBtn").addEventListener("click", () => {
    bulkInput.value = "";
    bulkDialog.showModal();
  });

  el("confirmBulkBtn").addEventListener("click", () => {
    const parsed = parseBulk(bulkInput.value);
    if (!parsed.length) {
      alert("Paste at least one recipient row first.");
      return;
    }
    parsed.forEach(addRecipient);
    bulkDialog.close();
    showToast(`${parsed.length} recipient${parsed.length === 1 ? "" : "s"} added`);
  });

  recipientSearch.addEventListener("input", renderRecipients);
  generatedSearch.addEventListener("input", renderGenerated);

  recipientList.addEventListener("input", (event) => {
    const card = event.target.closest("[data-recipient-id]");
    if (!card) return;
    const recipient = getRecipient(card.dataset.recipientId);
    if (!recipient) return;

    const field = event.target.dataset.field;
    if (["firstName", "organization", "email"].includes(field)) {
      recipient[field] = event.target.value;
    }
    if (field === "line") {
      const row = event.target.closest("[data-line-index]");
      recipient.lines[Number(row.dataset.lineIndex)] = event.target.value;
    }
    saveState();
    updateStats();

    const title = card.querySelector(".recipient-title");
    const index = getRecipientIndex(recipient.id);
    if (title) title.textContent = recipientLabel(recipient, index);
  });

  recipientList.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;
    const card = actionButton.closest("[data-recipient-id]");
    const id = card?.dataset.recipientId;
    const index = getRecipientIndex(id);
    if (index < 0) return;
    const recipient = state.recipients[index];
    const action = actionButton.dataset.action;

    if (action === "delete") {
      if (!confirm(`Delete ${recipientLabel(recipient, index)}?`)) return;
      state.recipients.splice(index, 1);
    }
    if (action === "duplicate") {
      state.recipients.splice(index + 1, 0, { ...recipient, id: cryptoRandomId(), lines: [...recipient.lines], sent: false });
    }
    if (action === "add-line") recipient.lines.push("");
    if (action === "delete-line") {
      const row = actionButton.closest("[data-line-index]");
      const lineIndex = Number(row.dataset.lineIndex);
      if (recipient.lines.length === 1) recipient.lines[0] = "";
      else recipient.lines.splice(lineIndex, 1);
    }

    saveState();
    renderRecipients();
  });

  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeFilter = button.dataset.filter;
      saveState();
      renderGenerated();
    });
  });

  generatedList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const card = button.closest("[data-recipient-id]");
    const recipient = getRecipient(card?.dataset.recipientId);
    if (!recipient) return;
    const subject = replaceTokens(state.subjectTemplate, recipient);
    const body = replaceTokens(state.bodyTemplate, recipient);

    if (button.dataset.action === "copy-subject") copyText(subject, "Subject copied");
    if (button.dataset.action === "copy-body") copyText(body, "Email body copied");
    if (button.dataset.action === "copy-email") copyText(fullEmailText(recipient), "Full email copied");
    if (button.dataset.action === "toggle-sent") {
      recipient.sent = !recipient.sent;
      saveState();
      renderGenerated();
    }
  });

  el("copyAllEmailsBtn").addEventListener("click", () => {
    if (!state.recipients.length) return showToast("No recipients yet");
    copyText(allEmailsText(), "All generated emails copied");
  });

  el("downloadTxtBtn").addEventListener("click", () => {
    if (!state.recipients.length) return showToast("No recipients yet");
    downloadFile(`otl-generated-emails-${new Date().toISOString().slice(0,10)}.txt`, allEmailsText());
    showToast("Text file downloaded");
  });

  el("exportCampaignBtn").addEventListener("click", exportCampaign);
  el("importCampaignInput").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importCampaign(file);
    event.target.value = "";
  });

  renderTemplate();
  renderRecipients();
  renderGenerated();
})();
