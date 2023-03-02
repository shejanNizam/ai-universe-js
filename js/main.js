const loadData = () => {
  url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data.data.tools));
};

const showData = (data) => {
  //   console.log(data);
  const cardContainer = document.getElementById("card-container");
  data.forEach((singleData) => {
    // console.log(singleData);
    const { image, features, name, published_in } = singleData;
    cardContainer.innerHTML += `<div class="col">
    <div class="card h-100">
      <img src=${image} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Features</h5>
        <ol>
          <li> ${features[0]} </li>
          <li>${features[1]}</li>
          <li>${features[2]}</li>
        </ol>
      </div>
      <div
        class="card-footer d-flex justify-content-between align-items-center"
      >
        <div>
          <h5>${name}</h5>
          <p>Date: ${published_in} </p>
        </div>
        <button class="rounded-circle border-0 text-danger bg-warning">
          ->
        </button>
      </div>
    </div>
  </div>`;
  });
};

loadData();
