import osh from "./openSetHeap";

class AStar {
    constructor() {
        this.points = {};
        this.start = null;
        this.goal = null;
        this.heuristic = 0;
        // this.cSet = [];
        // this.oSet = new OpenSetHeap();
    }

    setHeuristic( index ) {
        this.heuristic = index;
    }

    addPoint( x, y ) {
        if ( this.points[x + '-' + y] === undefined ) {
            this.points[ x + '-' + y ] = {
                id : x + '-' + y,
                position : { x : x, y : y },
                neighbors_id : [],
                obstacle : false,
                gScore : 0,
                hScore : 0,
                fScore : 0,
                previous : null
            }
        }
    }

    connectPoint( point_id, neighbor_id, two_way = true ) {
        let point = this.points[point_id];
        let neighbor = this.points[neighbor_id];

        if ( point !== undefined && neighbor !== undefined ) {
            if ( !point.neighbors_id.includes( neighbor_id ) ) {
                point.neighbors_id.push(neighbor_id);
            }
            if ( two_way ) {
                if( !neighbor.neighbors_id.includes( point_id ) ) {
                    neighbor.neighbors_id.push(point_id);
                }
            }
        }
    }

    setPath( start, goal ) {
        this.start = start;
        this.goal = goal;
    }

    calculatePath() {

        let cSet = {};
        let oSet = new osh();

        if ( oSet.getRoot() == undefined ) {
            let first = {...this.points[this.start]};
            first.hScore = this.#heuristic(first);
            first.fScore = first.hScore;
            oSet.add(first);
        }

        let current = oSet.getRoot();

        while ( current != null ) {

            current = oSet.getRoot();

            // Trace back the path if the current point is the goal point and return it as an array
            if ( current.id == this.points[this.goal].id ) {

                let point = current;
                
                let path = {
                    correct : [point.id],
                    close : Object.keys(cSet),
                    open : []
                };
                
                while ( point.previous != null ) {
                    path.correct.push( point.previous.id );
                    point = point.previous;
                }

                oSet.nodes.forEach( i => {
                    path.open.push(i.id);
                } );

                return path;
            }

            oSet.unRoot();

            current.neighbors_id.forEach( id => {
    
                if ( this.points[id].obstacle == false && cSet[id] == undefined ) {

                    if ( !oSet.includesItem( id ) ) {
        
                        let neighbor = { ...this.points[id] };
        
                        neighbor.gScore = this.#gScore( neighbor, current );
                        neighbor.hScore = this.#heuristic(neighbor);
                        neighbor.fScore = neighbor.gScore + neighbor.hScore;
                        neighbor.previous = current;
        
                        oSet.add(neighbor);
        
                    } else {

                        let neighbor = oSet.get(id);
                        let tGScore = this.#gScore( neighbor, current );
                        
                        if ( tGScore < neighbor.gScore ) {

                            oSet.update( id, ( item ) => {
                                item.gScore = this.#gScore( item, current );
                                item.fScore = tGScore + item.hScore;
                                item.previous = current;
                            } );

                        }
        
                    }
    
                }
    
            });

            cSet[current.id] = current;
        }

        return false;

    }

    #gScore( n, c ) {
        // return this.#manhattanDistance( c.position, n.position ) + c.gScore;
        return this.#euclidianDistance( c.position, n.position ) + c.gScore;
    }

    #heuristic( obj ) {
        let goalObj = this.points[this.goal];

        if ( this.heuristic == 0 ) {
            return this.#manhattanDistance( obj.position, goalObj.position );
        }
        if ( this.heuristic == 1 ) {
            return this.#euclidianDistance( obj.position, goalObj.position );
        }

    }

    #manhattanDistance( p1, p2 ) {
        return Math.abs( p1.x - p2.x ) + Math.abs( p1.y - p2.y );
    }

    #euclidianDistance( p1, p2 ) {
        return Math.sqrt( Math.pow( p2.x - p1.x , 2 ) + Math.pow( p2.y - p1.y , 2 ) );
    }
}

export default AStar;