const getData = window.localStorage.getItem("table-data");

const datas = JSON.parse(getData) || [];

function newTd() {
  return document.createElement("td");
}

function renderRow(data) {
  const tBody = document.querySelector("table tbody");
  const tr = document.createElement("tr");

  if (!tBody) return;

  tBody.appendChild(tr);

  data.forEach((element) => {
    const { nama, umur, gender, smoking, cigarettes } = element;
    const colNama = newTd();
    colNama.textContent = nama;
    tr.appendChild(colNama);

    const colUmur = newTd();
    colUmur.textContent = umur;
    tr.appendChild(colUmur);

    const colGender = newTd();
    if (gender === "man") {
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

    // cigarettes.forEach((c) => {
    //   const td = newTd();
    //   td.textContent = "\u2713";
    //   tr.appendChild(td);
    // });
  });
}

renderRow(datas);

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cigarettesValue = [
      "gudang-garam-filter",
      "lucky-strike",
      "marlboro",
      "esse",
    ];

    const formData = new FormData(form);

    const nama = formData.get("nama");
    const umur = formData.get("umur");
    const gender = formData.get("gender");
    const smoking = formData.get("smoking");
    // const cigarettes = formData.getAll("cigarettes");

    console.log(formData.getAll("cigarettes[cigarettesValue]"));

    const temp = [{ nama, umur, gender, smoking, cigarettes }];
    window.localStorage.setItem("table-data", JSON.stringify(temp));
    renderRow(datas);
    form.reset();
  });
}
