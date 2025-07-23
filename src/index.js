import './styles.css';

class Hash {
  constructor(load_factor, capacity) {
    this.load_factor = load_factor;
    this.capacity = capacity;
    this.map = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hash = this.hash(key);
    if (this.map[hash] == null) {
      this.map[hash] = value;
      return;
    }
    const ll = new LinkedList();
    const node_prev = new Node(this.map[hash]);
    const node_new = new Node(value);
    ll.append(node_prev);
    ll.append(node_new);
  }

  get(key) {}

  has(key) {}

  remove(key) {}

  length() {}

  clear() {}

  keys() {}

  values() {}

  entries() {}
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    // Create new node
    const node = new Node(value);

    // Check empty
    if (this.head == null) {
      this.head = node;
      this.tail = node;
      return;
    }

    let cur = this.head;
    // Traverse L.L.
    while (cur.next != null) {
      cur = cur.next;
    }

    cur.next = node;
    this.tail = node;
    return;
  }

  prepend(value) {
    // Create new node
    const node = new Node(value);

    // Check empty
    if (this.head == null) {
      this.head = node;
      this.tail = node;
      return;
    }

    node.next = this.head;
    this.head = node;
  }

  size() {
    let cur = this.head;
    let n = 0;
    while (cur != null) {
      n++;
      cur = cur.next;
    }
    return n;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  at(index) {
    let cur = this.head;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }
    return cur;
  }

  pop() {
    // Check empty
    if (this.head == null) {
      return;
    }

    let cur = this.head;
    // Traverse to second to last node
    while (cur.next.next != null) {
      cur = cur.next;
    }
    cur.next = null;
    this.tail = cur;
  }

  contains(value) {
    let cur = this.head;
    while (cur != null) {
      if (cur.value == value) {
        return true;
      }
      cur = cur.next;
    }
    return false;
  }

  find(value) {
    let n = 0;
    let cur = this.head;
    while (cur != null) {
      if (cur.value == value) {
        return n;
      }
      cur = cur.next;
      n++;
    }
    return null;
  }

  toString() {
    if (this.head == null) {
      const string = 'Linked List is empty';
      return string;
    }
    let string = '';
    let cur = this.head;
    while (cur != null) {
      string += '( ';
      string += cur.value;
      string += ' ) -> ';
      cur = cur.next;
    }
    string += 'null';
    return string;
  }

  insertAt(value, index) {
    if (index > this.size()) {
      throw 'index too large';
    }

    const node = new Node(value);
    let cur = this.head;

    for (let i = 0; i < index - 1; i++) {
      cur = cur.next;
    }
    const temp_next = cur.next;
    cur.next = node;
    node.next = temp_next;
  }

  removeAt(index) {
    if (index > this.size()) {
      throw 'index too large';
    }
    let cur = this.head;

    for (let i = 0; i < index - 1; i++) {
      cur = cur.next;
    }
    cur.next = cur.next.next;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
