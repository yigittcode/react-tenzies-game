import Header from "./Header";
import Dice from "./Dice";
export default function Main() {
  return (
    <main className="gameArea">
        <Header/>

        <div className="dice-container">
            <Dice/>
        </div>
    </main>
  )
}
