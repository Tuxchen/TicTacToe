var ticTacToe = new Layer("Tic Tac Toe", "fa-solid fa-gamepad", 320);

// Spielfeld HTML generieren
const html = document.createElement("div");
html.classList.add("text-center");
html.innerHTML = `
    <p>Spiel Tic Tac Toe 🎮</p>
    <table id="board" style="margin:auto;">
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
    </table>
    <p id="status">Spieler X beginnt</p>
`;

ticTacToe.setBody(html);

let currentPlayer = "X";
const board = [];

function checkWinner() {
    const b = board.map(row => row.map(cell => cell.textContent));
    const lines = [
        [b[0][0], b[0][1], b[0][2]],
        [b[1][0], b[1][1], b[1][2]],
        [b[2][0], b[2][1], b[2][2]],
        [b[0][0], b[1][0], b[2][0]],
        [b[0][1], b[1][1], b[2][1]],
        [b[0][2], b[1][2], b[2][2]],
        [b[0][0], b[1][1], b[2][2]],
        [b[0][2], b[1][1], b[2][0]],
    ];

    return lines.some(line => line.every(cell => cell === currentPlayer));
}

function handleClick(event) {
    const cell = event.target;
    if (cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    if (checkWinner()) {
        document.getElementById("status").innerText = `Spieler ${currentPlayer} hat gewonnen!`;
        Array.from(document.querySelectorAll("#board td")).forEach(td => td.removeEventListener("click", handleClick));
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerText = `Spieler ${currentPlayer} ist am Zug`;
}

// Spiellogik initialisieren
const rows = document.querySelectorAll("#board tr");
rows.forEach((tr, i) => {
    board[i] = [];
    const cells = tr.querySelectorAll("td");
    cells.forEach((td, j) => {
        board[i][j] = td;
        td.addEventListener("click", handleClick);
        td.style.width = "60px";
        td.style.height = "60px";
        td.style.border = "1px solid white";
        td.style.fontSize = "28px";
        td.style.cursor = "pointer";
    });
});

ticTacToe.build();