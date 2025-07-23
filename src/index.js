import './styles.css';

class Hash {
  constructor(load_factor, capacity) {
    this.load_factor = load_factor;
    this.capacity = capacity;
    this.map = [];
    for (let i = 0; i < capacity; i++) {
      this.map.push(null);
    }
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

    // If that index is empty initialize a LL
    if (this.map[hash] == null) {
      const ll = new LinkedList();
      const node = new Node(key, value);
      ll.append(node);
      this.map[hash] = ll;
      return;
    }

    // If it is a LL then append a node to it
    if (this.map[hash] instanceof LinkedList) {
      const ll = this.map[hash];

      // Write to the previous values is keys are identical
      let cur = this.map[hash].head;
      while (cur != null) {
        if (cur.key === key) {
          cur.value = value;
          return;
        }
        cur = cur.next;
      }
      const node = new Node(key, value);
      ll.append(node);
      return;
    }
    console.log('Reached end in hash.set()');
  }

  get(key) {
    const hash = this.hash(key);
    if (this.map[hash] == null) return null;
    const ll = this.map[hash];
    cur = ll.head;

    while (cur != null) {
      if (cur.key === key) {
        return cur.value;
      }
    }
    return null;
  }

  has(key) {
    const hash = this.hash(key);

    if (this.map[hash] == null) return false;

    const ll = this.map[hash];
    cur = ll.head;
    while (cur != null) {
      if (cur.key === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const hash = this.hash(key);

    if (this.map[hash] == null) return false;

    const ll = this.map[hash];
    if (ll.contains_key(key)) {
      const i = ll.find_key(key);
      ll.removeAt(i);
    }
    return true;
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.capacity; i++) {
      if (this.map[i] instanceof LinkedList) {
        count += this.map[i].size();
      }
    }
    return count;
  }

  clear() {
    this.map = [];
    for (let i = 0; i < this.capacity; i++) {
      this.map.push(null);
    }
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.map[i] instanceof LinkedList) {
        let cur = this.map[i].head;
        while (cur != null) {
          keys.push(cur.key);
          cur = cur.next;
        }
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.map[i] instanceof LinkedList) {
        let cur = this.map[i].head;
        while (cur != null) {
          values.push(cur.value);
          cur = cur.next;
        }
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    const keys = this.keys();
    const values = this.values();
    for (let i = 0; i < values.length; i++) {
      let entry = [keys[i], values[i]];
      entries.push(entry);
    }
    return entries;
  }

  print() {
    for (let i = 0; i < this.map.length; i++) {
      const bucket = this.map[i];
      if (bucket == null) {
        console.log(`${i}: null`);
      } else if (bucket instanceof LinkedList) {
        let str = '';
        let cur = bucket.head;
        while (cur != null) {
          str += `[${JSON.stringify(cur.key)}: ${JSON.stringify(cur.value)}] -> `;
          cur = cur.next;
        }
        str += 'null';
        console.log(`${i}: ${str}`);
      } else {
        console.log(`${i}: [Single Value] ${bucket}`);
      }
    }
  }
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

  contains_value(value) {
    let cur = this.head;
    while (cur != null) {
      if (cur.value == value) {
        return true;
      }
      cur = cur.next;
    }
    return false;
  }

  contains_key(key) {
    let cur = this.head;
    while (cur != null) {
      if (cur.key == key) {
        return true;
      }
      cur = cur.next;
    }
    return false;
  }

  find_value(value) {
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

  find_key(key) {
    let n = 0;
    let cur = this.head;
    while (cur != null) {
      if (cur.key == key) {
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
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

const test = new Hash(0.8, 16); // or HashMap() if using a factory

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.print());

test.clear();
console.log(test);
console.log(test.entries());
