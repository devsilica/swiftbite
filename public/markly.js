document.addEventListener(
  "click",
  (e) => {
    // 🔥 stop normal behavior FIRST
    e.preventDefault();
    e.stopPropagation();

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
    button.style.marginTop = "5px";

    button.onclick = async (event) => {
      event.stopPropagation();

      if (!textarea.value.trim()) {
        alert("Enter feedback");
        return;
      }

      const data = {
        comment: textarea.value,
        x,
        y,
        page_url: window.location.href,
      };

      await fetch("https://pwfppvhihxupgjqgfeju.supabase.co/rest/v1/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZnBwdmhpaHh1cGdqcWdmZWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3ODA4NjIsImV4cCI6MjA4OTM1Njg2Mn0.OnggvjWn4wGKSy7loVamYzDNcGhcUlHQ3o-pHX65k8E",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZnBwdmhpaHh1cGdqcWdmZWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3ODA4NjIsImV4cCI6MjA4OTM1Njg2Mn0.OnggvjWn4wGKSy7loVamYzDNcGhcUlHQ3o-pHX65k8E",
        },
        body: JSON.stringify(data),
      });

      alert("Feedback sent 🚀");
      container.remove();
    };

    container.appendChild(textarea);
    container.appendChild(button);
    document.body.appendChild(container);
  },
  true // 👈 🔥 THIS IS THE MAGIC
);
