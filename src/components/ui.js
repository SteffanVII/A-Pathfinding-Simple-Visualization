import { useContext } from 'react';
import { appContext, goall, startl } from '../App';
import './../styles/ui.css';

function UI( props ) {
    let context = useContext(appContext);

    function findPath() {
        context.astar.setPath( startl.id, goall.id );
        context.path.setter(context.astar.calculatePath());
    }

    function clear() {
        context.clear.setter(!context.clear.value);
    }

    function changeHeuristic(event) {
        if ( event.target.id == "manhattan" ) {
            context.astar.setHeuristic(0);
        }
        if ( event.target.id == "euclidian" ) {
            context.astar.setHeuristic(1);
        }
    }

    return (
        <div id="UI">
            <div className="ui-wrapper">
                <div className="heuristics">
                    <span className="heuristics-span">Heuristic</span>
                    <ul>
                        <li>
                            <input type="radio" name="heuristic" id="manhattan" defaultChecked onClick={changeHeuristic}/>
                            <label htmlFor="manhattan">Manhattan</label>
                        </li>
                        <li>
                            <input type="radio" name="heuristic" id="euclidian" onClick={changeHeuristic}/>
                            <label htmlFor="euclidian">Euclidian</label>
                        </li>
                    </ul>
                </div>
                <button className='clear-walls'
                        onClick={clear}>
                    Clear walls
                </button>
                <button className="find-path"
                        onClick={findPath}
                >Find Path</button>   
            </div>
        </div>
    );
}

export default UI;