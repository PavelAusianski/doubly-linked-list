const Node = require('./node');

class LinkedList {

    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        this.link(data);
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        return this.nodeAt(index).data;
    }

    nodeAt(index) {
            if (index < this.length / 2) {
            let foundNode = this._head;
            for (let i = 0; i < index; i++) {
                foundNode = foundNode.next;
            }
            return foundNode;
        } else {
            let foundNode = this._tail;
            for (let i = this.length - 1; i > index; i--) {
                foundNode = foundNode.prev;
            }
            return foundNode;
        }
    }

    insertAt(index, data) {
        if (index >= 0 && index <= this.length) {
            if (index == this.length) {
                this.link(data);
            } else {
                this.linkAt(index, data);
            }
        }

        return this;
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        let currentNode = this._head;
        while (currentNode != null) {
            let next = currentNode.next;
            currentNode.next = null;
            currentNode.prev = null;
            currentNode.data = null;

            currentNode = next;
        }
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let nodeToRemove = this.nodeAt(index);
        let nextNode = nodeToRemove.next;
        let prevNode = nodeToRemove.prev;

        if (nextNode == null) {
            this._tail = prevNode;
        } else {
            nextNode.prev = prevNode;
            nodeToRemove.next = null;
        }

        if (prevNode == null) {
            this._head = nextNode;
        } else {
            prevNode.next = nextNode;
            nodeToRemove.prev = null;
        }

        nodeToRemove.data = null;
        this.length--;
        return this;
    }

    reverse() {
        let currentNode = this._head;
        let temp = this._head;
        this._head = this._tail;
        this._tail = temp;
        while (currentNode != null) {
            let tmp = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = tmp;
            currentNode = tmp;
        }

        return this;
    }

    indexOf(data) {
        let index = 0;
        for (let node = this._head; node != null; node = node.next) {
            if (node.data === data) {
                return index;
            } else {
                index++;
            }
        }

        return -1;
    }

    linkAt(index, data) {
        let foundNode = this.nodeAt(index);
        let prevNode = foundNode.prev;
        let newNode = new Node(data, prevNode, foundNode);
        foundNode.prev = newNode;
        if (prevNode == null) {
            this._head = newNode;
        } else {
            prevNode.next = newNode;
        }
        this.length++;
    }

    link(data) {
        let currentTail = this._tail;
        let newNode = new Node(data, currentTail, null);
        this._tail = newNode;
        if (currentTail == null) {
            this._head = newNode;
        } else {
            currentTail.next = newNode;
        }
        this.length++;
    }

}

module.exports = LinkedList;
