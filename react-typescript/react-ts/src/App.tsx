import "./App.css";
import Todos from "./components/Todos";

function App() {
    return (
        <div className="App">
            <Todos items={["Learn React", "Learn TypeScript"]} />
        </div>
    );
}

export default App;
