class Unit {
  // Entity is used as node or edge type, for different classifications
  //    i.e. 'person', 'recipe', 'road', etc.
  constructor(entity, properties) {
    this.entity = entity + "";

    this.load(properties || {});
  }

  // load properties (id, name, age, etc.) from an object
  load(properties) {
    let p = Object.create(null);

    Object.keys(properties).forEach(function(v) {
      p[v] = properties[v];
    });

    this.properties = p;

    return this;
  }

  set(property, value) {
    return (this.properties[property] = value);
  }

  unset(property) {
    return delete this.properties[property];
  }

  has(property) {
    return Object.prototype.hasOwnProperty.call(this.properties, property);
  }

  get(property) {
    return this.properties[property];
  }

  toString() {
    return [
      this.constructor.name,
      " (",
      this.entity,
      " ",
      JSON.stringify(this.properties),
      ")",
    ].join("");
  }
}

//define our Node where we keep track of all edges, input edges, and output edges (for directionality).
//We also specify an unlink method to remove all connected edges.

class Node extends Unit {
  constructor(entity, properties) {
    super(entity, properties);
    this.edges = [];
    this.inputEdges = [];
    this.outputEdges = [];
  }

  unlink() {
    let edges = this.edges;

    for (let i = 0, len = edges.length; i < len; i++) {
      edges[i].unlink();
    }

    return true;
  }
}

//create Edge that takes care of connecting nodes to one another.
//In our edge we hold an inputNode, an outputNode and whether or not the edge is a duplex link (bi-directional).

class Edge extends Unit {
  constructor(entity, properties) {
    super(entity, properties);

    this.inputNode = null;
    this.outputNode = null;
    this.duplex = false;

    this.distance = 1;
  }

  // link a specific node in a certain direction
  _linkTo(node, direction) {
    if (direction <= 0) {
      node.inputEdges.push(this);
    }

    if (direction >= 0) {
      node.outputEdges.push(this);
    }

    node.edges.push(this);

    return true;
  }

  // link two nodes, optionally make edge bidirectional (duplex)
  link(inputNode, outputNode, duplex) {
    this.unlink();

    this.inputNode = inputNode;
    this.outputNode = outputNode;
    this.duplex = !!duplex;

    if (duplex) {
      this._linkTo(inputNode, 0);
      this._linkTo(outputNode, 0);
      return this;
    }

    this._linkTo(inputNode, 1);
    this._linkTo(outputNode, -1);
    return this;
  }

  // distance for traversal
  setDistance(v) {
    this.distance = Math.abs(parseFloat(v) || 0);
    return this;
  }

  // weight is 1 / distance
  setWeight(v) {
    this.distance = 1 / Math.abs(parseFloat(v) || 0);
    return this;
  }

  // find the opposite node given a starting node
  oppositeNode(node) {
    if (this.inputNode === node) {
      return this.outputNode;
    } else if (this.outputNode === node) {
      return this.inputNode;
    }

    return;
  }

  // unlink edge, remove connections from nodes
  unlink() {
    let pos;
    let inode = this.inputNode;
    let onode = this.outputNode;

    if (!(inode && onode)) {
      return;
    }

    (pos = inode.edges.indexOf(this)) > -1 && inode.edges.splice(pos, 1);
    (pos = onode.edges.indexOf(this)) > -1 && onode.edges.splice(pos, 1);
    (pos = inode.outputEdges.indexOf(this)) > -1 &&
      inode.outputEdges.splice(pos, 1);
    (pos = onode.inputEdges.indexOf(this)) > -1 &&
      onode.inputEdges.splice(pos, 1);

    if (this.duplex) {
      (pos = inode.inputEdges.indexOf(this)) > -1 &&
        inode.inputEdges.splice(pos, 1);
      (pos = onode.outputEdges.indexOf(this)) > -1 &&
        onode.outputEdges.splice(pos, 1);
    }

    this.inputNode = null;
    this.outputNode = null;

    this.duplex = false;

    return true;
  }
}

//Graph implementation

// Create nodes...
let joe = new Node("person");
joe.set("name", "Joe");

let pasta = new Node("recipe");
pasta.set("name", "Pasta");

// Create edge...
let likes = new Edge("likes");

// link 'em!
likes.link(joe, pasta);

// add more nodes...
let notch = new Node("person", { name: "Notch" });
let created = new Edge("created").link(notch, pasta);

//increase complexity of the graph
// Add even more nodes
// let mojang = new Node("company", { name: "Mojang" });
// let microsoft = new Node("company", { name: "Microsoft" });
// let jennifer = new Node("person", { name: "Jennifer" });

// new Edge("founded").link(notch, mojang);
// new Edge("acquired").link(microsoft, mojang);
// new Edge("purchased").link(jennifer, pasta);
// new Edge("prints_money_for").link(pasta, microsoft);

//assemble our graph
let users = getUsers(); // abstract function to get user data (i.e. SQL)
// let listings = getListings(); // ... listings
// let views = getViews(); // ... etc.
let favorites = getFavorites();
// let requests = getRequests();

// quick and dirty O(n) function to get a node by id
function getNodeById(nodes, id) {
  return nodes.filter(function(node) {
    return node.get("id") === id;
  })[0];
}

users = users.map(function(user) {
  return new Node("user", user);
});

// listings = listings.map(function(listing) {
//   return new Node("listing", listing);
// });

// views = views.map(function(view) {
//   return new Edge("view").link(
//     getNodeById(users, view.user_id),
//     getNodeById(listings, view.listing_id)
//   );
// });

favorites = favorites.map(function(favorite) {
  return new Edge("favorite").link(
    getNodeById(users, favorite.user_id),
    getNodeById(listings, favorite.listing_id)
  );
});

// requests = requests.map(function(request) {
//   return new Edge("request").link(
//     getNodeById(users, request.user_id),
//     getNodeById(listings, request.listing_id)
//   );
// });

// get the closest 'favourites' nodes, at a minimum depth (distance) of 3
let results = graph.closest(node, {
  compare: function(node) {
    return node.entity === "favourites";
  },
  minDepth: 3,
  count: 100,
});

// results is now an array of Paths, which are each traces from your starting node to your result node...
let resultNodes = result.map(function(path) {
  return path.end();
});
