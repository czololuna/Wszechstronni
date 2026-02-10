import { addComment, listenComments } from "./comments.js";

const form = document.getElementById("commentForm");
const list = document.getElementById("commentList");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const text = document.getElementById("text").value.trim();

  if (!name || !text) return;

  await addComment(name, text);

  form.reset();
});

listenComments((comments) => {
  list.innerHTML = comments
    .map(
      (c) => `
      <div class="comment">
        <strong>${c.name}</strong><br>
        ${c.text}
      </div>
    `
    )
    .join("");
});