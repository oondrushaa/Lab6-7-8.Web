document.addEventListener("DOMContentLoaded", function() {
  var btnAddDots = document.getElementById("btnAddDots");
  var btnTrim10 = document.getElementById("btnTrim10");

  function addDotsToDivs() {
    var divs = document.querySelectorAll(".sample");
    divs.forEach(function(d) {
      // отримуємо лише текстовий контент (не HTML)
      var text = d.textContent || "";
      // якщо вже закінчується на три крапки — пропускаємо
      if (!text.trim().endsWith("...")) {
        d.textContent = text + "...";
        d.classList.add("modified");
      }
    });
  }

  

  btnAddDots && btnAddDots.addEventListener("click", addDotsToDivs);
  btnTrim10 && btnTrim10.addEventListener("click", trimTo10);
});

document.addEventListener("DOMContentLoaded", function() {
  var table = document.getElementById("editableTable");
  var msg = document.getElementById("msg");
  if (!table) return;

  table.addEventListener("click", function(e) {
    var td = e.target.closest("td");
    if (!td || td.querySelector("input")) return;
    startEdit(td);
  });

  function startEdit(td) {
    var original = td.textContent;
    td.innerHTML = "";
    var input = document.createElement("input");
    input.type = "text";
    input.value = original;
    input.className = "inline-edit";
    input.setAttribute("aria-label", "Редагувати вміст клітинки");

    var saveBtn = document.createElement("button");
    saveBtn.textContent = "Зберегти";
    saveBtn.className = "save-btn";

    var cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Скасувати";
    cancelBtn.className = "save-btn";

    var wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.gap = "6px";
    wrapper.appendChild(input);
    wrapper.appendChild(saveBtn);
    wrapper.appendChild(cancelBtn);

    td.appendChild(wrapper);
    input.focus();
    input.select();

    function commit() {
      td.textContent = input.value;
      showMessage("Збережено.");
    }
    function rollback() {
      td.textContent = original;
      showMessage("Редагування скасовано.");
    }

    saveBtn.addEventListener("click", function(ev) {
      ev.stopPropagation();
      commit();
    });
    cancelBtn.addEventListener("click", function(ev) {
      ev.stopPropagation();
      rollback();
    });

    input.addEventListener("keydown", function(ev) {
      if (ev.key === "Enter") {
        commit();
      } else if (ev.key === "Escape") {
        rollback();
      }
    });

    function outsideListener(event) {
      if (!td.contains(event.target)) {
        // зберігаємо зміни при кліку поза елементом
        commit();
        document.removeEventListener("click", outsideListener);
      }
    }
    setTimeout(function() {
      document.addEventListener("click", outsideListener);
    }, 0);
  }

  function showMessage(text) {
    if (!msg) return;
    msg.textContent = text;
    setTimeout(function() { msg.textContent = ""; }, 2500);
  }
});
