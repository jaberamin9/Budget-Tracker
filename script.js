const inputBox = document.getElementById('inputBox')


const addMoney = () => {
    const money = parseFloat(parseFloat(inputBox.value).toFixed(2)) || 0
    console.log(money)
    if (money != 0) {
        const moneyList = JSON.parse(localStorage.getItem('money')) || []
        moneyList.push(money)
        localStorage.setItem('money', JSON.stringify(moneyList))


        if (money > 0) {
            let totalIncome = parseFloat(parseFloat(localStorage.getItem('totalIncome')).toFixed(2)) || 0
            totalIncome += money
            localStorage.setItem('totalIncome', parseFloat(totalIncome.toFixed(2)))

            updateValue(document.getElementById('incomeTxt'), parseFloat(totalIncome.toFixed(2)), 'Income: ')

        } else {
            let totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0
            totalExpense += money
            localStorage.setItem('totalExpense', parseFloat(totalExpense.toFixed(2)))

            updateValue(document.getElementById('expenseTxt'), parseFloat((totalExpense * -1).toFixed(2)), 'Expense: ')
        }

        updateList(moneyList)
    }
    inputBox.value = ''
}


const updateValue = (element, total, type) => {
    element.innerText = type + total
}


const listElement = (value, idx) => {
    let node_1 = document.createElement('li');
    node_1.setAttribute('class', `flex gap-2 items-center p-2 rounded-md ${value > 0 ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'}`);

    let node_2 = document.createElement('div');
    node_2.setAttribute('class', 'flex-1 flex gap-2 items-center');
    node_1.appendChild(node_2);

    let node_3 = document.createElement('p');
    node_3.setAttribute('class', 'text-3xl font-normal');
    node_2.appendChild(node_3);


    if (value > 0) {
        let node_4 = document.createTextNode(value);
        node_3.appendChild(node_4);
        let node_5 = document.createElement('p');
        node_2.appendChild(node_5);

        let node_6 = document.createTextNode((new String("income")));
        node_5.appendChild(node_6);
    } else {
        let node_4 = document.createTextNode(value * -1);
        node_3.appendChild(node_4);
        let node_5 = document.createElement('p');
        node_2.appendChild(node_5);

        let node_6 = document.createTextNode((new String("expense")));
        node_5.appendChild(node_6);
    }


    let node_7 = document.createElement('div');
    node_7.setAttribute('class', 'flex-1 flex gap-3 p- justify-end');
    node_1.appendChild(node_7);

    let node_8 = document.createElement('button');
    node_8.setAttribute('class', 'px-5 py-2 bg-white text-black font-semibold hover:bg-gray-200 rounded-md');
    node_8.onclick = function () {
        const moneyList = JSON.parse(localStorage.getItem('money')) || []

        if (value > 0) {
            let totalIncome = parseFloat(parseFloat(localStorage.getItem('totalIncome')).toFixed(2)) || 0
            console.log("toatal ", totalIncome)

            totalIncome -= value
            localStorage.setItem('totalIncome', parseFloat(totalIncome.toFixed(2)))
            updateValue(document.getElementById('incomeTxt'), parseFloat(totalIncome.toFixed(2)), 'Income: ')
        } else {
            let totalExpense = parseFloat(parseFloat(localStorage.getItem('totalExpense')).toFixed(2)) || 0
            totalExpense -= value
            localStorage.setItem('totalExpense', parseFloat(totalExpense.toFixed(2)))
            updateValue(document.getElementById('expenseTxt'), parseFloat((totalExpense * -1).toFixed(2)), 'Expense: ')
        }

        moneyList.splice(idx, 1)
        localStorage.setItem('money', JSON.stringify(moneyList))
        updateList(moneyList)
    }
    node_7.appendChild(node_8);

    let node_9 = document.createTextNode((new String("Delete")));
    node_8.appendChild(node_9);

    let node_10 = document.createElement('button');
    node_10.setAttribute('class', 'px-5 py-2 bg-white text-black font-semibold hover:bg-gray-200 rounded-md');
    node_10.onclick = function () {
        node_2.innerHTML = ''
        let node_3 = document.createElement('input');
        node_3.setAttribute('class', 'p-2 rounded-md');
        node_3.setAttribute('type', 'number')
        node_3.setAttribute('value', value)
        node_2.appendChild(node_3);

        node_7.innerHTML = ''
        let node_8 = document.createElement('button');
        node_8.setAttribute('class', 'px-5 py-2 bg-white text-black font-semibold hover:bg-gray-200 rounded-md');
        node_8.onclick = function () {
            const updateValue = parseFloat(parseFloat(node_3.value).toFixed(2))
            if (updateValue != 0) {
                const moneyList = JSON.parse(localStorage.getItem('money')) || []

                if (updateValue > 0) {
                    let totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0

                    if (value <= 0) {
                        let totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0
                        totalExpense -= value
                        totalExpense = parseFloat(totalExpense.toFixed(2))
                        localStorage.setItem('totalExpense', totalExpense)
                        document.getElementById('expenseTxt').innerText = 'Expense: ' + (totalExpense * -1)
                    } else {
                        totalIncome -= value
                    }
                    totalIncome += updateValue
                    totalIncome = parseFloat(totalIncome.toFixed(2))
                    localStorage.setItem('totalIncome', totalIncome)
                    document.getElementById('incomeTxt').innerText = 'Income: ' + totalIncome
                } else {
                    let totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0

                    if (value > 0) {
                        let totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0
                        totalIncome -= value
                        totalIncome = parseFloat(totalIncome.toFixed(2))
                        localStorage.setItem('totalIncome', totalIncome)
                        document.getElementById('incomeTxt').innerText = 'Income: ' + totalIncome
                    } else {
                        totalExpense -= value
                    }
                    totalExpense += updateValue
                    totalExpense = parseFloat(totalExpense.toFixed(2))
                    localStorage.setItem('totalExpense', totalExpense)
                    document.getElementById('expenseTxt').innerText = 'Expense: ' + (totalExpense * -1)
                }

                moneyList.splice(idx, 1, updateValue)

                localStorage.setItem('money', JSON.stringify(moneyList))
                updateList(moneyList)
            }
        }
        node_7.appendChild(node_8);
        let node_9 = document.createTextNode((new String("Update")));
        node_8.appendChild(node_9);


    }
    node_7.appendChild(node_10);

    let node_11 = document.createTextNode((new String("Edit")));
    node_10.appendChild(node_11);


    const element = document.getElementById('list')
    element.appendChild(node_1)
}


const updateList = (moneyList) => {
    const element = document.getElementById('list')
    element.innerHTML = ''
    moneyList.map((item, idx) => {
        listElement(item, idx)
    })
}


const firstRun = () => {
    const totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0
    updateValue(document.getElementById('incomeTxt'), totalIncome, 'Income: ')

    const totalExpense = parseFloat(localStorage.getItem('totalExpense')) || 0
    updateValue(document.getElementById('expenseTxt'), (totalExpense * -1), 'Expense: ')

    const moneyList = JSON.parse(localStorage.getItem('money')) || []
    updateList(moneyList)
}

firstRun()