export default function createRenderScreen() {
    
  function loadNumbers(account) {
    console.log(account)
    const accountElement = document.getElementById('account');
    accountElement.textContent = `${account.firstNumber} ${account.operator} ${account.secondNumber} = `;
  }

  function loadCounter(time) {
    const timeElement = document.getElementById('time');
    timeElement.textContent = time.toString();
  }

  return {
    loadNumbers,
    loadCounter
  };
}
