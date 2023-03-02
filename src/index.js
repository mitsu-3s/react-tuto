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
    constructor(props) {
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    }

    handleClick(i) {
        // squaresの配列のコピーを作る
        const squares = this.state.squares.slice()
        squares[i] = this.state.xIsNext ? 'X' : 'O' // xIsNextがTrueなら'X'、Falseなら'O'
        // ↑の変更が反映されたsqueresで上書きする
        this.setState({ squares: squares, xIsNext: !this.state.xIsNext })
    }

    renderSquare(i) {
        // この関数からSquareにpropsとして、2つの値(value, onClick)を渡す
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')

        return (
            <div>
                <div className="status">{status}</div>
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
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Game />)
