class osh {

    constructor() {

        this.itemsID = [];
        this.nodes = [];
        this.size = 0;

    }

    add( item ) {

        // this.itemsID[this.size] = item.id;
        this.nodes[this.size] = item;
        this.size++;
        this.#heapUp(this.size - 1);

    }

    getRoot() {
        return this.nodes[0];
    }

    unRoot() {

        this.nodes[0] = this.nodes[this.size - 1];
        this.nodes.splice( this.size - 1, 1 );
        this.size--;

        this.#heapDown(0);

    }

    update( id, callback ) {

        let item;
        let index;

        this.nodes.every( n => {
            if ( n.id == id ) {
                item = n;
                index = this.nodes.indexOf(n);
                return false;
            }
            return true;
        } )

        callback( item );

        this.#heapUp(index);
        this.#heapDown(index);

    }

    includesItem( id ) {

        let item = false;

        this.nodes.every( n => {
            if ( n.id == id ) {
                item = n;
                return false;
            }
            return true;
        } );

        return item;
    }

    get( id ) {
        
        let item;

        this.nodes.every( n => {
            if ( n.id == id ) {
                item = n;
                return false;
            }
            return true;
        } );

        return item;

    }

    //Helper methods
    #heapUp(index) {

        if ( this.#hasParent( index ) ) {

            let pIndex = this.#getParentIndex( index );

            if ( this.#comparison( index, pIndex ) ) {
                this.#swap( index, pIndex );
                return this.#heapUp( pIndex );
            }

        }

    }

    #heapDown(index) {

        if ( this.#hasLeftChild(index) ) {

            let lIndex = this.#getLeftIndex(index);

            if ( this.#hasRightChild(index) ) {

                let rIndex = this.#getRightIndex(index);

                if ( this.#comparison( lIndex, index ) && this,this.#comparison( rIndex, index ) ) {

                    if ( this.#comparison( lIndex, rIndex ) ) {
                        this.#swap( lIndex, index );
                        return this.#heapDown( lIndex );
                    } else {
                        this.#swap( rIndex, index );
                        return this.#heapDown( rIndex );
                    }

                }

                if ( this.#comparison( lIndex, index ) ) {
                    this.#swap( lIndex, index );
                    return this.#heapDown( lIndex );
                }

                if ( this.#comparison( rIndex, index ) ) {
                    this.#swap( rIndex, index );
                    return this.#heapDown( rIndex );
                }

            }

            if ( this.#comparison( lIndex, index ) ) {
                this.#swap( index, lIndex );
                return this.#heapDown( lIndex );
            }

        }

    }

    #swap( index1, index2 ) {

        let temp = this.nodes[index1];

        this.nodes[index1] = this.nodes[index2];
        this.nodes[index2] = temp;

    }

    #comparison( lesser, greater ) {

        lesser = this.nodes[lesser];
        greater = this.nodes[greater];

        if ( lesser.fScore < greater.fScore ) {
            return true;
        } else if ( lesser.fScore == greater.fScore ) {
            if ( lesser.hScore < greater.hScore ) {
                return true
            }
        }

        return false;

    }

    #hasParent(index) {
        return this.#getParentIndex(index) >= 0;
    }

    #hasChildren(index) {
        if ( this.#hasLeftChild(index) ) return true;
        return false;
    }

    #hasLeftChild(index) {
        return this.#getLeftIndex(index) <= this.size - 1;
    }

    #hasRightChild(index) {
        return this.#getRightIndex(index) <= this.size - 1;
    }

    #getParentIndex(index) {
        return Math.floor( (index - 1) / 2 );
    }

    #getLeftIndex(index) {
        return (index * 2) + 1;
    }

    #getRightIndex(index) {
        return (index * 2) + 2;
    }

    #getNode( index ) {
        return this.nodes[index];
    }

}

class osn {

    constructor( item, index ) {

        this.item = item;
        this.index = index;

    }

}

export default osh;