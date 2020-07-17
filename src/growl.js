import React from 'react'

import './growl.css'

export const Growl = ({ active, message, onDismissed }) => {
    const [state, setState] = React.useState(true)

    React.useEffect(() => {
        setState(true)
    }, [active])

    const handleClick = () => {
        setState(false)
        onDismissed()
    }

    return (
        <div className={`growl${active && state ? ' active' : ''}`}>
            {message}
            <div onClick={handleClick} className="growl-close"></div>
        </div>
    )
}

export function useGrowl(timeoutMs) {
    // state of the growl
    const [growlActive, setGrowlActive] = React.useState(false)

    // a ref to store a handle to the close growl timeout
    const timeoutHandle = React.useRef(null)

    // clears the timeout using the handle in the ref (if present)
    const clearCurrentTimeout = () => {
        if (timeoutHandle.current) {
            clearTimeout(timeoutHandle.current)
            timeoutHandle.current = null
        }
    }

    // Only care about the unmount, clear any pending timeouts when this component unmounts
    React.useEffect(() => () => clearCurrentTimeout(), [])

    return [
        // the first arg is the state
        growlActive, 

        // the second arg is a fn that allows you to safely set its state
        (active) => {

            // clear any pending timeouts, regardless of whether this was setting it to active or not
            clearCurrentTimeout()

            // if this was setting the growl to active, set a new timeout to close the growl and save the handle to it in our ref
            if (active) {
                timeoutHandle.current = setTimeout(() => {
                    setGrowlActive(false)
                    timeoutHandle.current = null
                },
                timeoutMs)
            }

            // actually set the state of the growl
            setGrowlActive(active)
        },
    ]
}