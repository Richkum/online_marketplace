const getTotal = JSON.parse(localStorage.getItem("Total")) || [];
console.log(getTotal, "im total");
const amountTotal = document.getElementById('total-amount')
const paybtn = document.querySelector('.hello')
const bill = document.getElementById('billamount')

amountTotal.value =getTotal;

paybtn.addEventListener('click', () =>{
  console.log("hello");
  if (amountTotal.value === bill.value) {
    alert("validatation of Billamount")
  }
  else  
    alert("Your BillAmount should be equal to the total value")
    console.log(  bill.value, "hello");
})


