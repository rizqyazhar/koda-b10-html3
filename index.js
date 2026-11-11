const getData = window.localStorage.getItem("table-data");

const datas = JSON.parse(getData) || [];

function newTd() {
  return document.createElement("td");
}

function renderRow(data) {
  const tBody = document.querySelector("table tbody");

  if (!tBody) return;

  data.forEach((element) => {
    const tr = document.createElement("tr");
    tr.setAttribute("class", "hover:bg-violet-100 text-center");
    tBody.appendChild(tr);
    const { nama, umur, gender, smoking, cigarettesCompared } = element;
    const colNama = newTd();
    colNama.setAttribute("class", "p-2");
    colNama.textContent = nama;
    tr.appendChild(colNama);

    const colUmur = newTd();
    colUmur.textContent = umur;
    tr.appendChild(colUmur);

    const colGender = newTd();
    if (gender === "male") {
      colGender.textContent = "Laki-laki";
    } else {
      colGender.textContent = "Perempuan";
    }
    tr.appendChild(colGender);

    const colSmoking = newTd();
    if (smoking === "yes") {
      colSmoking.textContent = "Ya";
    } else {
      colSmoking.textContent = "Tidak";
    }
    tr.appendChild(colSmoking);

    cigarettesCompared.forEach((c) => {
      const td = newTd();
      if (c) {
        td.textContent = "\u2713";
      } else {
        td.textContent = "";
      }
      tr.appendChild(td);
    });
  });
}

renderRow(datas);

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cigarettesValue = ["ggm", "ls", "mb", "es"];

    const formData = new FormData(form);

    const nama = formData.get("nama");
    const umur = formData.get("umur");
    const gender = formData.get("gender");
    const smoking = formData.get("smoking");
    const cigarettes = formData.getAll("cigarettes");

    const cigarettesCompared = cigarettesValue.map((c) =>
      cigarettes.includes(c),
    );

    const temp = { nama, umur, gender, smoking, cigarettesCompared };

    datas.push(temp);

    window.localStorage.setItem("table-data", JSON.stringify(datas));

    renderRow(datas);

    form.reset();
  });
}
