/* ROYAL CHESSmPremium JavaScript Chess Game*/


/* PIECES*/

const symbols = {

    w: {
        k: "♔",
        q: "♕",
        r: "♖",
        b: "♗",
        n: "♘",
        p: "♙"
    },

    b: {
        k: "♚",
        q: "♛",
        r: "♜",
        b: "♝",
        n: "♞",
        p: "♟"
    }

};


/*INITIAL BOARD*/

const initialBoard = [

    [
        "br", "bn", "bb", "bq",
        "bk", "bb", "bn", "br"
    ],

    [
        "bp", "bp", "bp", "bp",
        "bp", "bp", "bp", "bp"
    ],

    [
        null, null, null, null,
        null, null, null, null
    ],

    [
        null, null, null, null,
        null, null, null, null
    ],

    [
        null, null, null, null,
        null, null, null, null
    ],

    [
        null, null, null, null,
        null, null, null, null
    ],

    [
        "wp", "wp", "wp", "wp",
        "wp", "wp", "wp", "wp"
    ],

    [
        "wr", "wn", "wb", "wq",
        "wk", "wb", "wn", "wr"
    ]

];


/*GAME VARIABLES*/

let board = copyBoard(initialBoard);

let turn = "w";

let selected = null;

let validMoves = [];

let history = [];

let moveNumber = 0;

let gameOver = false;

let soundOn = true;

let pendingPromotion = null;


/* CASTLING */

let castling = {
    wk: true,
    wq: true,
    bk: true,
    bq: true
};


/* EN PASSANT */

let enPassant = null;


/* TIMERS */

let time = {
    w: 600,
    b: 600
};

let timerInterval;


/*DOM*/

const boardElement =
    document.getElementById("board");

const turnText =
    document.getElementById("turnText");

const whiteTimer =
    document.getElementById("whiteTimer");

const blackTimer =
    document.getElementById("blackTimer");

const whiteCard =
    document.getElementById("whiteCard");

const blackCard =
    document.getElementById("blackCard");

const moveHistory =
    document.getElementById("moveHistory");

const moveCount =
    document.getElementById("moveCount");

const whiteCaptured =
    document.getElementById("whiteCaptured");

const blackCaptured =
    document.getElementById("blackCaptured");

const soundBtn =
    document.getElementById("soundBtn");

const newGameBtn =
    document.getElementById("newGameBtn");

const undoBtn =
    document.getElementById("undoBtn");

const promotionModal =
    document.getElementById("promotionModal");

const gameOverModal =
    document.getElementById("gameOverModal");

const winnerTitle =
    document.getElementById("winnerTitle");

const winnerMessage =
    document.getElementById("winnerMessage");

const playAgainBtn =
    document.getElementById("playAgainBtn");


/* COPY BOARD*/

function copyBoard(b) {

    return b.map(row => [...row]);

}


/*DRAW BOARD*/

function renderBoard() {

    boardElement.innerHTML = "";

    for (let r = 0; r < 8; r++) {

        for (let c = 0; c < 8; c++) {

            const square =
                document.createElement("div");

            square.className =
                "square " +
                ((r + c) % 2 === 0
                    ? "light"
                    : "dark");

            square.dataset.row = r;
            square.dataset.col = c;

            const piece = board[r][c];

            if (piece) {

                const pieceElement =
                    document.createElement("span");

                pieceElement.className =
                    "piece " +
                    (piece[0] === "w"
                        ? "white"
                        : "black");

                pieceElement.textContent =
                    symbols[piece[0]][piece[1]];

                square.appendChild(pieceElement);

            }


            /* SELECTED */

            if (
                selected &&
                selected.r === r &&
                selected.c === c
            ) {

                square.classList.add("selected");

            }


            /* VALID MOVES */

            const move =
                validMoves.find(
                    m => m.r === r && m.c === c
                );

            if (move) {

                if (board[r][c]) {
                    square.classList.add("capture");
                } else {
                    square.classList.add("valid");
                }

            }


            /* CHECK */

            const king =
                board[r][c];

            if (
                king &&
                king[1] === "k" &&
                isInCheck(king[0], board)
            ) {

                square.classList.add("check");

            }


            square.addEventListener(
                "click",
                () => handleSquareClick(r, c)
            );


            boardElement.appendChild(square);

        }

    }

}


/* -----------------------------
   CLICK HANDLER
----------------------------- */

function handleSquareClick(r, c) {

    if (gameOver) return;


    const piece = board[r][c];


    /* MOVE SELECTED PIECE */

    const chosenMove =
        validMoves.find(
            m => m.r === r && m.c === c
        );

    if (selected && chosenMove) {

        makeMove(
            selected.r,
            selected.c,
            r,
            c
        );

        return;

    }


    /* SELECT PIECE */

    if (piece && piece[0] === turn) {

        selected = { r, c };

        validMoves =
            getLegalMoves(r, c);

        playSound("select");

        renderBoard();

        return;

    }


    /* CLEAR */

    selected = null;

    validMoves = [];

    renderBoard();

}


/* -----------------------------
   GET LEGAL MOVES
----------------------------- */

function getLegalMoves(r, c) {

    const piece = board[r][c];

    if (!piece) return [];

    const moves =
        getPseudoMoves(r, c, board, true);

    return moves.filter(move => {

        const testBoard =
            copyBoard(board);

        applyMoveToBoard(
            testBoard,
            r,
            c,
            move.r,
            move.c
        );

        return !isInCheck(
            piece[0],
            testBoard
        );

    });

}


/* -----------------------------
   PSEUDO MOVES
----------------------------- */

function getPseudoMoves(
    r,
    c,
    state,
    includeCastling = false
) {

    const piece = state[r][c];

    if (!piece) return [];

    const color = piece[0];

    const type = piece[1];

    const moves = [];


    function add(nr, nc) {

        if (
            nr < 0 ||
            nr > 7 ||
            nc < 0 ||
            nc > 7
        ) return;

        const target =
            state[nr][nc];

        if (!target) {

            moves.push({
                r: nr,
                c: nc
            });

        } else if (target[0] !== color) {

            moves.push({
                r: nr,
                c: nc
            });

        }

    }


    /* PAWN */

    if (type === "p") {

        const dir =
            color === "w" ? -1 : 1;

        const startRow =
            color === "w" ? 6 : 1;

        const one = r + dir;

        if (
            one >= 0 &&
            one <= 7 &&
            !state[one][c]
        ) {

            moves.push({
                r: one,
                c
            });


            const two = r + dir * 2;

            if (
                r === startRow &&
                !state[two][c]
            ) {

                moves.push({
                    r: two,
                    c
                });

            }

        }


        /* CAPTURE */

        for (const dc of [-1, 1]) {

            const nr = r + dir;
            const nc = c + dc;

            if (
                nr >= 0 &&
                nr <= 7 &&
                nc >= 0 &&
                nc <= 7
            ) {

                const target =
                    state[nr][nc];

                if (
                    target &&
                    target[0] !== color
                ) {

                    moves.push({
                        r: nr,
                        c: nc
                    });

                }


                /* EN PASSANT */

                if (
                    enPassant &&
                    enPassant.r === nr &&
                    enPassant.c === nc
                ) {

                    moves.push({
                        r: nr,
                        c: nc,
                        enPassant: true
                    });

                }

            }

        }

    }


    /* KNIGHT */

    if (type === "n") {

        const jumps = [

            [-2, -1],
            [-2, 1],
            [-1, -2],
            [-1, 2],
            [1, -2],
            [1, 2],
            [2, -1],
            [2, 1]

        ];

        jumps.forEach(([dr, dc]) => {

            add(r + dr, c + dc);

        });

    }


    /* BISHOP */

    if (type === "b") {

        slide(
            r,
            c,
            state,
            color,
            [
                [-1, -1],
                [-1, 1],
                [1, -1],
                [1, 1]
            ],
            moves
        );

    }


    /* ROOK */

    if (type === "r") {

        slide(
            r,
            c,
            state,
            color,
            [
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1]
            ],
            moves
        );

    }


    /* QUEEN */

    if (type === "q") {

        slide(
            r,
            c,
            state,
            color,
            [
                [-1, -1],
                [-1, 1],
                [1, -1],
                [1, 1],
                [-1, 0],
                [1, 0],
                [0, -1],
                [0, 1]
            ],
            moves
        );

    }


    /* KING */

    if (type === "k") {

        for (let dr = -1; dr <= 1; dr++) {

            for (let dc = -1; dc <= 1; dc++) {

                if (dr !== 0 || dc !== 0) {

                    add(
                        r + dr,
                        c + dc
                    );

                }

            }

        }


        /* CASTLING */

        if (includeCastling) {

            addCastlingMoves(
                r,
                c,
                state,
                moves
            );

        }

    }


    return moves;

}


/* -----------------------------
   SLIDING PIECES
----------------------------- */

function slide(
    r,
    c,
    state,
    color,
    directions,
    moves
) {

    directions.forEach(([dr, dc]) => {

        let nr = r + dr;
        let nc = c + dc;

        while (
            nr >= 0 &&
            nr <= 7 &&
            nc >= 0 &&
            nc <= 7
        ) {

            const target =
                state[nr][nc];

            if (!target) {

                moves.push({
                    r: nr,
                    c: nc
                });

            } else {

                if (target[0] !== color) {

                    moves.push({
                        r: nr,
                        c: nc
                    });

                }

                break;

            }

            nr += dr;
            nc += dc;

        }

    });

}


/* -----------------------------
   CASTLING
----------------------------- */

function addCastlingMoves(
    r,
    c,
    state,
    moves
) {

    const color =
        state[r][c][0];

    if (
        isInCheck(color, state)
    ) return;


    /* WHITE */

    if (color === "w" && r === 7 && c === 4) {

        /* KING SIDE */

        if (
            castling.wk &&
            state[7][5] === null &&
            state[7][6] === null &&
            state[7][7] === "wr" &&
            !squareAttacked(
                7, 5, "b", state
            ) &&
            !squareAttacked(
                7, 6, "b", state
            )
        ) {

            moves.push({
                r: 7,
                c: 6,
                castle: "wk"
            });

        }


        /* QUEEN SIDE */

        if (
            castling.wq &&
            state[7][1] === null &&
            state[7][2] === null &&
            state[7][3] === null &&
            state[7][0] === "wr" &&
            !squareAttacked(
                7, 3, "b", state
            ) &&
            !squareAttacked(
                7, 2, "b", state
            )
        ) {

            moves.push({
                r: 7,
                c: 2,
                castle: "wq"
            });

        }

    }


    /* BLACK */

    if (color === "b" && r === 0 && c === 4) {

        /* KING SIDE */

        if (
            castling.bk &&
            state[0][5] === null &&
            state[0][6] === null &&
            state[0][7] === "br" &&
            !squareAttacked(
                0, 5, "w", state
            ) &&
            !squareAttacked(
                0, 6, "w", state
            )
        ) {

            moves.push({
                r: 0,
                c: 6,
                castle: "bk"
            });

        }


        /* QUEEN SIDE */

        if (
            castling.bq &&
            state[0][1] === null &&
            state[0][2] === null &&
            state[0][3] === null &&
            state[0][0] === "br" &&
            !squareAttacked(
                0, 3, "w", state
            ) &&
            !squareAttacked(
                0, 2, "w", state
            )
        ) {

            moves.push({
                r: 0,
                c: 2,
                castle: "bq"
            });

        }

    }

}


/* -----------------------------
   APPLY MOVE TO TEST BOARD
----------------------------- */

function applyMoveToBoard(
    state,
    fr,
    fc,
    tr,
    tc
) {

    const piece =
        state[fr][fc];

    state[tr][tc] =
        state[fr][fc];

    state[fr][fc] = null;


    /* EN PASSANT */

    if (
        piece &&
        piece[1] === "p" &&
        Math.abs(tc - fc) === 1 &&
        !state[tr][tc]
    ) {

        state[fr][tc] = null;

    }

}


/* -----------------------------
   MAKE REAL MOVE
----------------------------- */

function makeMove(
    fr,
    fc,
    tr,
    tc
) {

    const piece =
        board[fr][fc];

    const target =
        board[tr][tc];

    const chosen =
        validMoves.find(
            m =>
                m.r === tr &&
                m.c === tc
        );


    /* SAVE HISTORY */

    history.push({

        board: copyBoard(board),

        turn,

        castling: { ...castling },

        enPassant,

        time: { ...time },

        moveNumber,

        whiteCaptured:
            whiteCaptured.innerHTML,

        blackCaptured:
            blackCaptured.innerHTML,

        moveHistory:
            moveHistory.innerHTML

    });


    /* CAPTURE */

    if (target) {

        addCaptured(
            target
        );

        playSound("capture");

    } else {

        playSound("move");

    }


    /* EN PASSANT CAPTURE */

    if (
        chosen &&
        chosen.enPassant
    ) {

        const capturedPawn =
            board[fr][tc];

        addCaptured(
            capturedPawn
        );

        board[fr][tc] = null;

        playSound("capture");

    }


    /* MOVE */

    board[tr][tc] =
        piece;

    board[fr][fc] =
        null;


    /* CASTLING */

    if (
        chosen &&
        chosen.castle
    ) {

        if (chosen.castle === "wk") {

            board[7][5] = "wr";
            board[7][7] = null;

        }

        if (chosen.castle === "wq") {

            board[7][3] = "wr";
            board[7][0] = null;

        }

        if (chosen.castle === "bk") {

            board[0][5] = "br";
            board[0][7] = null;

        }

        if (chosen.castle === "bq") {

            board[0][3] = "br";
            board[0][0] = null;

        }

    }


    /* CASTLING RIGHTS */

    updateCastlingRights(
        piece,
        fr,
        fc,
        target,
        tr,
        tc
    );


    /* EN PASSANT TARGET */

    enPassant = null;

    if (
        piece[1] === "p" &&
        Math.abs(tr - fr) === 2
    ) {

        enPassant = {

            r: (tr + fr) / 2,

            c: fc

        };

    }


    /* PROMOTION */

    if (
        piece[1] === "p" &&
        (tr === 0 || tr === 7)
    ) {

        pendingPromotion = {
            r: tr,
            c: tc,
            color: piece[0]
        };

        showPromotion();

        return;

    }


    finishMove(
        piece,
        fr,
        fc,
        tr,
        tc
    );

}


/* -----------------------------
   FINISH MOVE
----------------------------- */

function finishMove(
    piece,
    fr,
    fc,
    tr,
    tc
) {

    const notation =
        createNotation(
            piece,
            fr,
            fc,
            tr,
            tc
        );

    addMoveHistory(
        notation,
        piece[0]
    );


    moveNumber++;

    turn =
        turn === "w"
            ? "b"
            : "w";


    selected = null;

    validMoves = [];


    updateUI();

    checkGameStatus();

}


/* -----------------------------
   PROMOTION
----------------------------- */

function showPromotion() {

    promotionModal.classList.remove(
        "hidden"
    );

}


/* PROMOTION BUTTONS */

document
    .querySelectorAll(".promotion-options button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const type =
                    button.dataset.piece;

                board[
                    pendingPromotion.r
                ][
                    pendingPromotion.c
                ] =
                    pendingPromotion.color +
                    type;


                promotionModal.classList.add(
                    "hidden"
                );


                const notation =
                    "Pawn → " +
                    type.toUpperCase();


                addMoveHistory(
                    notation,
                    pendingPromotion.color
                );


                moveNumber++;

                turn =
                    turn === "w"
                        ? "b"
                        : "w";


                pendingPromotion = null;

                selected = null;

                validMoves = [];

                playSound("move");

                updateUI();

                checkGameStatus();

            }
        );

    });


/* -----------------------------
   CASTLING RIGHTS
----------------------------- */

function updateCastlingRights(
    piece,
    fr,
    fc,
    target,
    tr,
    tc
) {

    if (piece === "wk") {

        castling.wk = false;
        castling.wq = false;

    }

    if (piece === "bk") {

        castling.bk = false;
        castling.bq = false;

    }


    if (
        piece === "wr" &&
        fr === 7 &&
        fc === 0
    ) {

        castling.wq = false;

    }

    if (
        piece === "wr" &&
        fr === 7 &&
        fc === 7
    ) {

        castling.wk = false;

    }


    if (
        piece === "br" &&
        fr === 0 &&
        fc === 0
    ) {

        castling.bq = false;

    }

    if (
        piece === "br" &&
        fr === 0 &&
        fc === 7
    ) {

        castling.bk = false;

    }


    /* ROOK CAPTURE */

    if (
        target === "wr" &&
        tr === 7 &&
        tc === 0
    ) {

        castling.wq = false;

    }

    if (
        target === "wr" &&
        tr === 7 &&
        tc === 7
    ) {

        castling.wk = false;

    }

    if (
        target === "br" &&
        tr === 0 &&
        tc === 0
    ) {

        castling.bq = false;

    }

    if (
        target === "br" &&
        tr === 0 &&
        tc === 7
    ) {

        castling.bk = false;

    }

}


/* -----------------------------
   FIND KING
----------------------------- */

function findKing(
    color,
    state
) {

    for (let r = 0; r < 8; r++) {

        for (let c = 0; c < 8; c++) {

            if (
                state[r][c] === color + "k"
            ) {

                return { r, c };

            }

        }

    }

    return null;

}


/* -----------------------------
   CHECK
----------------------------- */

function isInCheck(
    color,
    state
) {

    const king =
        findKing(color, state);

    if (!king) return true;

    const enemy =
        color === "w"
            ? "b"
            : "w";

    return squareAttacked(
        king.r,
        king.c,
        enemy,
        state
    );

}


/* -----------------------------
   SQUARE ATTACKED
----------------------------- */

function squareAttacked(
    r,
    c,
    attacker,
    state
) {

    for (let pr = 0; pr < 8; pr++) {

        for (let pc = 0; pc < 8; pc++) {

            const piece =
                state[pr][pc];

            if (
                !piece ||
                piece[0] !== attacker
            ) continue;


            const type =
                piece[1];


            /* PAWN */

            if (type === "p") {

                const dir =
                    attacker === "w"
                        ? -1
                        : 1;

                if (
                    pr + dir === r &&
                    Math.abs(pc - c) === 1
                ) {

                    return true;

                }

            }


            /* KING */

            if (type === "k") {

                if (
                    Math.abs(pr - r) <= 1 &&
                    Math.abs(pc - c) <= 1
                ) {

                    return true;

                }

            }


            /* KNIGHT */

            if (type === "n") {

                const dr =
                    Math.abs(pr - r);

                const dc =
                    Math.abs(pc - c);

                if (
                    (dr === 2 && dc === 1) ||
                    (dr === 1 && dc === 2)
                ) {

                    return true;

                }

            }


            /* SLIDERS */

            if (
                type === "b" ||
                type === "r" ||
                type === "q"
            ) {

                const directions = [];


                if (
                    type === "b" ||
                    type === "q"
                ) {

                    directions.push(
                        [-1, -1],
                        [-1, 1],
                        [1, -1],
                        [1, 1]
                    );

                }


                if (
                    type === "r" ||
                    type === "q"
                ) {

                    directions.push(
                        [-1, 0],
                        [1, 0],
                        [0, -1],
                        [0, 1]
                    );

                }


                for (
                    const [dr, dc]
                    of directions
                ) {

                    let nr =
                        pr + dr;

                    let nc =
                        pc + dc;


                    while (
                        nr >= 0 &&
                        nr < 8 &&
                        nc >= 0 &&
                        nc < 8
                    ) {

                        if (
                            nr === r &&
                            nc === c
                        ) {

                            return true;

                        }


                        if (
                            state[nr][nc]
                        ) {

                            break;

                        }


                        nr += dr;
                        nc += dc;

                    }

                }

            }

        }

    }

    return false;

}


/* -----------------------------
   GAME STATUS
----------------------------- */

function checkGameStatus() {

    const inCheck =
        isInCheck(
            turn,
            board
        );


    const moves =
        getAllLegalMoves(
            turn
        );


    if (
        moves.length === 0
    ) {

        gameOver = true;

        stopTimer();

        if (inCheck) {

            const winner =
                turn === "w"
                    ? "Black"
                    : "White";

            playSound("win");

            showGameOver(
                winner,
                "Checkmate! Excellent game."
            );

        } else {

            showGameOver(
                "Draw",
                "The game ended in a stalemate."
            );

        }

        return;

    }


    updateTurnUI();

}


/* -----------------------------
   ALL LEGAL MOVES
----------------------------- */

function getAllLegalMoves(
    color
) {

    const all = [];

    for (let r = 0; r < 8; r++) {

        for (let c = 0; c < 8; c++) {

            const piece =
                board[r][c];

            if (
                piece &&
                piece[0] === color
            ) {

                const moves =
                    getLegalMoves(r, c);

                all.push(
                    ...moves
                );

            }

        }

    }

    return all;

}


/* -----------------------------
   CAPTURE DISPLAY
----------------------------- */

function addCaptured(piece) {

    if (!piece) return;

    const element =
        piece[0] === "w"
            ? blackCaptured
            : whiteCaptured;

    if (
        element.textContent.trim() ===
        "None"
    ) {

        element.textContent = "";

    }

    element.textContent +=
        symbols[piece[0]][piece[1]];

}


/* MOVE HISTORY*/

function addMoveHistory(
    notation,
    color
) {

    if (
        color === "w"
    ) {

        const row =
            document.createElement("div");

        row.className =
            "move-row";

        row.innerHTML = `
            <span class="move-number">
                ${Math.floor(moveNumber / 2) + 1}.
            </span>

            <span>
                ${notation}
            </span>

            <span class="black-move">
            </span>
        `;

        moveHistory
            .querySelector(".empty-history")
            ?.remove();

        moveHistory.appendChild(row);

    } else {

        const rows =
            moveHistory.querySelectorAll(
                ".move-row"
            );

        if (rows.length) {

            rows[
                rows.length - 1
            ].children[2].textContent =
                notation;

        }

    }


    moveHistory.scrollTop =
        moveHistory.scrollHeight;

}


/* NOTATION*/

function createNotation(
    piece,
    fr,
    fc,
    tr,
    tc
) {

    const files =
        "abcdefgh";

    const pieceNames = {

        k: "K",
        q: "Q",
        r: "R",
        b: "B",
        n: "N",
        p: ""

    };

    const from =
        files[fc] +
        (8 - fr);

    const to =
        files[tc] +
        (8 - tr);

    const capture =
        board[tr][tc]
            ? "x"
            : "";

    if (
        piece[1] === "p"
    ) {

        return (
            capture
                ? files[fc] + "x"
                : ""
        ) + to;

    }

    return (
        pieceNames[piece[1]] +
        capture +
        to
    );

}


/* -----------------------------
   TURN UI
----------------------------- */

function updateTurnUI() {

    turnText.textContent =
        turn === "w"
            ? "White's Turn"
            : "Black's Turn";


    whiteCard.classList.toggle(
        "active",
        turn === "w"
    );

    blackCard.classList.toggle(
        "active",
        turn === "b"
    );

}


/* -----------------------------
   UPDATE UI
----------------------------- */

function updateUI() {

    renderBoard();

    updateTurnUI();

    moveCount.textContent =
        `${moveNumber} ${moveNumber === 1
            ? "move"
            : "moves"
        }`;

    updateTimers();

}


/* -----------------------------
   TIMER
----------------------------- */

function startTimer() {

    stopTimer();

    timerInterval =
        setInterval(() => {

            if (gameOver) return;

            time[turn]--;

            updateTimers();


            if (
                time[turn] <= 0
            ) {

                time[turn] = 0;

                gameOver = true;

                stopTimer();

                const winner =
                    turn === "w"
                        ? "Black"
                        : "White";

                showGameOver(
                    winner,
                    "Time's up!"
                );

            }

        }, 1000);

}


function stopTimer() {

    clearInterval(
        timerInterval
    );

}


function updateTimers() {

    whiteTimer.textContent =
        formatTime(time.w);

    blackTimer.textContent =
        formatTime(time.b);

}


function formatTime(seconds) {

    const min =
        Math.floor(seconds / 60);

    const sec =
        seconds % 60;

    return (
        String(min).padStart(2, "0") +
        ":" +
        String(sec).padStart(2, "0")
    );

}


/*UNDO*/

undoBtn.addEventListener(
    "click",
    () => {

        if (
            history.length === 0 ||
            gameOver
        ) return;

        const previous =
            history.pop();


        board =
            copyBoard(
                previous.board
            );

        turn =
            previous.turn;

        castling =
            { ...previous.castling };

        enPassant =
            previous.enPassant;

        time =
            { ...previous.time };

        moveNumber =
            previous.moveNumber;


        whiteCaptured.innerHTML =
            previous.whiteCaptured;

        blackCaptured.innerHTML =
            previous.blackCaptured;

        moveHistory.innerHTML =
            previous.moveHistory;


        selected = null;

        validMoves = [];


        updateUI();

        startTimer();

        playSound("click");

    }
);


/*NEW GAME*/

newGameBtn.addEventListener(
    "click",
    resetGame
);

playAgainBtn.addEventListener(
    "click",
    resetGame
);


function resetGame() {

    board =
        copyBoard(
            initialBoard
        );

    turn = "w";

    selected = null;

    validMoves = [];

    history = [];

    moveNumber = 0;

    gameOver = false;

    castling = {

        wk: true,
        wq: true,
        bk: true,
        bq: true

    };

    enPassant = null;

    pendingPromotion = null;


    time = {

        w: 600,
        b: 600

    };


    whiteCaptured.textContent =
        "None";

    blackCaptured.textContent =
        "None";


    moveHistory.innerHTML = `
        <div class="empty-history">
            Make your first move
        </div>
    `;


    gameOverModal.classList.add(
        "hidden"
    );


    updateUI();

    startTimer();

    playSound("click");

}


/* GAME OVER MODAL*/

function showGameOver(
    winner,
    message
) {

    winnerTitle.textContent =
        winner === "Draw"
            ? "Game Draw!"
            : `${winner} Wins!`;

    winnerMessage.textContent =
        message;

    gameOverModal.classList.remove(
        "hidden"
    );

}


/* -----------------------------
   SOUND ENGINE
----------------------------- */

let audioContext = null;


function playSound(type) {

    if (!soundOn) return;

    try {

        if (!audioContext) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.connect(
            gain
        );

        gain.connect(
            audioContext.destination
        );


        let frequency = 300;

        let duration = .08;


        if (type === "select") {

            frequency = 520;

        }

        if (type === "move") {

            frequency = 380;

        }

        if (type === "capture") {

            frequency = 180;

            duration = .13;

        }

        if (type === "win") {

            frequency = 700;

            duration = .35;

        }

        if (type === "click") {

            frequency = 250;

        }


        oscillator.frequency.value =
            frequency;

        oscillator.type =
            "sine";


        gain.gain.setValueAtTime(
            .001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            .18,
            audioContext.currentTime + .01
        );

        gain.gain.exponentialRampToValueAtTime(
            .001,
            audioContext.currentTime + duration
        );


        oscillator.start();

        oscillator.stop(
            audioContext.currentTime +
            duration
        );

    } catch (error) {

        console.log(
            "Audio unavailable"
        );

    }

}


/* -SOUND BUTTON*/

soundBtn.addEventListener(
    "click",
    () => {

        soundOn =
            !soundOn;

        soundBtn.innerHTML =
            soundOn
                ? "🔊 Sound On"
                : "🔇 Sound Off";

        if (soundOn) {

            playSound("click");

        }

    }
);


/*START GAME*/

updateUI();

startTimer();