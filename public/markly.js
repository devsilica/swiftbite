// ✅ SHOW MARKER FROM URL
// ==========================
const params = new URLSearchParams(window.location.search);

const xParam = params.get("x");
const yParam = params.get("y");
const commentParam = params.get("comment");

if (xParam && yParam) {
  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.left = `${xParam}px`;
  dot.style.top = `${yParam}px`;
  dot.style.width = "14px";
  dot.style.height = "14px";
  dot.style.background = "red";
  dot.style.borderRadius = "50%";
  dot.style.boxShadow = "0 0 0 4px rgba(255,0,0,0.3)";
  dot.style.zIndex = "9999";
  dot.style.cursor = "pointer";

  // 💬 Tooltip (comment)
  if (commentParam) {
    const tooltip = document.createElement("div");
    tooltip.innerText = decodeURIComponent(commentParam);
    tooltip.style.position = "absolute";
    tooltip.style.top = "20px";
    tooltip.style.left = "0px";
    tooltip.style.background = "#000";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "6px 8px";
    tooltip.style.fontSize = "12px";
    tooltip.style.borderRadius = "4px";
    tooltip.style.whiteSpace = "nowrap";
    tooltip.style.display = "none";

    dot.appendChild(tooltip);

    dot.addEventListener("click", () => {
      tooltip.style.display =
        tooltip.style.display === "none" ? "block" : "none";
    });
  }

  document.body.appendChild(dot);

  // 🔥 Auto scroll to marker
  dot.scrollIntoView({ behavior: "smooth", block: "center" });
}


// ==========================
// ✅ CLICK TO ADD FEEDBACK
// ==========================
document.addEventListener("click", (e) => {
  if (e.target.closest("#markly-box")) return;

  const existing = document.getElementById("markly-box");
  if (existing) existing.remove();

  const x = e.clientX;
  const y = e.clientY;

  const container = document.createElement("div");
  container.id = "markly-box";
  container.style.position = "absolute";
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;
  container.style.background = "#fff";
  container.style.padding = "10px";
  container.style.border = "1px solid #ccc";
  container.style.borderRadius = "6px";
  container.style.zIndex = "9999";

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Leave feedback...";
  textarea.style.width = "200px";
  textarea.style.height = "80px";

  const button = document.createElement("button");
  button.innerText = "Send";
  button.style.display = "block";
  button.style.marginTop = "5px";

  button.onclick = async (event) => {
    event.stopPropagation();

    if (!textarea.value.trim()) {
      alert("Please enter feedback");
      return;
    }

    const data = {
      comment: textarea.value,
      x,
      y,
      page_url: window.location.href,
    };

    try {
      const res = await fetch("https://pwfppvhihxupgjqgfeju.supabase.co/rest/v1/feedback", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZnBwdmhpaHh1cGdqcWdmZWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3ODA4NjIsImV4cCI6MjA4OTM1Njg2Mn0.OnggvjWn4wGKSy7loVamYzDNcGhcUlHQ3o-pHX65k8E",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZnBwdmhpaHh1cGdqcWdmZWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3ODA4NjIsImV4cCI6MjA4OTM1Njg2Mn0.OnggvjWn4wGKSy7loVamYzDNcGhcUlHQ3o-pHX65k8E",
  },
  body: JSON.stringify(data),
});

      if (res.ok) {
        alert("Feedback sent 🚀");
        container.remove();
      } else {
        alert("Error sending feedback");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  container.appendChild(textarea);
  container.appendChild(button);

  document.body.appendChild(container);
});
