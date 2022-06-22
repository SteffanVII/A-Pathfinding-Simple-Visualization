import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { appContext, goall, goallSet, goalTrue, model, modelSet, mouseDownl, mouseDownlSet, start, startl, startlSet, startTrue, targetl, targetlSet } from '../App';
import './../styles/cell.css'

function Cell( props ) {
    let [position, setPosition] = useState({ x : props.data.position.x, y : props.data.position.y });
    let [mode, setMode] = useState(-1);
    let [color, setColor] = useState('white');

    let context = useContext(appContext);
    
    useEffect(() => {
        if ( '0-0' === position.x + '-' + position.y ) {
            setMode(0)
            startlSet({
                id : position.x + '-' + position.y,
                mode : {
                    value : 0,
                    setter : setMode
                }
            });
        }
        if ( 1 * context.cellSize + '-' + 0 * context.cellSize === position.x + '-' + position.y ) {
            setMode(1)
            goallSet({
                id : position.x + '-' + position.y,
                mode : {
                    value : 1,
                    setter : setMode
                }
            });
        }
    }, [])

    useEffect(() => {
        if ( mode === -1 ) {
            setColor('white');
            props.data.astarPoint.obstacle = false;
        }
        if ( mode === 0 ) {
            setColor('green');
        }
        if ( mode === 1 ) {
            setColor('red');
        }
        if ( mode === 2 ) {
            setColor('gray');
            props.data.astarPoint.obstacle = true;
        }

        if ( context.path.value != undefined ) {

            if ( mode == -1 ) {
                if ( context.path.value.close.includes(position.x + '-' + position.y) ) {
                    setColor('yellow');
                }
                if ( context.path.value.open.includes(position.x + '-' + position.y) ) {
                    setColor('cyan');
                }
                if ( context.path.value.correct.includes(position.x + '-' + position.y) ) {
                    setColor('blue');
                }
            }

        }

    }, [mode, context.path.value]);

    useLayoutEffect(() => {
        if ( mode == 2 ) {
            setMode(-1);
        }
    }, [context.clear.value]);

    function enterEvent(event) {
        if ( mouseDownl ) {
            targetlSet({
                id : position.x + '-' + position.y,
                mode : {
                    value : mode,
                    setter : setMode
                }
            })
        }
    }

    return (
        <div onMouseEnter={enterEvent}
             onMouseDown={() => {
                mouseDownlSet(true);
                if ( mode === -1 ) {
                    setMode(2);
                    modelSet(2);
                } else if ( mode === 2 ) {
                    setMode(-1);
                    modelSet(-1);
                } else {
                    modelSet(mode);
                }
             }}
             className="cell"
             style={{'--x' : position.x + 'px',
                     '--y' : position.y + 'px',
                     '--cellSize' : props.data.size + 'px',
                     '--color' : color}}
            data-mode={mode}
            data-id={position.x + '-' + position.y}
            draggable={false}>
        </div>
    )
    
}

export default Cell;