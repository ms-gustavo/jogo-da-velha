const boardRegions = document.querySelectorAll("#gameBoard span"); //Pego todos os itens SPAN de #gameBoard
let vBoard = []; //tabuleiro virtual para conferência
let turnPlayer = ""; //para trocar o nome em h2
const start = document.getElementById("start");

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer); //Pego o ID de turnPlayer declarado na próxima função ('player1')
  document.getElementById("turnPlayer").innerText = playerInput.value; //Adiciona o conteúdo do input "player1"
}

function initializeGame() {
  start.style.backgroundColor = "green";
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="turnPlayer"></span>'; //Reseta o texto
  updateTitle();
  boardRegions.forEach((element) => {
    element.classList.remove("win");
    element.innerText = "";
    element.addEventListener("click", handleBoardClick);
    element.classList.add("cursor-pointer"); //Retira o verde e reabilita o click
  });
}

function disableRegion(element) {
  element.classList.remove("cursor-pointer");
  element.removeEventListener("click", handleBoardClick); //Desabilita o click quando a área estiver marcada
}

function handleBoardClick(ev) {
  const span = ev.currentTarget;
  const region = span.dataset.region;
  const rowColumnPair = region.split("."); //Separa a string do data-region no .
  const row = rowColumnPair[0]; //com data-region separada em 2 strings, a [0] = linha
  const column = rowColumnPair[1]; //[1] = coluna
  if (turnPlayer === "player1") {
    span.innerText = "X";
    vBoard[row][column] = "X"; //caso turnPlayer (span) === player1, marcaremos X nos tabuleiros
  } else {
    span.innerText = "O";
    vBoard[row][column] = "O"; //caso !== player1, marcaremos O nos tabuleiros
  }
  console.clear();
  console.table(vBoard); //atualizamos o console com o tabuleiro virtual para conferência
  disableRegion(span); //desabilitamos o span marcado

  //Conferência para mudar o player ou declarar empate
  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    handleWin(winRegions);
  } else if (vBoard.flat().includes("")) {
    //.flat = cria um novo array com todos os subarrays concatenados
    //ex: arra1 = [1, 2, 3, [4, 5], [6, 7]] --> [1, 2, 3, 4, 5, 6, 7]
    //caso no vBoard ainda tenha lugar não marcado, (includes("")), trocará a vez do player
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "Empate!";
    start.style.backgroundColor = "black";
  }
}

function handleWin(regions) {
  regions.forEach((region) => {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const playerName = document.getElementById(turnPlayer).value;
  document.querySelector("h2").innerHTML = `${playerName} venceu! Parabéns.`;
  start.style.backgroundColor = "black";
}

function getWinRegions() {
  const winRegions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

document.getElementById("start").addEventListener("click", initializeGame);
