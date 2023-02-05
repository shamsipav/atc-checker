// TODO: Need full refactoring
// ----------------------------------

if (document.getElementsByClassName("c87")) {
    function update(index) {
        let div = document.querySelector(".number-of-position");
        if (div) {
            div.remove();
        }
        let main = document.getElementById("main-content");
        let elem = document.createElement("div");
        elem.className = "number-of-position";
        elem.style.color = "#b298d5";
        elem.style.fontFamily = "none";
        elem.style.fontSize = "16em";
        let elemText = document.createTextNode(index);
        elem.appendChild(elemText);
        main.appendChild(elem);
    }

    function getNumber() {
        let trows = document.getElementsByClassName("c87");
        let arrayTrs = [...trows];

        let trIndex = arrayTrs
            .map((x) => x.children[0].innerHTML)
            .indexOf("Орлова Светлана");

        if (trIndex >= 0) {
            let tr = trows[trIndex];
            tr.style.background = "#d8baffad";
        }

        let arrayToIndex = arrayTrs.filter((_, i) => i < trIndex);
        let noNeedArrayTrs = arrayToIndex.filter(x => (x.children[2]).children[0].innerHTML > 2 || (x.children[2]).children[0].innerHTML == 1);

        noNeedArrayTrs.map((x) => x.style.color = "lightgray");

        let currentNumber = trIndex - noNeedArrayTrs.length + 1;

        update(currentNumber);

        return { trs: trows, trIndex, current: currentNumber };
    }

    let obj = getNumber();
    let target = obj.trs[obj.trIndex].parentElement;

    let currentPosition = 0;
    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
            let object = getNumber();
            let position = object.current;
            if (currentPosition === 0) {
                currentPosition = position;
                if (object.trIndex > 0 && currentPosition <= 5) {
                    sendBotMessage(TOKEN, CHAT_ID, `Изменился номер: ${currentPosition}`);
                    // console.log(`Изменился номер: ${currentPosition}`)
                } else if (object.trIndex == 0) {
                    sendBotMessage(TOKEN, CHAT_ID, `Ты первая в очереди!`);
                    // console.log('Ты первая в очереди!')
                }
            } else {
                if (currentPosition !== position) {
                    currentPosition = position;
                    if (currentPosition > 2 && currentPosition <= 5) {
                        sendBotMessage(TOKEN, CHAT_ID, `Изменился номер: ${currentPosition}`);
                        // console.log(`Изменился номер: ${currentPosition}`)
                    } else if (currentPosition === 2) {
                        sendBotMessage(TOKEN, CHAT_ID, `Изменился номер: ${currentPosition}.\nНужно быть за рабочим местом!`);
                        // console.log(`Изменился номер: ${currentPosition}.\nНужно быть за рабочим местом!`)
                    } else if (currentPosition === 1) {
                        sendBotMessage(TOKEN, CHAT_ID, `Ты первая в очереди!`);
                        // console.log('Ты первая в очереди!')
                    }
                }
            }
        });
    });

    let config = { attributes: true, childList: true, characterData: true };

    observer.observe(target, config);

    const CHAT_ID = "-861019582";
    const TOKEN = "5616522692:AAF1fVepraK6vCbV-jPf2A8hANHAhSYmYz8";

    async function sendBotMessage(botToken, chatId, text) {
        let url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}parse_mode=HTML&text=${encodeURIComponent(
            text
        )}`;
        const response = await fetch(url, {
            method: "POST"
        });
        return response.json();
    }

}