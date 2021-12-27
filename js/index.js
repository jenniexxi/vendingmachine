let currentCash = 0;

const item = document.getElementsByClassName("item");
const price = document.getElementsByClassName("price");

function handleCash(inputMoney) {
    updateCash(inputMoney.value);
    changeActive();
}

function updateCash(val) {
    currentCash += parseInt(val);
    const moneyCount = document.getElementById("moneycount");
    moneyCount.value = currentCash;
}

function changeActive(){
    for (var i = 0; i < price.length; i++) {
        if (currentCash >= parseInt(price[i].innerHTML)) {
            item[i].classList.add("on");
        } else {
            item[i].classList.remove("on");
        }
    }
}

function buy(goods){
    if (goods.classList.contains("on")) {
        alert("구매 완료");
        updateCash(parseInt(goods.getElementsByClassName("price")[0].innerHTML) * -1);
    } else {
         alert("잔액이 부족합니다. 현금을 넣어주세요.");
    };
    changeActive();
}

function restReturn() {
    updateCash(-1 * currentCash);
    changeActive();
}













