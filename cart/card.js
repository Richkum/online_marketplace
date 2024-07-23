const data = window.location.search;
const urlParam = new URLSearchParams(data);
const productId = urlParam.get("id");
console.log(productId);
const getCurrentItems = JSON.parse(localStorage.getItem("cardItems"));
console.log(getCurrentItems);



function displayItems() {
  const top = document.querySelector(".container4");
  top.innerHTML = "";
  const getCurrentItems = JSON.parse(localStorage.getItem("cardItems"));
  console.log(getCurrentItems);

  getCurrentItems.map(function call(element) {
    if (top) {
      top.innerHTML += `
      <div class="top">
        <div class="subcard" id="subcards">
          <a href="/details.html?id=${element.item.id}&category=${element.item.category}"><img src=${element.item.thumbnail} id="details-page"/></a>
          <i class="fa-regular fa-heart"></i>
        </div>
        <div class="snikersprice">
          <span id="snykers">${element.item.title}</span>
          <span id="snykers-price">$${element.item.price}</span>
        </div>
    
        <div class="shoes-available" data-name>
          <p id="shoes"> 5 types of shoes available</p>
        </div>
        <div class="stars">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <p id="number">(121)</p>
        </div>
        <div class="date">
          <input class="he" type="text" value="${element.total}"  >
        <button id="shortlist" data-id ="${element.item.id}" class="remove">Remove</button>
        </div>
      </div>
  `;
    }
      // calculateTotal
      let sum =0;
    function calculateTotal () { 
      for (let i = 0; i < getCurrentItems.length; i++) {
        const Elements = getCurrentItems[i].item.price;
        const total = element.total *Elements;
        sum += total ;
      }
      console.log(sum,"i'm sum");
      localStorage.setItem('Total', JSON.stringify(sum));
    }
    calculateTotal()

  });


  const removes = document.querySelectorAll(".remove");
  removes.forEach((remove) => {
    remove.addEventListener("click", (e) => {
      const getCardItem = JSON.parse(localStorage.getItem("cardItems"));
      console.log(getCardItem);
      const id = +e.target.dataset.id;
      const removeValue = getCardItem.filter((prod) => prod.item.id !== id);
      localStorage.setItem("cardItems", JSON.stringify(removeValue));
      displayItems();
      console.log(removeValue);
    });
  });
}

displayItems();

 


