import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// class Square extends React.Component {
//     // Boardで管理するため、初期設定としてのconstructorがいらなくなった
//     // constructor(props) {
//     //     super(props)
//     //     this.state = {
//     //         value: null,
//     //     }
//     // }
//     render() {
//         return (
//             // renderSquereからpropsとして受け取るため、this.propsを使う
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {this.props.value}
//             </button>
//         )
//     }
// }

// render()しか持たないクラスを簡単に書く方法を使って、Squereを書く
function Square(props) {
    return (
        // renderSquereからpropsとして受け取るため、propsを使う
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    // handleClick(i) {
    //     // squaresの配列のコピーを作る
    //     const squares = this.state.squares.slice()
    //     if (calculateWinner(squares) || squares[i]) {
    //         return
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O' // xIsNextがTrueなら'X'、Falseなら'O'
    //     // ↑の変更が反映されたsqueresで上書きする
    //     this.setState({ squares: squares, xIsNext: !this.state.xIsNext })
    // }

    renderSquare(i) {
        // この関数からSquareにpropsとして、2つの値(value, onClick)を渡す
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
    }

    render() {
        // const winner = calculateWinner(this.state.squares)
        // let status
        // if (winner) {
        //     status = 'Winner: ' + winner
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        // }

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)

        // mapの使用例
        // const numbers = [1, 2, 3];
        // const doubled = numbers.map(x => x * 2); // [2, 4, 6]

        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start'
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status
        if (winner) {
            status = 'Winner: ' + winner
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Game />)

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}
