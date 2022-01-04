let currentCash = 0;
const exchangeRate = 1800;
let wonClicked = 0;
let dollarClicked = 0;
const items = document.getElementsByClassName("item");
const price = document.getElementsByClassName("price");
const buttons = document.querySelectorAll(".btn_money button");
const productBtns = document.querySelectorAll(".item");
const btnReturns = document.querySelectorAll(".btn_return");

const modals = document.getElementsByClassName("modal");
const albumImgs = document.getElementsByClassName("display_img");
const modalCloseBtns = document.getElementsByClassName("close");

document.addEventListener("DOMContentLoaded", function () {
    function handleCash(inputMoney) {
        const queryID = this.id;
        if (queryID.indexOf('cent') !== -1 || queryID.indexOf('dollar') !== -1) {
            if (wonClicked === 1) {
                alert("dollar 를 넣을 수 없습니다. 원 단위 돈을 넣어주세요.");
                return;
            }
            dollarClicked = 1;
            updateCash(this.value);
        } else {
            if (dollarClicked === 1) {
                alert("원 단위를 넣을 수 없습니다. dollar를 넣어주세요.");
                return;
            }
            wonClicked = 1;
            updateCash(this.value);
        }
        changeActive();

        // if(parseFloat(this.value) > 50 ) { //won
        //     if(dollarClicked === 1) {
        //         alert("you cannot click won");
        //         return;
        //     }
        //     wonClicked = 1;
        //    updateCash(this.value);
        // } else { //dollar
        //     if(wonClicked === 1 ) {
        //         alert("you cannot click dollar");
        //         return;
        //     }
        //     dollarClicked = 1;
        //     updateCash(this.value);     
        // }
        // changeActive();
    }

    function updateCash(val) {
        // currentCash 에만 parseFloat 를 쓴 이유 : floor 한 값이 반올림이기때문에
        // 반올림한걸 빼면 원가격이 마이너스가 될 수도 있기 때문에 parseFloat 한다.
        // 10.156 - 10.15 = 0.006 이면 2째자리에서 자를거기 때문에 0이 된다.
        // 계산을 정확하게 하기 위해서임
        currentCash += parseFloat(val); // 20 -> 10900 구매해볼것(13.94, parseFloat대신 Math.floor)
        console.log(currentCash + " " + val + "  " + Math.floor(val * 100) / 100);
        //parsefloat : 소수점까지 다 살려서 반영
        //floor : 반올림
        let moneyCount;
        // console.log(val);
        if (wonClicked === 1) {
            moneyCount = document.getElementById("moneyCount");
        } else {
            moneyCount = document.getElementById("dollarCount");
        }
        moneyCount.value = Math.floor(currentCash * 100) / 100;
        //math.floor : 주어진 수 이하의 가장 큰 정수.
    }

    function changeActive() {
        let newCash = currentCash;
        if (dollarClicked == 1) {
            newCash = newCash * exchangeRate;
        }

        for (let i = 0; i < price.length; i++) {
            let currentPrice = parseInt(price[i].textContent);
            //parseInt : 문자열 인자를 파싱하여 특정 진수의 정수를 반환
            //   console.log(val + "   " + parseInt(price[i].textContent));
            if (newCash >= currentPrice) {
                items[i].classList.add("on");
            } else {
                items[i].classList.remove("on");
            }
        }
    }

    function buy() {
        let buyPrice = this.textContent;
        console.log(buyPrice);
        buyPrice = buyPrice.replace("원", "");

        if (dollarClicked === 1) {
            buyPrice = buyPrice / exchangeRate;
        };

        if (currentCash >= buyPrice) {
            alert("구매 완료");
            printPurchaseImage(this.id);
            updateCash(buyPrice * -1);

        } else {
            alert("잔액이 부족합니다. 현금을 넣어주세요.");
        };
        changeActive();
    }

    function restReturn() {
        // 0일 때 반환 안되도록
        // if(currentCash === 0) return;

        printReturnValue();
        updateCash(-1 * currentCash);
        changeActive();
        clearImage();
        wonClicked = 0;
        dollarClicked = 0;
    }

    function clearImage() {
        let imageBody = document.getElementById("receiveList");

        // console.log(imageBody.childNodes);
        while (imageBody.childNodes.length > 2) {
            imageBody.removeChild(imageBody.lastChild);
        }
    }

    function initReturnInfo() {
        let tableBodySet = document.getElementById("table").getElementsByTagName("tbody")[0];
        console.log("xxxxx");
        console.log(tableBodySet.childNodes);
        while (tableBodySet.childNodes.length !== 0) {
            tableBodySet.removeChild(tableBodySet.lastChild);
        }
    }

    function printPurchaseImage(id) {
        let purchaseImageID = id;
        imageList = document.getElementById("receiveList");
        console.log("xxxxx");
        console.log(purchaseImageID);
        purchaseImageID = purchaseImageID.replace("item", "album");
        let newImage = document.createElement("img");
        newImage.setAttribute("src", "img/" + purchaseImageID + ".png");
        console.log(newImage);
        imageList.appendChild(newImage);
    }

    function printReturnValue() {
        let tableBody = document.getElementById("table").getElementsByTagName('tbody')[0];
        let val = Math.floor(currentCash * 100); // divid 100 multiply 100 so it can be simplify.
        let dividor;
        document.getElementById("returnTotal").textContent = Math.floor(currentCash * 100) / 100;
        initReturnInfo();

        let unitType;
        if (wonClicked === 1) {
            unitType = " (원)";
            dividor = new Array(100, 500, 1000, 5000, 10000, 50000);
        } else {
            unitType = " ($)";
            dividor = new Array(0.01, 0.05, 0.10, 0.25, 0.5, 1, 2, 5, 10, 20, 50);
        }
        document.getElementsByClassName("type").textContent = unitType;

        //큰돈부터 잔돈 거슬러 주기 위해 -1로 시작
        for (let i = dividor.length - 1; i >= 0; i--) {
            let amount = parseInt(dividor[i] * 100); //amount는 계속 바뀜 50000 부터 곱하기 100은 달러도 같이 처리할 수 있도록 만들려고
            //소수점 버리고 몫만 가져와야 하니까 paserint 처리
            if (parseInt(val / amount) !== 0) {
                const row = document.createElement("tr");
                const td1 = document.createElement("td");
                const td2 = document.createElement("td");

                td1.appendChild(document.createTextNode(dividor[i]));
                td2.appendChild(document.createTextNode(parseInt(val / amount)));
                row.appendChild(td1);
                row.appendChild(td2);
                tableBody.appendChild(row);
                val -= (amount * parseInt(val / amount));
            }
        }
        document.getElementById("totalAmount").textContent = unitType;
    }


    function Modal(num) {
        albumImgs[num].onclick = function () {
            modals[num].style.display = "block";
        };

        modalCloseBtns[num].onclick = function () {
            modals[num].style.display = "none";
        };
    };

    for (var i = 0; i < albumImgs.length; i++) {
        Modal(i);
    }

    window.onclick = function (event) {
        if (event.target.className == "modal") {
            event.target.style.display = "none";
        }
    };


    buttons.forEach((button) => {
        button.addEventListener('click', handleCash, false);
    });

    document.querySelectorAll(".item").forEach((productBtn) => {
        productBtn.addEventListener('click', buy);
    });

    btnReturns.forEach((btnReturn) => {
        btnReturn.addEventListener('click', restReturn, false);
    });


});



// 팝업 1개로
// const pops = document.querySelectorAll(".display_img");
// const popups = document.querySelectorAll(".popup");
// pops.forEach( (pop) => {
//     pop.addEventListener('click', openPop);
// });
// console.log(pops[0].id)
// function openPop () {
//     if ( pops.id.substr(6) === popups.target.id.substr(3) ) {
//         popups.style.display = 'block'
//     }
// }

