const inputBox = document.getElementById('inputBox')
const submitBtn = document.getElementById('submit-btn')
const error = document.getElementById('error')
const listContainer = document.getElementById('list')


const addMoney = () => {
    const money = parseFloat(parseFloat(inputBox.value).toFixed(2))

    if (isNaN(money) || money === 0) {
        error.style.visibility = 'visible'
        error.innerText = money === 0 ? 'Sorry, we cannot insert only 0 and 0.00...' : 'Please enter any number'
        inputBox.value = ''
        inputBox.focus()
        return
    }

    error.style.visibility = 'hidden'
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

    inputBox.value = ''
    inputBox.focus()

    listContainer.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' })
}

submitBtn.addEventListener('click', addMoney)
inputBox.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        addMoney()
    }
})


const updateValue = (element, total, type) => {
    element.innerText = type + total
}


const deleteItem = (value, idx) => {
    const moneyList = JSON.parse(localStorage.getItem('money')) || []

    if (value > 0) {
        let totalIncome = parseFloat(parseFloat(localStorage.getItem('totalIncome')).toFixed(2)) || 0
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

const updateItem = (value, idx, editMoneyEtx) => {
    const updateValue = parseFloat(parseFloat(editMoneyEtx.value).toFixed(2))
    if (isNaN(updateValue) || updateValue === 0) {
        error.style.visibility = 'visible'
        error.innerText = updateValue === 0 ? 'Sorry we can not insert only 0 and 0.00...' : 'Please enter any number'
        return
    }
    error.style.visibility = 'hidden'

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

const listElement = (value, idx) => {
    let list = document.createElement('li');
    list.setAttribute('class', `flex gap-2 items-center p-2 rounded-md ${value > 0 ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'}`);
    //list.classList.add('flex', 'gap-2', 'items-center', 'p-2', 'rounded-md', value > 0 ? 'bg-green-100' : 'bg-red-100', value > 0 ? 'hover:bg-green-200' : 'hover:bg-red-200')

    let leftContainer = document.createElement('div');
    leftContainer.setAttribute('class', 'flex-1 flex gap-2 items-center');
    list.appendChild(leftContainer);

    let moneyTxt = document.createElement('p');
    moneyTxt.setAttribute('class', 'text-3xl font-normal');
    leftContainer.appendChild(moneyTxt);

    if (value > 0) {
        moneyTxt.innerHTML = value
        let type = document.createElement('p');
        leftContainer.appendChild(type);
        type.innerText = 'income'
    } else {
        moneyTxt.innerHTML = value
        let type = document.createElement('p');
        leftContainer.appendChild(type);
        type.innerText = 'expense'
    }

    let rightContainer = document.createElement('div');
    rightContainer.setAttribute('class', 'flex-1 flex gap-3 p- justify-end');
    list.appendChild(rightContainer);

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'px-5 py-2 bg-white text-black font-semibold hover:bg-gray-200 rounded-md');
    deleteBtn.onclick = () => deleteItem(value, idx)
    rightContainer.appendChild(deleteBtn);
    deleteBtn.innerText = 'Delete'

    let editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'px-5 py-2 bg-white text-black font-semibold hover:bg-gray-200 rounded-md');
    editBtn.onclick = function () {
        leftContainer.innerHTML = ''
        let editMoneyEtx = document.createElement('input')
        editMoneyEtx.setAttribute('class', 'p-2 rounded-md')
        editMoneyEtx.setAttribute('type', 'number')
        editMoneyEtx.setAttribute('value', value)
        leftContainer.appendChild(editMoneyEtx)
        editMoneyEtx.focus()

        rightContainer.innerHTML = ''
        let updateBtn = document.createElement('button');
        updateBtn.setAttribute('class', 'px-5 py-2 bg-white text-black font-semibold hover:bg-gray-200 rounded-md');
        updateBtn.onclick = () => updateItem(value, idx, editMoneyEtx)
        editMoneyEtx.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                updateItem(value, idx, editMoneyEtx)
            }
        })
        rightContainer.appendChild(updateBtn)
        updateBtn.innerText = 'Update'
    }
    rightContainer.appendChild(editBtn)
    editBtn.innerText = 'Edit'
    listContainer.appendChild(list)
}


const updateList = (moneyList) => {
    listContainer.innerHTML = ''
    if (moneyList.length === 0) {
        listContainer.innerHTML = `
        <div class="w-full h-full flex justify-center items-center" >
            <P class="text-black font-medium text-md">Not yet inserted any balance.</P>
        </div > `
    }
    moneyList.map(listElement)
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