import "./App.css";

import React, { useState } from "react";

import logo from "./logo.svg";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p className="header">
					{" "}
					🚀 Vite + React + Typescript + Vitest 🤘 & <br />
					Eslint 🔥+ Prettier
				</p>
				<div className="body">
					{" "}
					<button onClick={() => setCount((count) => count + 1)}>count is: {count}</button>
				</div>
			</header>
		</div>
	);
}

export default App;
