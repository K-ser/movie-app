// CREAR UN HISTORIAL DE NAVEGACION MEDIANTE UNA ESTRUCTURA DE DATOS STACK

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
};

class Stack {
  constructor() {
    this.bottom = null;
    this.top = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.bottom = newNode;
      this.top = this.bottom;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    };
    
    this.length++;
  }
}