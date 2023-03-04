const loadData = (dataLimit) => {
  toggleSpinner(true);
  url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data.data.tools, dataLimit));
};

const showData = (data, dataLimit) => {
  //  sort by date
  document
    .getElementById("sort-by-date")
    .addEventListener("click", function () {
      data.sort(function (a, b) {
        return new Date(b.published_in) - new Date(a.published_in);
      });
    });

  const cardContainer = document.getElementById("card-container");
  // show 6 data
  const showAll = document.getElementById("show-all");

  if (data.length > 6) {
    data = data.slice(0, 6);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

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
        <button onclick="loadDataDetails('${singleData.id}')" class="rounded-circle border-0 text-danger bg-warning"   data-bs-toggle="modal"
        data-bs-target="#exampleModal">
          ->
        </button>
      </div>
    </div>
  </div>`;
  });
  toggleSpinner(false);
};

const processData = (dataLimit) => {
  loadData(dataLimit);
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  processData();
});

// spinner item
const toggleSpinner = (isLoading) => {
  const loderSection = document.getElementById("loader");
  if (isLoading) {
    loderSection.classList.remove("d-none");
  } else {
    loderSection.classList.add("d-none");
  }
};

// document.getElementById("btn-show-all").addEventListener("click", function () {
//   processSearch();
// });

const loadDataDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDataDetails(data.data);
};

const displayDataDetails = (data) => {
  //   console.log(data);

  const phoneDetails = document.getElementById("data-details");
  const {
    description,
    pricing,
    features,
    integrations,
    image_link,
    input_output_examples,
    accuracy,
  } = data;
  //   console.log(accuracy);
  phoneDetails.innerHTML = `
  <div class="row gap-2 ">
                     <!-- left side  -->
                <div class="col rounded-3 p-4 bg-info" style=" border: 1px solid blueviolet;" >
                    <h5> ${description} </h5>
                    <div class="row my-3 gap-2">
                      <div class="col text-primary text-center fw-bold bg-white rounded-3"> ${
                        pricing[0].price ? pricing[0].price : "Free of Cost"
                      } <span> ${pricing[0].plan} </span> </div>
                      <div class="col text-warning text-center fw-bold bg-white rounded-3">${
                        pricing[1].price ? pricing[1].price : "Free of Cost"
                      } <span> ${pricing[1].plan} </span> </div>
                      <div class="col text-danger text-center fw-bold bg-white rounded-3 ">${
                        pricing[2].price ? pricing[2].price : "Free of Cost"
                      } <span> ${pricing[2].plan} </span> </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div class="feature">
                        <h6>Features</h3>
                        <ul>
                          <li>${features["1"].feature_name}</li>
                          <li>${features["2"].feature_name}</li>
                          <li>${features["3"].feature_name}</li>
                        </ul>
                      </div>
                      <div class="integration">
                        <h6>Integrations</h3>                               
                        <ul>
                          <li> ${
                            integrations[0] ? integrations[0] : "No Data Found"
                          } </li>
                          <li> ${
                            integrations[1] ? integrations[1] : "No Data Found"
                          } </li>
                          <li> ${
                            integrations[2] ? integrations[2] : "No Data Found"
                          } </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <!-- right side -->
                  <div class="col rounded-3 text-center " style=" border: 1px solid blueviolet;" >
                  <span class="badge bg-danger text-light"> ${
                    accuracy.score * 100 != 0 ? accuracy.score * 100 : "No "
                  }% accuracy </span>
                      <img class="img-fluid" src=${image_link[0]}  alt="">
                      <h4 class ="mt-3"> ${input_output_examples[0].input} </h4>
                      <p> ${
                        input_output_examples[0].output
                          ? input_output_examples[0].output
                          : "No! Not Yet! Take a break!!!"
                      } </p>
                  </div>
                </div>

  `;
};

loadData();
