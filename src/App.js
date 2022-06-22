import { useLayoutEffect, useEffect, useState, useContext, createContext } from 'react';
import './styles/App.css';

import Cell from './components/cell';
import AStar from './components/astar';
import UI from './components/ui';

// get window dimensions hook
function getDimensions() {
  const { innerWidth : width, innerHeight : height } = window;
  return {
    width,
    height
  }
}

function useWindowDimensions() {
  
  const [dimensions, setDimensions] = useState(getDimensions());
  
  useEffect(() => {
    function handleResize() {
      setDimensions(getDimensions);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.addEventListener('resize', handleResize);
  }, []);

  return dimensions;
}
// --------------------------

export const appContext = createContext();

export let start = false;
export let goal = false;

export let startTrue = () => {
  start = true;
}

export let goalTrue = () => {
  goal = true;
}

export let startl = null;

export let startlSet = (value) => {
  startl = value;
}

export let goall = null;

export let goallSet = (value) => {
  goall = value;
}
export let targetl = null;

export let targetlSet = (value) => {
  targetl = value;
  
  if ( targetl != null ) {
    if ( targetl.mode.value != 2 ) {
      if ( model == 0 && targetl.mode.value != 1 ) {
        targetl.mode.setter(model);
        startl.mode.setter(-1);
        // setStart(target);
        startl = targetl;
      }
      if ( model == 1 && targetl.mode.value != 0 ) {
        targetl.mode.setter(model);
        goall.mode.setter(-1);
        // setGoal(target);
        goall = targetl
      }
      if ( model == 2 ) {
        targetl.mode.setter(2);
      }
    } else if ( targetl.mode.value == 2 ) {
      if ( model == -1 ) {
        targetl.mode.setter(model);
      }
    }
  }
}

export let model = -1;

export let modelSet = (value) => {
  model = value
}

export let mouseDownl = false;

export let mouseDownlSet = (value) => {
  mouseDownl = value;
}

function App() {

  const [ astar, setAstar ] = useState( new AStar() );
  const { width, height } = useWindowDimensions();
  const [ cellSize, setCellSize ] = useState(30);
  const [ cellsCount , setCellsCount ] = useState();
  const [ cells, setCells ] = useState([]);
  const [ path, setPath ] = useState();
  const [ clear, setClear ] = useState(false);

  useLayoutEffect(() => {
    setCellsCount({
      columnCount : Math.floor(width / cellSize) + 1,
      rowCount : Math.floor(height / cellSize) + 1
    });

  }, [cellSize]);

  useLayoutEffect( () => {
    if ( cellsCount !== undefined && cellSize !== undefined ) {
      let newCells = [];
      for ( let c = 0; c < cellsCount.columnCount; c ++ ) {
        for ( let r = 0; r < cellsCount.rowCount; r++ ) {
          astar.addPoint( c * cellSize, r * cellSize );
          newCells.push( <Cell key={'cell-' + c + '-' + r} data={{
            astarPoint : astar.points[c * cellSize + '-' + r * cellSize],
            size : cellSize,
            position : { x : c * cellSize, y : r * cellSize }
          }}/> );
        }
      }
      for ( let c = 0; c < cellsCount.columnCount; c++ ) {
        for ( let r = 0; r < cellsCount.rowCount; r++ ) {
          let id = c * cellSize + '-' + r * cellSize;
          astar.connectPoint(id, (c + 1) * cellSize + '-' + (r - 1) * cellSize);
          astar.connectPoint(id, (c + 1) * cellSize + '-' + r * cellSize);
          astar.connectPoint(id, (c + 1) * cellSize + '-' + (r + 1) * cellSize);
          astar.connectPoint(id, c * cellSize + '-' + (r + 1) * cellSize);
          astar.connectPoint(id, (c - 1) * cellSize + '-' + (r + 1) * cellSize);
          astar.connectPoint(id, (c - 1) * cellSize + '-' + r * cellSize);
          astar.connectPoint(id, (c - 1) * cellSize + '-' + (r - 1) * cellSize);
          astar.connectPoint(id, c * cellSize + '-' + (r - 1) * cellSize);
        }
      }
      setCells([...newCells]);
    }
  }, [cellsCount] );

  return (
    <appContext.Provider value={{
      cellSize : cellSize,
      astar : astar,
      path : {
        value : path,
        setter : setPath
      },
      clear : {
        value : clear,
        setter : setClear
      }
    }} >
      <div className="App" draggable={false}>
        <div className="cells-container" onMouseUp={() => {
          model = -1;
          mouseDownl = false;}}
          draggable = {false}>
          {cells}
        </div>
        <UI/>
      </div>

    </appContext.Provider>
  );
}

export default App;
