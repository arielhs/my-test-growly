import React from 'react'
import { Link } from 'react-router-dom'

import logo from './logo.svg'

function SomeOtherComponent() {
    return (
        <div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
                <Link className="App-link" to="/">
					Go back to the App component
        		</Link>
				<p>
					Edit <code>src/SomeOtherComponent.js</code> and save to reload.
        		</p>
			</header>
		</div>
    )
}

export default SomeOtherComponent