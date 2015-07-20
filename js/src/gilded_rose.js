function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var ItemFactory = function(item) {
  var self = this;

  self.buildItem = function(item) {
    if (item.name == 'Sulfuras, Hand of Ragnaros') {
      return new SulfurasItem(item);
    } else if (item.name == 'Aged Brie') {
      return new AgedBrie(item);
    } else if (item.name == 'Conjured Mana Cake') {
      return new ConjuredItem(item);
    } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      return new BackstagePassItem(item);
    } else {
      return new NormalItem(item);
    }
  };
};

var BackstagePassItem = function(item) {
  var self = this;

  self.update = function() {
    add_quality(item);

    if (item.sell_in < 11) {
      add_quality(item);
    }
    if (item.sell_in < 6) {
      add_quality(item);
    }

    item.sell_in -= 1;

    if (item.sell_in < 0) {
      item.quality = 0;
    }
  };
};

var AgedBrie = function(item) {
  var self = this;

  self.update = function() {
    item.quality += 1;
    item.sell_in -= 1;

    if (item.sell_in < 0) {
      item.quality += 1;
    }
  };
};

var SulfurasItem = function(item) {
  var self = this;

  self.update = function() {
  };
};

var ConjuredItem = function(item) {
  var self = this;

  self.update = function() {
    item.quality -= 2;
    item.sell_in -= 1;
  };
};

var NormalItem = function(item) {
  var self = this;

  self.update = function() {
    self.updateQuality();
    self.updateSellIn();
    self.updateQuality2();
  };

  self.updateQuality = function() {
    subtract_quality(item);
  }

  self.updateSellIn = function() {
    item.sell_in -= 1;
  };

  self.updateQuality2 = function() {
    if (item.sell_in < 0) {
      subtract_quality(item);
    }
  };
};

var items = [];

function subtract_quality(item) {
  if (item.quality > 0) {
    item.quality -= 1;
  }
}

function add_quality(item) {
  if (item.quality < 50) {
    item.quality += 1;
  }
}

function update_quality() {
  var itemFactory = new ItemFactory();

  for (var i = 0; i < items.length; i++) {
    var item = itemFactory.buildItem(items[i]);
    item.update();
  }
}
