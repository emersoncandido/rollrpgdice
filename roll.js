const FIXED_ROWS = 7;
const PRE_SELECTED_TYPES = ['n0t4', 'n1t6', 'n2t8', 'n3t10', 'n4t12', 'n5t20', 'n6t100'];
const OPTION_NUMBER = 20;
const OPTION_TYPES = [4, 6, 8, 10, 12, 20, 100];

const generateOptions = () => {
    let optionsHtml = ``;
    for(l = 0; l < FIXED_ROWS; l++) {
        optionsHtml += `<div class="dice-options-how-many">Roll <select id="how-many-dice-${l}">`;
        for(n = 0; n <= OPTION_NUMBER; n++) {
            optionsHtml += `<option value="${n}"${n == 0 ? ' selected' : ''}>${n}</option>`;
        }
        optionsHtml += `</select></div><div><select id="die-type-${l}">`;
        OPTION_TYPES.forEach(
            (type) => 
                optionsHtml += `<option value="${type}"${('n' + l + 't' + type) == PRE_SELECTED_TYPES[l] ? ' selected' : ''}>${type}</option>`
        );
        optionsHtml += `</select>-sided dice</div>`;
    }
    document.querySelector(".dice-options").innerHTML = optionsHtml;
}

const validRolls = () => {
    let diceCount = 0;
    for(d = 0; d < FIXED_ROWS; d++) {
        diceCount += parseInt(document.getElementById('how-many-dice-' + d).value);
    }
    return diceCount > 0 ? true : false;
}

const rollDie = (type) => {
    return Math.floor(Math.random() * type) + 1;
}

const diceNumberByRow = (row) => {
    return parseInt(document.getElementById('how-many-dice-' + row).value);
}

const dieTypeByRow = (row) => {
    return parseInt(document.getElementById('die-type-' + row).value);
}

const generateRows = () => {
    let rows = [];
    for(l = 0; l < FIXED_ROWS; l++) {
        rows.push({'number': 0, 'type': 20, 'rolls': [], 'sum': 0});
    }
    return rows;
}

const rollEachRow = () => {
    let completeRoll = generateRows();
    for(l = 0; l < FIXED_ROWS; l++) {
        completeRoll[l].number = diceNumberByRow(l);
        completeRoll[l].type = dieTypeByRow(l);
        if(diceNumberByRow(l) > 0) {
            for(n = 0; n < diceNumberByRow(l); n++) {
                let singleRoll = rollDie(dieTypeByRow(l));
                completeRoll[l].rolls.push(singleRoll);
                completeRoll[l].sum += singleRoll;
            }
        }
    }
    console.log(completeRoll);
    return completeRoll;
}

const assembleResults = () => {
    const finishedRoll = rollEachRow();
    let rowHtml = ``;
    for(l = 0; l < FIXED_ROWS; l++) {
        if(finishedRoll[l].number > 0) {
            rowHtml += `<tr>`;
            rowHtml += `<td>${finishedRoll[l].number}d${finishedRoll[l].type}</td>`;
            rowHtml += `<td>`;
            for(n = 0; n < finishedRoll[l].number; n++) {
                rowHtml += `<span>${finishedRoll[l].rolls[n]}</span>`;
            }
            rowHtml += `</td>`;
            rowHtml += `<td>${finishedRoll[l].sum}</td>`;
            rowHtml += `</tr>`;
        }
    }
    document.querySelector("#result-box section table tbody").innerHTML = rowHtml;
}

const showResultBox = () => {
    assembleResults();
    document.getElementById('result-box').style.display = 'block';
}

const rollMyDice = () => {
    if(validRolls()) {
        showResultBox();
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    } else {
        alert('Select at least one dice combination before rolling.');
    }
}

const rollButton = document.getElementById('roll-btn');
rollButton.addEventListener('click', rollMyDice);

generateOptions();