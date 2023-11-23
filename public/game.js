export default function game() {

    const state = {
        players: {},
        accounts: {},
        atualAccount: {},
        running: false,
        options: {
            operators: ['+', '-', 'x', ':'],
            rounds: 10,
            time: 5 //seconds
        },
        observers: []
    }

    function createGame() {
        for (let i = 0; i < state.options.rounds; i++) {
            const operator = state.options.operators[Math.floor(Math.random() * state.options.operators.length)]
            const firstNumber = Math.round(Math.random() * 10)
            const secondNumber = Math.round(Math.random() * 10)

            let result = 0

            switch (operator) {
                case state.options.operators[0]:
                    result = firstNumber + secondNumber;
                    break;
                case state.options.operators[1]:
                    result = firstNumber - secondNumber;
                    break;
                case state.options.operators[2]:
                    result = firstNumber * secondNumber;
                    break;
                case state.options.operators[3]:
                    result = parseFloat((firstNumber / secondNumber).toFixed(1));
                    break;
                default:
                    break;
            }

            state.accounts[`account${i}`] = {
                firstNumber,
                secondNumber,
                operator,
                result
            }
        }
    }

    function start() {
        let round = 0
        let count = state.options.time
        const time = setInterval(() => {

            const account = state.accounts[`account${round}`]
            state.atualAccount = account

            if (round >= state.options.rounds) {
                clearInterval(time)
            }
            notifyAll({
                type: 'change-account',
                account: state.atualAccount,
                schedule: count
            })

        }, state.options.time * 1000)
    }

    function checkResult(result) {
        if (result == state.atualAccount.result) {
            console.log('acerto')
            return true
        } else {
            console.log('erro')
            return false
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    function addPlayer(command) {
        const playerId = command.playerId
        state.players[playerId] = {
            points: 0
        }
    }

    return {
        state,
        subscribe,
        addPlayer,
        setState,
        createGame,
        checkResult,
        start
    }
}